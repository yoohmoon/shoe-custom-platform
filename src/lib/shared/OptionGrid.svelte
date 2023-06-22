<script>
export let title;
export let data;
export let gridClass = "grid-cols-4 gap-y-2 md:grid-cols-3  lg:grid-cols-4";

</script>

<h3 class="pb-2 text-lg font-bold select-none">{title}</h3>
<ul class="grid {gridClass}">
  {#each data as item}
  <li class="text-center">
    <slot name="item" {item}></slot>
  </li>
  {/each}
</ul>

