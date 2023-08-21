<script>
  import FaRegularHeart from '~icons/fa-regular/heart';
  import FaUndo from '~icons/fa-solid/undo';
  export let iconType;
</script>

<div class="flex justify-center items-center gap-2 text-sm">
  {#if iconType==='save'}
    <FaRegularHeart class="w-4 h-4" />
    <span>저장하기</span>
  {:else if iconType==='reset'}
    <FaUndo class="-scale-100 w-4 h-4" />
    <span>다시하기</span>
  {:else if iconType==='reset-responsive'}
    <FaUndo class="-scale-100 w-4 h-4" />
  {/if}
 
</div>