<script>
  export let variant;
  export let isLightMode;

  $: variClass = {
    primary: isLightMode 
      ? 'block desktop:w-80 tablet:w-80 w-80 moLandscape:w-60 bg-black text-white  hover:text-black hover:bg-white hover:border-2 hover:border-black' 
      :'block desktop:w-80 tablet:w-80 moLandscape:w-60 bg-white text-black hover:text-white hover:bg-black',
    inverse: 'block w-60 border-2 border-black bg-white text-black hover:text-white hover:bg-black',
    'primary-responsive':isLightMode
    ? 'text-black mobile:block tabletSmall:block mobile:w-20 tabletSmall:w-20 moLandscape:hidden tablet:hidden desktop:hidden bg-white border-[1.5px] border-[#2C2E31] hover:bg-black hover:bg-opacity-[.001] font-normal playFont'
    :'text-stone-200 mobile:block tabletSmall:block mobile:w-20 tabletSmall:w-20 moLandscape:hidden tablet:hidden desktop:hidden bg-transparent border-[1.5px] border-text-stone-200 hover:bg-black hover:bg-opacity-10 font-normal hover:bg-black hover:bg-opacity-20 playFont',
    'inverse-sm': isLightMode 
      ? 'w-40 bg-transparent border-2 border-black hover:bg-black hover:bg-opacity-10' 
      : 'w-40 bg-transparent border-2 border-white hover:bg-black hover:bg-opacity-20',
      'inverse-responsive': isLightMode 
      ? 'moLandscape:block moLandscape:w-60 moLandscape:mb-1.5 tablet:w-40 desktop:w-40 tablet:inline-block desktop:inline-block bg-transparent border-2 border-black hover:bg-black hover:bg-opacity-10' 
      : 'moLandscape:block moLandscape:w-60 moLandscape:mb-1.5 tablet:w-40 desktop:w-40 tablet:inline-block desktop:inline-block bg-transparent border-2 border-white hover:bg-black hover:bg-opacity-20',
    'inverse-lg': isLightMode 
      ? 'block mb-3 w-80 bg-transparent border-2 border-white hover:bg-white hover:bg-opacity-20' 
      : 'block mb-3 w-80 bg-transparent border-2 border-black hover:bg-black hover:bg-opacity-20'
  }

  
</script>

<button class="{variClass[variant]} p-2 font-bold rounded-full mx-auto duration-200 ease-in-out"  on:click>
  <slot/>
</button>

<style>
  .playFont {
    font-family: 'Playfair Display SC', sans-serif;
  }
</style>