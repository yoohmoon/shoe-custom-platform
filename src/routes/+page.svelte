<script>
  import { onMount } from "svelte";
  import * as THREE from "three";
  import {createState} from "$lib/stores/shoeStore";
  import {showModal, toggleModal} from "$lib/stores/modalStore";
  import { appliedOptions } from "$lib/stores/store";
  import Button from "$lib/shared/Button.svelte";
  import IconButton from "$lib/shared/IconButton.svelte";
  import {createScene, createLights, createGround, createRenderer, createCamera, createControls, loadGLTFModel, resizeHandler, createRaycaster} from "$lib/utility/threeFunctions"
  import { handleComponentClick } from "$lib/utility/componentManager";
  import { onMouseClick } from '$lib/utility/mouseEvents.js';
  import Logo from "$lib/components/Logo.svelte";
  import ButtonMode from "$lib/components/ButtonMode.svelte";
  import ColorOption from "$lib/components/ColorOption.svelte";
  import MaterialOption from "$lib/components/MaterialOption.svelte";
  import ComponentOption from "$lib/components/ComponentOption.svelte";
  import SvgIcon from "$lib/components/SvgIcon.svelte";
  import SaveModal from "$lib/components/SaveModal.svelte";
  import OrderModal from "$lib/components/OrderModal.svelte";
  import {colorData} from '$lib/colorData.js'
  import {materialInfo} from '$lib/customData.js';

  // stores
  const state = createState();

  let isMenuClicked = false;

  const handleMenuToggle = (e) =>{
    isMenuClicked = e.detail.isMenuClicked
  }
  
  let handleClick = (e)=>{
    handleComponentClick(e.detail.item, model, camera, state);
    selectedComponent = e.detail.item;
  }
  
  // 전역 변수 생성
  let model;

  let componentsList = [];
  let selectedComponent = null;

  // threeFunctions modules
  let scene, renderer, camera, controls, raycaster;

  // darkMode
  let ground;
  let isLightMode;

if (typeof window !== "undefined") {
  isLightMode = localStorage.getItem('color-theme') === 'light'; 
}

  const handleThemeChange = (event) =>{
    const theme = event.detail;
    isLightMode = theme === 'light';
    scene.background = new THREE.Color(isLightMode? 'white' : 'black');
    ground.material.color.set(isLightMode?'rgb(246, 246, 246)':0x222222);
  }

  const handlePurchaseBtn = () => {
    isSaveBtnClicked = false;
    toggleModal();
  }
  
  const handleResetBtn = () =>{
    location.reload();
  }
  
  // screenshot function
  let screenshot = "";
  let  isSaveBtnClicked = false;
  
  const handleSaveBtn = () => {
    renderer.render(scene, camera);
    screenshot = renderer.domElement.toDataURL();
  
    isSaveBtnClicked = true;
    toggleModal();
  }

  onMount(()=>{
    //scene
    scene = createScene(isLightMode?'white':'black');

    // lights
    createLights(scene);

    // shadow ground
    ground = createGround(scene, isLightMode? "rgb(246, 246, 246)":0x222222);

    //renderer
    const canvasElement = document.querySelector("#canvas");
    renderer=createRenderer(canvasElement);

    //camera
    camera = createCamera();

    //controls
    controls = createControls(camera, renderer.domElement);

    // window resizing
    resizeHandler(camera, renderer);

    function render(){
      renderer.render(scene, camera)
    }
  
  
    function animate(){
      requestAnimationFrame(animate);
      controls.update();
      render();
    }
  
    // raycaster
    raycaster = createRaycaster();

  const handleMouseClick = (event) => {
    const clickedMesh = onMouseClick(event, raycaster, camera, model);
    
    if (clickedMesh) {
      state.update((state) => {
        state.clickedMesh = clickedMesh;
        return state;
      });
    } else {
      console.log("올바른 영역이 클릭되지 않았습니다.");
    }
};
  
  // 개별 매시 탐지
  renderer.domElement.addEventListener('click', handleMouseClick, false);

  // 3D 모델 불러오기
  loadGLTFModel("/models/gltf/Loafers.glb", function(gltf){
    model = gltf.scene;
    scene.add(model)
    // console.log(gltf);
    model.scale.set(7,7,7)
    model.rotation.x = 0.45;
    model.rotation.y = 0.3;
    model.rotation.z = -0.15;
    model.position.x = -1;
    model.position.y = 0.4;


    // mesh name rendering 
    model.traverse((node)=>{
      if(node.isMesh){
        node.castShadow = true;
      }
      if(node.isMesh && node.userData.name && !node.userData.name.includes("Stitches")){
        componentsList.push(node.userData.name);
      }
    })

    // 3d 모델이 로드가 된 후에 실행
    animate();
  });
  })

  let selectedColorItem = null;

  const changeColor = (e) =>{
    state.handleColorChange(e.detail.item);
    selectedColorItem = e.detail.item;

    setTimeout(()=>{selectedColorItem=null;},1700)
  }
  
  </script>
  
  {#if isSaveBtnClicked}
    <SaveModal {showModal} {toggleModal} {screenshot}/>
  {:else}
    <OrderModal {showModal} {toggleModal} {appliedOptions}/>
  {/if}
  
  <main>
    <canvas id="canvas" style="relative"></canvas>
    <Logo {isLightMode}/>
    <ButtonMode on:themeChange={handleThemeChange} class="inline-block dark:hover:text-white hover:text-gray-900"/>
    <div class="flex flex-col fixed top-0 right-0 w-[450px] h-screen bg-white {isLightMode?' text-[#2C2E31]': ' text-white bg-opacity-20 backdrop-blur'}    overflow-visible">
      
      <nav class="h-24 p-8  font-bold text-lg text-center">
        <SvgIcon svgType={!isMenuClicked?'menu':'close'} {isLightMode} {isMenuClicked} on:menuToggle={handleMenuToggle}/>
        {#if $state.clickedMesh}
          <div class="align-middle">{$state.clickedMesh?.userData.name}</div>
        {:else}
          <div class="align-middle select-none">영역을 선택해주세요</div>
        {/if}
      </nav>

    <div class="flex-1 p-5 border border-x-0 overflow-auto {isLightMode?' border-y-[#2C2E31]':'border-white'}">
      {#if !isMenuClicked}
      <ColorOption {isLightMode} {colorData} {selectedColorItem} on:colorChanged={changeColor}/>
      <MaterialOption {isLightMode} {materialInfo} {state}/>
      {:else}
      <ComponentOption {selectedComponent} {componentsList} on:componentClicked={handleClick}/>
      {/if}
    </div>

      <div class="flex flex-col items-center h-[150px] p-5">
        <div class="w-150 mx-auto mb-4 text-center">
          <Button variant="inverse-sm" on:click={handleSaveBtn} {isLightMode} >
            <IconButton iconType="save"/>
          </Button>  
          <Button variant="inverse-sm" on:click={handleResetBtn} {isLightMode}>
            <IconButton iconType="reset"/> 
        </Button>
      </div>
        <Button variant="primary" on:click={handlePurchaseBtn} {isLightMode}>구매하기</Button>
      </div> 
    
    </div>
  </main>
  