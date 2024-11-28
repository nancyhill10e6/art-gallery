<script>
    import { supabase } from './supabaseClient';
    import { onMount } from 'svelte';

    let user = null;
    let error = '';
    let subscription = null;
    let loading = true;

    onMount(async () => {
        try {
            // Fetch the current user
            const { data: { user: currentUser }, error: userError } = await supabase.auth.getUser();

            if (userError) {
                throw new Error(userError.message);
            }
            user = currentUser;

            // Fetch subscription details
            const { data, error: subscriptionError } = await supabase
                .from('subscriptions') // Replace with your actual subscriptions table name
                .select('*')
                .eq('user_id', user.id); // Assuming you have a user_id field

            if (subscriptionError) {
                throw new Error(subscriptionError.message);
            }

            // Assuming the response contains subscription details
            subscription = data.length > 0 ? data[0] : null;
        } catch (err) {
            error = err.message;
        } finally {
            loading = false;
        }
    });

    // Function to cancel the subscription
    async function cancelSubscription() {
        if (!subscription) return;

        const confirmed = confirm('Are you sure you want to cancel your subscription?');
        if (!confirmed) return;

        try {
            const { error: cancelError } = await supabase
                .from('subscriptions') // Replace with your actual subscriptions table name
                .delete()
                .eq('id', subscription.id); // Assuming you have an id field for the subscription

            if (cancelError) {
                throw new Error(cancelError.message);
            }

            alert('Subscription cancelled successfully.');
            subscription = null; // Clear the subscription after cancellation
        } catch (err) {
            error = err.message;
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
        font-size: 1.5rem;
        color: #333;
    }

    .loading {
        text-align: center;
        margin: 20px 0;
    }

    .error-message {
        color: red;
        margin: 10px 0;
    }

    .info {
        margin: 10px 0;
    }

    .cancel-button {
        background-color: #ff194f;
        color: white;
        border-radius: 5px;
        padding: 10px 15px;
        border: none;
        cursor: pointer;
    }

    .cancel-button:hover {
        opacity: 0.8;
    }
</style>

<div class="container">
    <h5>My Subscriptions</h5>

    {#if loading}
        <p class="loading">Loading...</p>
    {:else}
        {#if error}
            <p class="error-message">{error}</p>
        {/if}

        {#if user}
            <p class="info">User Email: <strong>{user.email}</strong></p>
            
            {#if subscription}
                <p class="info">Subscription ID: <strong>{subscription.id}</strong></p>
                <button class="cancel-button" on:click={cancelSubscription}>Cancel Subscription</button>
            {:else}
                <p class="info">You do not have an active subscription.</p>
            {/if}
        {:else}
            <p>Please log in to manage your subscriptions.</p>
        {/if}
    {/if}
</div>