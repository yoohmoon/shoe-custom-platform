<!-- <script>
  import { createEventDispatcher } from 'svelte';
  import { twMerge } from 'tailwind-merge';


  export let btnClass =
    'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5';
  // export let size: 'sm' | 'md' | 'lg' = 'md';

  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const dispatch = createEventDispatcher();


  const toggleTheme = () =>{
    const isDark = window.document.documentElement.classList.toggle('dark');
    const theme = isDark? 'dark':'light';
    localStorage.setItem('color-theme', theme);
    dispatch('themeChange', theme);
  }
</script>

<svelte:head>
  <script>
    localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)? window.document.documentElement.classList.add('dark'):window.document.documentElement.classList.remove('dark');
  </script>
</svelte:head>

<button 
on:click={toggleTheme} 
aria-label="Dark mode" 
type="button" {...$$restProps} 
class="{twMerge(btnClass, $$props.class)} fixed bottom-6 left-5"
>
  <span class="hidden dark:block">
    <slot name="lightIcon">
      <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1
  0 100-2H3a1 1 0 000 2h1z"
          fill-rule="evenodd"
          clip-rule="evenodd" />
      </svg>
    </slot>
  </span>
  <span class="block dark:hidden">
    <slot name="darkIcon">
      <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
      </svg>
    </slot>
  </span>
</button>
 -->

<script>
  import { createEventDispatcher, onMount } from 'svelte';
  import { twMerge } from 'tailwind-merge';

  import Moon from './ThemeSwitch/Moon.svelte'; // Import your SVG components
  import Sun from './ThemeSwitch/Sun.svelte';

  export let btnClass =
    'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5';

  let Icon;
  const dispatch = createEventDispatcher();

  let isDark;

  const toggleTheme = () =>{
    isDark = !isDark;
    // const isDark = window.document.documentElement.classList.toggle('dark');
    const theme = isDark? 'dark':'light';
    localStorage.setItem('color-theme', theme);
    dispatch('themeChange', theme);
    Icon = isDark ? Sun : Moon; // Update Icon to the correct SVG component
  }
  // // On component mount, set the correct SVG based on the stored theme
  // $: {
  //   const storedTheme = localStorage.getItem('color-theme');
  //   if (storedTheme === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  //     Icon = Sun;
  //   } else {
  //     Icon = Moon;
  //   }
  // }
  onMount(() => {
    // if (typeof window !== 'undefined') {
    //   const storedTheme = window.localStorage.getItem('color-theme');
    //   if (storedTheme === 'dark' || (!('color-theme' in window.localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    //     Icon = Sun;
    //   } else {
    //     Icon = Moon;
    //   }
    // }

    const storedTheme = localStorage.getItem('color-theme');
    isDark = storedTheme === 'dark';
    Icon = isDark?Sun:Moon;

  });
</script>

<button 
on:click={toggleTheme} 
aria-label="Dark mode" 
type="button" {...$$restProps} 
class="{twMerge(btnClass, $$props.class)} fixed bottom-6 left-5"
>
  <svelte:component this={Icon} class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" />
</button>
