<script>
  import Modal from "$lib/components/Modal.svelte";

  export let showModal;
  export let toggleModal;
  export let appliedOptions;

</script>

<Modal message="이대로 주문하시겠습니까?" subMessage="선택한 옵션을 확인해주세요." showModal={$showModal} on:click={toggleModal} appliedOptions={$appliedOptions}>
  <ul>
    {#each Object.entries($appliedOptions || {}) as [meshName, options] }
      <li class="flex flex-col gap-5 mb-6">
        <p class="font-bold text-black">{meshName}</p>
        <div class="flex justify-center items-center gap-3">
          {#if options.color}
          <button class="w-9 h-9 rounded-full border-2" style="background-color: {options.color? options.color : ""};" ></button>
          {:else} <div class="text-sm">색상 선택 안함  -</div>
          {/if}
          <div class="text-sm">{options.material?options.material:"재질 선택 안함"}</div>
        </div>
      </li>
    {/each}
  </ul>
</Modal>