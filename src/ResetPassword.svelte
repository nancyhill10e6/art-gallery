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
        padding: 12px