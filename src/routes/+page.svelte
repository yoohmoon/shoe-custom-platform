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
  import MenuToggleSvg from '../lib/components/MenuToggleSvg.svelte';
  import DownArrow from '../lib/components/DownArrow.svelte';
  import UpArrow from '../lib/components/UpArrow.svelte';

  // store
  const state = createState();

  let isMenuClicked = false;

  const handleMenuToggle = (e) =>{
    isMenuClicked = e.detail.isMenuClicked
  }
  
  let handleClick = (e)=>{
    handleComponentClick(e.detail.item, model, camera, state);
    selectedComponent = e.detail.item;
  }
  
  let model;
  let componentsList = [];
  let selectedComponent = null;
  let scene, renderer, camera, controls, raycaster;
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
  
  let screenshot = "";
  let  isSaveBtnClicked = false;
  
  const handleSaveBtn = () => {
    renderer.render(scene, camera);
    screenshot = renderer.domElement.toDataURL();
  
    isSaveBtnClicked = true;
    toggleModal();
  }

  onMount(()=>{
    scene = createScene(isLightMode?'white':'black');

    createLights(scene);

    ground = createGround(scene, isLightMode? "rgb(246, 246, 246)":0x222222);

    const canvasElement = document.querySelector("#canvas");
    renderer=createRenderer(canvasElement);

    camera = createCamera();

    controls = createControls(camera, renderer.domElement);

    resizeHandler(camera, renderer);

    function render(){
      renderer.render(scene, camera)
    }
  
    function animate(){
      requestAnimationFrame(animate);
      controls.update();
      render();
    }
  
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
    model.scale.set(7,7,7)
    model.rotation.x = 0.45;
    model.rotation.y = 0.1;
    model.rotation.z = -0.15;
    model.position.x = 0.3;
    model.position.y = -0.4;

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
  let showMenu = false;

  const handleShowMenu = (e)=>{
    showMenu = false;
  }

  let showOptionMenu = false;
  const handleOptionMenu = ()=>{showOptionMenu=!showOptionMenu;}
  
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
    <!-- mobile ver. toolkit -->
    <div class="mobile:absolute top-6 right-5">
      <div class="mobile:absolute tabletSmall:absolute right-24 top-1 moLandscape:hidden tablet:hidden desktop:hidden">
        <Button variant="inverse-responsive" on:click={handleResetBtn} {isLightMode}>
          <IconButton iconType='reset-responsive'/>
        </Button>
      </div>
      <Button variant="primary-responsive" on:click={handlePurchaseBtn} {isLightMode}>DONE</Button>
    </div>
    <div class="block fixed mobile:bottom-7 tabletSmall:bottom-7 desktop:top-7 tablet:top-7 moLandscape:top-7 left-6 text-white cursor-pointer {showMenu?'hidden':'block'} " on:click={() => showMenu = !showMenu}><MenuToggleSvg {isLightMode} /></div>
    <div class="flex flex-col absolute {showOptionMenu?'mobile:h-[250px]':'mobile:h-[65px] pt-1'} desktop:inset-y-0 tablet:top-0 moLandscape:top-0 desktop:right-0 tablet:right-0 moLandscape:right-0 mobile:bottom-0 mobile:left-0 mobile:h-[250px] mobile:w-screen desktop:w-[450px] tablet:w-[400px] moLandscape:w-[300px] desktop:h-screen tablet:h-screen moLandscape:h-screen bg-white {isLightMode?' text-[#2C2E31]': ' text-white bg-opacity-20 backdrop-blur'} overflow-visible" class:hidden={!showMenu} class:sm:block={showMenu}>
      <nav class="flex justify-between items-center desktop:h-24 tablet:h-24 moLandscape:h-24 desktop:p-8 tablet:p-8 moLandscape:p-8 tabletSmall:h-14 mobile:h-14 tabletSmall:p-2 mobile:p-2  font-bold text-lg text-center">
        <SvgIcon svgType={!isMenuClicked?'menu':'close'} {isLightMode} {isMenuClicked} on:menuToggle={handleMenuToggle}/>
        {#if $state.clickedMesh}
        <div class="align-middle select-none m-auto pl-10">{$state.clickedMesh?.userData.name}</div>
        {:else}
        <div class="align-middle select-none m-auto pl-10 moLandscape:text-base tablet:text-lg desktop:text-lg">영역을 선택해주세요</div>
        {/if}
        <div class="mobile:block desktop:hidden tablet:hidden moLandscape:hidden rounded-full border-[1.5px] border-[#e5e5e5] cursor-pointer" on:click={handleOptionMenu}>
          {#if showOptionMenu}
          <DownArrow/>
          {:else}
          <UpArrow/>
          {/if}
        </div>
        <div class="cursor-pointer items-center mobile:hidden desktop:flex tablet:flex moLandscape:flex" on:click={()=>showMenu = false}>
          <MenuToggleSvg {isLightMode} class="inline-block absolute right-2 {isLightMode?'text-[#2C2E31]':'text-stone-200'}" />
        </div>
      </nav>

      <div class="flex-1 p-5 border border-x-0 overflow-auto {isLightMode?' border-y-[#2C2E31]':'border-white'} {showOptionMenu?'flex-1 h-auto':'desktop:block tablet:block moLandscape:block desktop:h-10 tablet:h-10 moLandscape:h-10 mobile:hidden tabletSmall:hidden tabletSmall:h-0 mobile:h-0'}">
        {#if !isMenuClicked}
        <ColorOption {isLightMode} {colorData} {selectedColorItem} on:colorChanged={changeColor}/>
        <MaterialOption {isLightMode} {materialInfo} {state}/>
        {:else}
        <ComponentOption {selectedComponent} {componentsList} on:componentClicked={handleClick}/>
        {/if}
      </div>

      <div class="mobile:hidden tabletSmall:hidden moLandscape:flex tablet:flex desktop:flex flex-col items-center mobile:h-[150px] desktop:h-[120px] tablet:h-[120px] desktop:p-5 tablet:p-5 moLandscape:p-2.5">
        <div class="w-150 mx-auto mb-4 text-center moLandscape:mb-0">
          <Button variant="inverse-responsive" on:click={handleSaveBtn} {isLightMode} >
            <IconButton iconType="save"/>
          </Button>  
          <Button variant="inverse-responsive" on:click={handleResetBtn} {isLightMode}>
            <IconButton iconType="reset"/> 
          </Button>
      </div>
        <Button variant="primary" on:click={handlePurchaseBtn} {isLightMode}>구매하기</Button>
      </div> 
    </div>
  </main>
