<script>
  import Modal from "$lib/components/Modal.svelte";
  
  export let showModal;
  export let screenshot;
  export let toggleModal;


</script>

<Modal message="저장 성공!" subMessage="선택한 커스텀 옵션이 성공적으로 저장되었습니다." showModal={$showModal} on:click={toggleModal} screenshot={screenshot}> 
  <div>
    <img src="{screenshot}" alt="screenshot" class="mb-3"/>
  </div>
</Modal>
