<script>
  export let variant;
  export let isLightMode;

  $: variClass = {
    primary: isLightMode 
      ? 'block w-80 bg-black text-white  hover:text-black hover:bg-white hover:border-2 hover:border-black' 
      :'block w-80 bg-white text-black hover:text-white hover:bg-black',
    inverse: 'block w-60 border-2 border-black bg-white text-black hover:text-white hover:bg-black',
    'inverse-sm': isLightMode 
      ? 'w-40 bg-transparent border-2 border-black hover:bg-black hover:bg-opacity-10' 
      : 'w-40 bg-transparent border-2 border-white hover:bg-black hover:bg-opacity-20',
    'inverse-lg': isLightMode 
      ? 'block mb-3 w-80 bg-transparent border-2 border-white hover:bg-white hover:bg-opacity-20' 
      : 'block mb-3 w-80 bg-transparent border-2 border-black hover:bg-black hover:bg-opacity-20'
  }
</script>

<button class="{variClass[variant]} p-2 font-bold rounded-full mx-auto duration-200 ease-in-out"  on:click>
  <slot/>
</button>
