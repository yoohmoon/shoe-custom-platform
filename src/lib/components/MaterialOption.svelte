<script>
  import OptionGrid from "$lib/shared/OptionGrid.svelte";
  export let materialInfo;
  export let isLightMode;
  export let state;


</script>
<OptionGrid title="Materials" data="{materialInfo}">
  <div class="mb-3" slot="item" let:item>
    <button class="w-12 h-12 rounded-full bg-no-repeat bg-cover {isLightMode?'border-2 border-gray-400':''}" style="background-image: url({item.urls.base});" on:click={()=>state.handleMaterialChange(item)}></button>
    <div class="text-sm select-none">{item.name}</div>
  </div>
</OptionGrid>