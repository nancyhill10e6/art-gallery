<script>
  import { supabase } from './supabaseClient';
  import Login from './Login.svelte';
  import ResetPassword from './ResetPassword.svelte';
  import Gallery from './Gallery.svelte';

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
</script>

<style>
  body {
      background-color: #f6f6f6; /* Full screen background color */
      margin: 0;
      font-family: Arial, sans-serif;
  }

  .logo {
      display: block;
      margin: 20px auto;
      max-width: 200px; /* Adjust logo size */
  }

  .container {
      max-width: 100%;
      margin: auto;
      padding: 20px;
      text-align: center;
      background-color: white; /* Background for forms */
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
</style>

<div class="container">
  <img src="https://nancyhill.art/wp-content/uploads/2024/10/cropped-nancy_hill_art-1.png" alt="Logo" class="logo" />
  <!-- <h2 style="color: #ff194f; padding: 20px">Nancy Hill Art Gallery</h2> -->
  {#if currentView === 'login'}
      <Login />
      <p>Forgot your password? <a href="#" on:click={showResetPassword} style="color: #ff194f;">Reset it</a></p>
  {:else if currentView === 'resetPassword'}
      <ResetPassword />
      <p>Remembered your password? <a href="#" on:click={showLogin} style="color: #ff194f;">Log in</a></p>
  {:else if currentView === 'gallery'}
      <Gallery />
  {/if}
</div>