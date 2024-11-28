<script>
    import Router from 'svelte-spa-router';  // Correct default import
    import { supabase } from './supabaseClient';

    // Views
    import Login from './Login.svelte';
    import ResetPassword from './ResetPassword.svelte';
    import Gallery from './Gallery.svelte';
    import Groups from './Groups.svelte';
    import MySubscriptions from './MySubscriptions.svelte';

    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';

    // Reactive store for user state
    let user = writable(null); // Use a writable store to handle user state

    // Fetch the session on component mount
    onMount(async () => {
        const { data: { session } } = await supabase.auth.getSession();  // Use getSession() instead of session()
        user.set(session?.user || null);  // Update the user state based on session
    });

    // Listen for authentication state changes
    supabase.auth.onAuthStateChange((event, session) => {
        user.set(session?.user || null);  // Update the user state on auth state change
    });

    async function logout() {
        await supabase.auth.signOut();
        user.set(null);  // Reset user state on logout
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
    {#if $user}  <!-- Use reactive store to check user state -->
        <a href="/gallery">Gallery</a>
        <a href="/my-subscriptions">My Subscriptions</a>
        <a href="#" on:click|preventDefault={logout}>Logout</a>
    {/if}
</div>

<div class="container">
    <img src="/logo.png" alt="Logo" class="logo" />
    <Router {routes} />
</div>