<script>
    import { supabase } from './supabaseClient';
    let products = [];

    async function fetchProducts() {
        const { data, error } = await supabase.from('wordpress_woo_product').select('*');
        if (error) console.error(error);
        else products = data;
    }

    // Fetch products when component mounts
    fetchProducts();
</script>

<style>
    .gallery {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); /* Responsive columns */
        gap: 16px;
        padding: 16px;
        background-color: #f6f6f6; /* Background color */
    }

    .product {
        border: 1px solid #ccc;
        padding: 8px;
        border-radius: 4px;
        text-align: center;
        background-color: white; /* White background for product cards */
        display: flex;
        flex-direction: column; /* Stack items vertically */
        justify-content: space-between; /* Space out items */
        height: 550px; /* Fixed height for uniformity */
    }

    img {
        max-width: 100%;
        height: auto;
    }

    h5 {
        color: #333; /* Darker text color for product names */
        margin: 8px 0;
    }

    p {
        color: #666; /* Lighter text color for product prices */
    }

    .download-button {
        background-color: #ff194f; /* Action button color */
        color: white; /* Text color for the button */
        border: none;
        padding: 12px 20px; /* Increased padding for more space around button */
        border-radius: 5px;
        cursor: pointer;
        text-decoration: none; /* Remove underline from link */
        margin-top: auto; /* Push button to the bottom of the product frame */
    }

    .download-button:hover {
        opacity: 0.8; /* Slightly darker on hover */
    }
</style>


<div class="gallery">
    {#each products as product}
        <div class="product">
            <img src={product.thumbnail} alt={product.name} />
            <h5>{product.name}</h5>
            <p>{product.short_description}</p>
            <a href={product.downloadable_url} class="download-button" download>Download now</a>
        </div>
    {/each}
</div>