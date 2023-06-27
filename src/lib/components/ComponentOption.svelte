<script>
  import { createEventDispatcher } from "svelte";
  import OptionGrid from "$lib/shared/OptionGrid.svelte";

  export let componentsList;
  export let selectedComponent;

  const dispatch = createEventDispatcher();
  const handleClick = (item) => {
    dispatch("componentClicked", {item})
  }


</script>
<OptionGrid title="Components" data={componentsList} gridClass="grid-cols-2 gap-y-4 md:grid-cols-1  lg:grid-cols-2">
  <li class="text-center text-lg cursor-pointer hover:font-semibold transition-all duration-150 ease-in-out {selectedComponent===item&&"font-extrabold"}" on:click={()=>{handleClick(item)}} slot="item" let:item>{item}
  </li>
</OptionGrid>