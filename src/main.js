import { mount } from 'svelte'
import './app.css'
import App from './App.svelte'
import 'materialize-css/dist/css/materialize.min.css';

const app = mount(App, {
  target: document.getElementById('app'),
})

export default app
