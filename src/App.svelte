<script>
    import Router from 'svelte-spa-router';
    import { supabase } from './supabaseClient';

    // Views
    import Login from './Login.svelte';
    import ResetPassword from './ResetPassword.svelte';
    import Gallery from './Gallery.svelte';
    import Groups from './Groups.svelte';
    import MySubscriptions from './MySubscriptions.svelte';

    let user = null;

    // Check user authentication status on load
    supabase.auth.onAuthStateChange((event, session) => {
        user = session?.user;
        if (!user) {
            // Redirect to login if not authenticated
            window.location.hash = '/';
        }
    });

    // Fetch initial session on component mount to handle page reload
    import { onMount } from 'svelte';
    onMount(async () => {
        const { data: { session } } = await supabase.auth.getSession();  // Use getSession() instead of session()
        if (session) {
            user = session.user;
        }
    });

    async function logout() {
        await supabase.auth.signOut();
        user = null; // Reset user state
        window.location.hash = '/'; // Redirect to login after logout
    }

    // Routes
    const routes = {
        '/': Login,
        '/reset-password': ResetPassword,
        '/gallery': Gallery,
        '/groups/:process_id': Groups,
        '/my-subscriptions': MySubscriptions,
    };
</script>

<style>
    body {
        background-color: #f6f6f6;
        margin: 0;
        font-family: Arial, sans-serif;
    }

    .navbar {
        background-color: #ccc;
        padding: 10px 0;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        width: 100%;
        display: flex;
        justify-content: center;
        gap: 20px;
        z-index: 1000;
    }

    .navbar a {
        color: #000;
        text-decoration: none;
        font-weight: bold;
    }

    .navbar a:hover {
        color: #ff194f;
    }

    .logo {
        display: block;
        margin: 20px auto;
        max-width: 200px;
    }

    .container {
        max-width: 100%;
        margin-top: 60px;
        padding: 20px;
        text-align: center;
        background-color: white;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
</style>

<div class="navbar">
    {#if user}
        <a href="/gallery">Gallery</a>
        <a href="/my-subscriptions">My Subscriptions</a>
        <a href="#" on:click|preventDefault={logout}>Logout</a>
    {/if}
</div>

<div class="container">
    <img src="/logo.png" alt="Logo" class="logo" />
    <Router {routes} />
</div>