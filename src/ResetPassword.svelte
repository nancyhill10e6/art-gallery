<script>
    import { supabase } from './supabaseClient';
    import { goto } from 'svelte-spa-router'; // Use router for navigation
    let email = '';
    let message = '';
    let error = '';

    async function handleReset() {
        const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/reset-password-complete`
        });

        if (resetError) {
            error = resetError.message; // Display the error message
            message = ''; // Clear the success message
        } else {
            error = ''; // Clear any previous errors
            message = 'Check your email for the password reset link!';
        }
    }

    function goBackToLogin() {
        goto('/login'); // Redirect to login view
    }
</script>

<style>
    .container {
        max-width: 600px;
        margin: auto;
        padding: 40px;
        background-color: white;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    .input-field {
        position: relative;
        margin-bottom: 20px;
    }

    .input-field input {
        color: #000;
        background-color: #fff;
        border: 1px solid #ccc;
        border-radius: 4px;
        padding: 12px 10px;
        width: 100%;
    }

    .input-field label {
        position: absolute;
        top: 12px;
        left: 10px;
        color: #666;
        transition: all 0.2s ease;
    }

    .input-field input:focus + label,
    .input-field input:not(:placeholder-shown) + label {
        top: -8px;
        left: 10px;
        font-size: 12px;
        color: #ff194f;
    }

    .btn {
        background-color: #ff194f;
        color: white;
        border-radius: 5px;
        padding: 12px 20px;
        border: none;
        cursor: pointer;
        width: 100%;
    }

    .btn:hover {
        opacity: 0.8;
    }

    .message {
        margin-top: 20px;
        color: green;
    }

    .error {
        margin-top: 20px;
        color: red;
    }

    .back-link {
        margin-top: 20px;
        text-align: center;
        display: block;
        color: #ff194f;
        cursor: pointer;
        text-decoration: underline;
    }
</style>

<div class="container">
    <h5>Reset Password</h5>
    <form on:submit|preventDefault={handleReset}>
        <div class="input-field">
            <input type="email" id="reset-email" bind:value={email} required placeholder=" " />
            <label for="reset-email">Enter your email</label>
        </div>
        <button class="btn" type="submit">Send Reset Link</button>
        {#if message}
            <p class="message">{message}</p>
        {/if}
        {#if error}
            <p class="error">{error}</p>
        {/if}
    </form>
    <span class="back-link" on:click={goBackToLogin}>Back to Login</span>
</div>