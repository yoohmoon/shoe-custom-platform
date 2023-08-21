<script>
  import { createEventDispatcher, onMount } from 'svelte';
  import { twMerge } from 'tailwind-merge';

  import Moon from './ThemeSwitch/Moon.svelte'; 
  import Sun from './ThemeSwitch/Sun.svelte';

  export let btnClass =
    'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5';

  let Icon;
  const dispatch = createEventDispatcher();

  let isDark;

  const toggleTheme = () =>{
    isDark = !isDark;

    const theme = isDark? 'dark':'light';
    localStorage.setItem('color-theme', theme);
    dispatch('themeChange', theme);
    Icon = isDark ? Sun : Moon; 
  }

  onMount(() => {
    const storedTheme = localStorage.getItem('color-theme');
    isDark = storedTheme === 'dark';
    Icon = isDark?Sun:Moon;
  });

</script>

<button 
on:click={toggleTheme} 
aria-label="Dark mode" 
type="button" {...$$restProps} 
class="{twMerge(btnClass, $$props.class)} fixed bottom-6 right-5"
>
  <svelte:component this={Icon} className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" />
</button>
