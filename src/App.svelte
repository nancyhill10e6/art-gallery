<script>
    import { supabase } from './supabaseClient';
    import Login from './Login.svelte';
    import ResetPassword from './ResetPassword.svelte';
    import Gallery from './Gallery.svelte';
    import MySubscriptions from './MySubscriptions.svelte';

    let user = null;
    let currentView = 'login'; // Default view

    // Check user authentication status
    supabase.auth.onAuthStateChange((event, session) => {
        user = session?.user;
        currentView = user ? 'gallery' : 'login'; // Switch to gallery if logged in
    });

    function showResetPassword() {
        currentView = 'resetPassword';
    }

    function showLogin() {
        currentView = 'login';
    }

    function showGallery() {
        currentView = 'gallery';
    }

    function showMySubscriptions() {
        currentView = 'mysubscription';
    }

    async function logout() {
        await supabase.auth.signOut();
        user = null; // Reset user state
        currentView = 'login'; // Redirect to login after logout
    }
</script>

<style>
    body {
        background-color: #f6f6f6; /* Full screen background color */
        margin: 0;
        font-family: Arial, sans-serif;
    }

    .navbar {
        background-color: #ccc; /* Gray background for navbar */
        padding: 10px 0; /* Padding for vertical spacing */
        position: fixed; /* Fix position to the top */
        top: 0; /* Align to the top */
        left: 0; /* Align to the left */
        right: 0; /* Align to the right */
        width: 100%; /* Full width */
        display: flex; /* Use flexbox for layout */
        justify-content: center; /* Center menu items */
        gap: 20px; /* Space between menu items */
        z-index: 1000; /* Ensure navbar is above other content */
    }

    .navbar a {
        color: #000; /* Text color for links */
        text-decoration: none; /* Remove underline */
        font-weight: bold; /* Make text bold */
    }

    .navbar a:hover {
        color: #ff194f; /* Change color on hover */
    }

    .logo {
        display: block;
        margin: 20px auto;
        max-width: 200px; /* Adjust logo size */
    }

    .container {
        max-width: 100%;
        margin-top: 60px; /* Add margin to avoid overlap with navbar */
        padding: 20px;
        text-align: center;
        background-color: white; /* Background for forms */
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
</style>

<div class="navbar">
    {#if user}
        <a href="#" on:click|preventDefault={showGallery}>Gallery</a>
        <a href="#" on:click|preventDefault={showMySubscriptions}>My Subscriptions</a>
        <a href="#" on:click|preventDefault={logout}>Logout</a>
    {/if}
</div>

<div class="container">
    <img src="/logo.png" alt="Logo" class="logo" />
    
    {#if currentView === 'login'}
        <Login />
        <p style="color: #ccc;">Forgot your password? <a href="#" on:click={showResetPassword} style="color: #ff194f;">Reset it</a></p>
    {:else if currentView === 'resetPassword'}
        <ResetPassword />
        <p style="color: #ccc;">Remembered your password? <a href="#" on:click={showLogin} style="color: #ff194f;">Log in</a></p>
    {:else if currentView === 'gallery'}
        <Gallery />
    {:else if currentView === 'mysubscription'}
        <MySubscriptions />
    {/if}
</div>