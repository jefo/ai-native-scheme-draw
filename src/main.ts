import { mount } from 'svelte';
import App from './App.svelte';
import { router } from './app/stores/router.svelte.ts';
import './app.css';

// Sync router to current URL hash on boot
router.sync();

const app = mount(App, { target: document.getElementById('app')! });

export default app;
