<script>
  import OptionGrid from "$lib/shared/OptionGrid.svelte";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  const changeColor = (item) => {
    console.log(item)
    dispatch("colorChanged",   {item})
  }


  export let isLightMode;
  export let colorData;
  export let selectedColorItem;
  // export let changeColor;
</script>

<!-- //원본 보존
<OptionGrid title="Color" data="{colorData}">
      <div class="mb-3" slot="item" let:item>
          <button class="w-12 h-12 rounded-full {isLightMode?'border-2 border-gray-400':''}" style="background-color: {item.value};" on:click={() => state.handleColorChange(item)}></button>
          <div class="text-sm select-none">{item.name}</div>
      </div>
    </OptionGrid>  -->

    <OptionGrid title="Colors" data="{colorData}">
      <div class="mb-3" slot="item" let:item>
        <button 
        class={`w-12 h-12 rounded-full ${isLightMode?'border-2 border-gray-400':''} ${item === selectedColorItem ? 'ring-4 ring-gray-400 ring-opacity-50' : ''}`} 
        style="background-color: {item.value};"
      on:click={()=> changeColor(item)}></button>
        {#if item === selectedColorItem}
          <div class="text-sm select-none">{item.name}</div>
        {/if}
      </div>
    </OptionGrid>
