import { defineConfig } from 'vite';
import svelte from '@sveltejs/vite-plugin-svelte'; // Correct import syntax

export default defineConfig({
  plugins: [svelte()],
});