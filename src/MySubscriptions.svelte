<script>
    import { supabase } from './supabaseClient';
    import { onMount } from 'svelte';

    let user = null;
    let error = '';
    let subscription = null;

    // Fetch the current user and their subscription details
    onMount(async () => {
        const { data: { user: currentUser }, error: userError } = await supabase.auth.getUser();
        if (userError) {
            error = userError.message;
            return;
        }
        user = currentUser;

        // Fetch subscription details (this is a placeholder; adjust according to your database structure)
        const { data, error: subscriptionError } = await supabase
            .from('subscriptions') // Replace with your actual subscriptions table name
            .select('*')
            .eq('user_id', user.id); // Assuming you have a user_id field

        if (subscriptionError) {
            error = subscriptionError.message;
            return;
        }

        // Assuming the response contains subscription details
        subscription = data.length > 0 ? data[0] : null; // Get the first subscription
    });

    // Function to cancel the subscription
    async function cancelSubscription() {
        if (!subscription) return;

        const { error: cancelError } = await supabase
            .from('subscriptions') // Replace with your actual subscriptions table name
            .delete()
            .eq('id', subscription.id); // Assuming you have an id field for the subscription

        if (cancelError) {
            error = cancelError.message;
        } else {
            alert('Subscription cancelled successfully.');
            // Optionally, refresh or redirect after cancellation
            subscription = null; // Clear the subscription after cancellation
        }
    }
</script>

<style>
    .container {
        max-width: 600px;
        margin: auto;
        padding: 20px;
        background-color: white;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    h5 {
        margin-bottom: 20px;
    }

    .error-message {
        color: red;
        margin-top: 10px;
    }

    .cancel-button {
        background-color: #ff194f; /* Action button color */
        color: white;
        border-radius: 5px;
        padding: 10px 15px;
        border: none;
        cursor: pointer;
    }

    .cancel-button:hover {
        opacity: 0.8; /* Slightly darker on hover */
    }
</style>

<div class="container">
    <h5>My Subscriptions</h5>
    
    {#if error}
        <p class="error-message">{error}</p>
    {/if}

    {#if user}
        <p>User Email: <strong>{user.email}</strong></p>
        
        {#if subscription}
            <p>Your Subscription ID: <strong>{subscription.id}</strong></p>
            <button class="cancel-button" on:click={cancelSubscription}>Cancel Subscription</button>
        {:else}
            <p>You do not have an active subscription.</p>
        {/if}
        
    {:else}
        <p>Please log in to manage your subscriptions.</p>
    {/if}
</div>