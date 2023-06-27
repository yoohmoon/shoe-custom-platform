<script>
  import OptionGrid from "$lib/shared/OptionGrid.svelte";
  import { createEventDispatcher } from "svelte";

  export let isLightMode;
  export let colorData;
  export let selectedColorItem;

  const dispatch = createEventDispatcher();
  const changeColor = (item) => {
    dispatch("colorChanged", {item})
  }
</script>

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