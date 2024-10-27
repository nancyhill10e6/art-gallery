<script>
    import { supabase } from './supabaseClient';
    let email = '';
    let password = '';
    let error = '';

    async function handleLogin() {
        const { user, error: loginError } = await supabase.auth.signInWithPassword({ email, password });
        if (loginError) {
            error = loginError.message;
        } else {
            // Redirect or update UI after successful login
        }
    }
</script>

<style>
    .container {
        max-width: 600px; /* Increased width for a more spacious layout */
        margin: auto;
        padding: 40px; /* Added padding for better spacing */
        background-color: white; /* Background color for form */
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    .input-field {
        position: relative;
        margin-bottom: 20px; /* Space between input fields */
    }

    .input-field input {
        color: #000; /* Text color */
        background-color: #fff; /* Background color */
        border: 1px solid #ccc; /* Border color */
        border-radius: 4px;
        padding: 12px 10px; /* Padding for input */
        width: 100%; /* Full width */
    }

    .input-field label {
        position: absolute;
        top: 12px;
        left: 10px;
        color: #666; /* Label color */
        transition: all 0.2s ease; /* Smooth transition for label movement */
    }
    h5 {
        color: #333; /* Darker text color for product names */
        margin: 8px 0;
    }


    .input-field input:focus + label,
    .input-field input:not(:placeholder-shown) + label {
        top: -8px; /* Move label above input when focused or filled */
        left: 10px;
        font-size: 12px; /* Smaller font size when floating */
        color: #ff194f; /* Label color on focus */
    }

    .error-message {
        color: red; /* Error message color */
        margin-top: 10px;
    }

    .login-button {
        background-color: #ff194f; /* Action button color */
        color: white; /* Text color for the button */
        border-radius: 5px;
        padding: 12px 20px;
        border: none;
        cursor: pointer;
        width: 100%; /* Full width button */
    }

    .login-button:hover {
        opacity: 0.8; /* Slightly darker on hover */
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
        
        <p>Forgot your password? <a href="#" style="color: #ff194f;">Reset it</a></p>
    </form>
</div>