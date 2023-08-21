<script>
export let title;
export let data;
export let gridClass = "gap-y-1 mobile:grid-cols-6 tabletSmall:grid-cols-7 moLandscape:grid-cols-2 tablet:grid-cols-3 desktop:grid-cols-4";

</script>

<h3 class="pb-2 text-lg font-bold select-none">{title}</h3>
<ul class={`grid ${gridClass}`}>
  {#each data as item}
  <li class="text-center">
    <slot name="item" {item}></slot>
  </li>
  {/each}
</ul>

