<script>
    import { supabase } from './supabaseClient';
    let email = '';
    let message = '';

    async function handleReset() {
        const { error } = await supabase.auth.resetPasswordForEmail(email);
        if (error) {
            message = error.message;
        } else {
            message = 'Check your email for the password reset link!';
        }
    }
</script>

<div class="container">
    <h5>Reset Password</h5>
    <form on:submit|preventDefault={handleReset}>
        <div class="input-field">
            <input type="email" id="reset-email" bind:value={email} required />
            <label for="reset-email">Enter your email</label>
        </div>
        <button class="btn waves-effect waves-light" type="submit" style="background-color: #ff194f;">Send Reset Link</button>
        {#if message}<p>{message}</p>{/if}
    </form>
</div>