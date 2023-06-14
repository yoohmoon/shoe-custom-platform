<script>
  export let variant;

  const variClass = {
    primary: 'block w-80 bg-white text-black hover:text-white hover:bg-black',
    inverse: 'block w-60 border-2 border-black bg-white text-black hover:text-white hover:bg-black',
    'inverse-sm': 'w-40 bg-transparent border-2 border-white hover:bg-white hover:bg-opacity-20'
  }
</script>

<button class="{variClass[variant]} p-2 font-bold rounded-full mx-auto duration-200 ease-in-out" on:click><slot/></button>
