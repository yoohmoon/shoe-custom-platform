<script>
  import NewCanvas from "$lib/components/NewCanvas.svelte";
  import VanilaThree from "$lib/components/VanilaThree.svelte";
  import Shoes from "$lib/components/Shoes.svelte";

//  import {writable} from 'svelte/store'

// import {theme} from '../store'

//  const theme = writable('light');

  // let bgMode = writable({   dark: 'black',
  //   white: 'white'})

  // // const bgMode = {
  // //   dark: 'black',
  // //   white: 'white'
  // // };

  // let color = 'white';
  // function changeColor(color){
  //   if(color==='white'){
  //     color==='black'
  //   } else if( color==='black'){
  //     color==='white'
  //   }

  //   console.log(color)
  // }
  // function toggleTheme(){
  //   // $theme = $theme==='light'?'dark':'light'
  //   // theme.set($theme)
  //   $theme.update(currentTheme=> (currentTheme==="light"? "dark":"light"))
  // }

  // let items = ['dark','light'];
  // let activeItem = 'light';
  // const themeChange = (e) =>{
  //   activeItme = e.detail;
  // }
</script>

<!-- <NewCanvas/> -->

<!-- <div class="relative">
  <button class="absolute" on:click={toggleTheme}>{ $theme === 'light'? "Day" : "Night" }</button>
  <VanilaThree {theme} />
</div> -->


<!-- <VanilaThree/> -->
<Shoes/>