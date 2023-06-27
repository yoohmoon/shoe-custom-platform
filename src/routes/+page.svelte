<script>
  import { onMount } from "svelte";
  import {createState} from "$lib/stores/shoeStore";
  import {showModal, toggleModal} from "$lib/stores/modalStore";
  import {createScene, createLights, createGround, createRenderer, createCamera, createControls, loadGLTFModel, resizeHandler, createRaycaster} from "$lib/utility/threeFunctions"
  import * as THREE from "three";
  import {colorData} from '$lib/colorData.js'
  import Modal from "$lib/components/Modal.svelte";
  import Button from "$lib/shared/Button.svelte";
  import {materialInfo} from '$lib/customData.js';
  import FaRegularHeart from '~icons/fa-regular/heart';
  import FaUndo from '~icons/fa-solid/undo';
  import Logo from "$lib/components/Logo.svelte";
  import ButtonMode from "$lib/components/ButtonMode.svelte";
  import { handleComponentClick } from "../lib/utility/componentManager";
  import { onMouseClick } from '$lib/utility/mouseEvents.js';

  import { appliedOptions } from "$lib/stores/store";
  import ColorOption from "$lib/components/ColorOption.svelte";
  import MaterialOption from "$lib/components/MaterialOption.svelte";
  import ComponentOption from "$lib/components/ComponentOption.svelte";

  // stores
  const state = createState();

  let isMenuClicked = false;
  
  const toggleMenu = () =>{
    isMenuClicked=!isMenuClicked;
  }
  
 let handleClick = (e)=>{
  // console.log("comp clicked! ",e.detail.item)
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

  const handleMouseClick = (event) =>{
    onMouseClick(event, raycaster, camera, model, $state);
  }
  
  // 개별 매시 탐지
  renderer.domElement.addEventListener('click', onMouseClick, false);
  // renderer.domElement.addEventListener('click', handleMouseClick, false);

 
  function onMouseClick(event) {
    // 마우스의 좌표 저장할 Vector2 객체 생성
    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  
    raycaster.setFromCamera(mouse, camera);
  
    // 광선 상에 3d 모델과 교차한 객체 유무 확인 후, 결과를 배열에 저장
    const intersects = raycaster.intersectObject(model, true);
    // console.log("model? ", model)
    
    // 교차한 객체가 있을 경우
    if (intersects.length > 0) {
      // 카메라와 가장 가까운 교차 객체를 변수에 저장
      $state.clickedMesh = intersects[0].object;
  
      // userData 객체에 name 속성이 있는지 여부 확인
      if ($state.clickedMesh.userData && $state.clickedMesh.userData.name) {
        renderer.domElement.style.cursor = 'pointer';
        
      } else {
        console.log("이름이 없는 속성입니다.");
        $state.clickedMesh=null;
      }
    } 
    // else{
    //    // 교차한 객체가 없는 경우 alertSelectMesh() 함수를 호출
    //   alertSelectMesh()
    // }
  }



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
  <Modal message="저장 성공!" subMessage="선택한 커스텀 옵션이 성공적으로 저장되었습니다." showModal={$showModal} on:click={toggleModal} screenshot={screenshot} isSaveBtnClicked={isSaveBtnClicked}> 
    <div>
      <img src="{screenshot}" alt="screenshot"/>
    </div>
  </Modal>
  
  {:else}
    
  <Modal message="이대로 주문하시겠습니까?" subMessage="선택한 옵션을 확인해주세요." showModal={$showModal} on:click={toggleModal} appliedOptions={$appliedOptions} screenshot={screenshot} isSaveBtnClicked={isSaveBtnClicked}>
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
  {/if}
  
  
  <main>
  <canvas id="canvas" style="relative"></canvas>
  <Logo {isLightMode}/>
  <ButtonMode on:themeChange={handleThemeChange} class="inline-block dark:hover:text-white hover:text-gray-900"/>
  <div class="flex flex-col fixed top-0 right-0 w-[450px] h-screen bg-white {isLightMode?' text-[#2C2E31]': ' text-white bg-opacity-20 backdrop-blur'}    overflow-visible">
    <nav class="h-24 p-8  font-bold text-lg text-center">
      {#if !isMenuClicked}
        <svg class="absolute w-7 h-7 cursor-pointer {isLightMode?'fill-[#2C2E31]':'fill-white'}" on:click={toggleMenu} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path d="M3 6h18v2h-18zm0 5h18v2h-18zm0 5h18v2h-18z"/>
        </svg>
      {:else}
        <svg class="absolute w-7 h-7 cursor-pointer {isLightMode?'fill-[#2C2E31]':'fill-white'}" on:click={toggleMenu} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M6 18L18 6M6 6l12 12" stroke="{isLightMode?'#2C2E31':'white'}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" />
        </svg>
      {/if}
  
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
          <div class="flex justify-center items-center gap-2 text-sm">
            <FaRegularHeart class="w-4 h-4" />
            <span>저장하기</span>
         </div>
        </Button>
          
        <Button variant="inverse-sm" on:click={handleResetBtn} {isLightMode}>
          <div class="flex justify-center items-center gap-2 text-sm">
            <FaUndo class="-scale-100 w-4 h-4" />
            <span>다시하기</span>
         </div>
      </Button>
    </div>
      <Button variant="primary" on:click={handlePurchaseBtn} {isLightMode}>구매하기</Button>
    </div>
  
  </div>
  </main>
  