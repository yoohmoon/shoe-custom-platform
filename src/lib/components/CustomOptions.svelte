<script>
export let title;
export let arrayData;
export let arrayElem;

import {colorData} from '$lib/colorData.js';
import {materialData} from '$lib/materialData.js';

</script>

<h3 class="pb-2 text-lg font-bold">{title}</h3>
  <ul class="grid grid-cols-4 gap-y-2 md:grid-cols-3  lg:grid-cols-4 ">
    {#each {if (condition) {
      arrayData
    }} as arrayElem}
      <!-- <li class="text-center"> -->
        <slot name="colorSolot" arrayElem ={arrayElem}/>
        <!-- <button class="w-12 h-12 rounded-full" style="background-color: {color.value};" on:click={()=>handleColorChange(color.value)}></button> -->
        <!-- <div class="text-sm">{color.name}</div> -->
      <!-- </li> -->
    {/each}
  </ul>


  <!-- color -->
  <!-- 

    <h3 class="pb-2 text-lg font-bold">Components</h3>
      <ul class="grid grid-cols-2 gap-y-4 md:grid-cols-1  lg:grid-cols-2 ">
        {#each componentsList as component}
        <li class="text-center text-lg cursor-pointer hover:font-semibold transition-all duration-150 ease-in-out {selectedComponent===component&&"font-extrabold"}" on:click={()=>{handleComponentClick(component)}}>{component}
          <button class="w-12 h-12 rounded-full" style="background-color: {color.value};" on:click={()=>handleColorChange(color.value)}></button> -->
          <!-- <div class="text-sm"></div>
        </li>
        {/each}
      </ul>
   -->