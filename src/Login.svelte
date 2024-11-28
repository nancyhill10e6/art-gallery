<script>
    import { supabase } from './supabaseClient';

    let email = '';
    let password = '';
    let error = '';

    async function handleLogin() {
        const { data, error: loginError } = await supabase.auth.signInWithPassword({ email, password });
        if (loginError) {
            error = loginError.message;
        } else {
            // Navigate to the desired route after successful login
            window.location.href = '/gallery'; // Replace '/dashboard' with your desired route
        }
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

    h5 {
        color: #333;
        margin: 8px 0;
    }

    .input-field input:focus + label,
    .input-field input:not(:placeholder-shown) + label {
        top: -8px;
        left: 10px;
        font-size: 12px;
        color: #ff194f;
    }

    .error-message {
        color: red;
        margin-top: 10px;
    }

    .login-button {
        background-color: #ff194f;
        color: white;
        border-radius: 5px;
        padding: 12px 20px;
        border: none;
        cursor: pointer;
        width: 100%;
    }

    .login-button:hover {
        opacity: 0.8;
    }
</style>

<div class="container">
    <h5>Login</h5>
    <form on:submit|preventDefault={handleLogin}>
        <div class="input-field">
            <input type="email" id="email" bind:value={email} required placeholder=" " />
            <label for="email">Email</label>
        </div>

        <div class="input-field">
            <input type="password" id="password" bind:value={password} required placeholder=" " />
            <label for="password">Password</label>
        </div>

        <button class="login-button" type="submit">Login</button>

        {#if error}
            <p class="error-message">{error}</p>
        {/if}
    </form>
</div>