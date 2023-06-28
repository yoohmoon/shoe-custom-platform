<script>
  import { createEventDispatcher } from "svelte";

  export let svgType;
  export let isLightMode;
  export let isMenuClicked;

  const dispatch = createEventDispatcher();

  const toggleMenu = () =>{
    dispatch('menuToggle', {isMenuClicked: !isMenuClicked})
  }
</script>

{#if svgType==='menu'}
  <svg class="absolute w-7 h-7 cursor-pointer {isLightMode?'fill-[#2C2E31]':'fill-white'}" on:click={toggleMenu} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path d="M3 6h18v2h-18zm0 5h18v2h-18zm0 5h18v2h-18z"/>
  </svg>
{:else if svgType==='close'}
  <svg class="absolute w-7 h-7 cursor-pointer {isLightMode?'fill-[#2C2E31]':'fill-white'}" on:click={toggleMenu} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M6 18L18 6M6 6l12 12" stroke="{isLightMode?'#2C2E31':'white'}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" />
  </svg>
{/if}
