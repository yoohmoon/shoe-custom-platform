<script>
  import Button from "$lib/shared/Button.svelte";

  export let message = "이대로 주문하시겠습니까?";
  export let subMessage = "";
  export let showModal = false;
  export let isPaying = false;

</script>

{#if showModal}

<div class="fixed flex items-center justify-center w-full h-full bg-black bg-opacity-80 z-10" class:payment={isPaying} on:click|self>
  <div class="modal flex flex-col gap-3 p-6 rounded-lg max-w-lg min-w-[30%] mx-auto my-80 text-center bg-white ">
    <p class="font-bold text-black">{message}</p>
    <p class="mb-5">{subMessage}</p>
    <slot></slot>
    <Button variant="inverse">주문하기</Button>
  </div>
</div>
{/if}

<style>
  .payment .modal{
    background-color: blanchedalmond;
  }
</style>