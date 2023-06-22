<script>
  import { onMount } from "svelte";
  import {createState} from "$lib/stores/shoeStore";
  import {showModal, toggleModal} from "$lib/stores/modalStore";
  import {createScene, createLights, createGround} from "$lib/utility/threeFunctions"
  import * as THREE from "three";
  import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
  import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
  import {colorData} from '$lib/colorData.js'
  import Modal from "$lib/components/Modal.svelte";
  import Button from "$lib/shared/Button.svelte";
  import OptionGrid from "$lib/shared/OptionGrid.svelte";
  import {materialInfo} from '$lib/customData.js';
  import FaRegularHeart from '~icons/fa-regular/heart';
  import FaUndo from '~icons/fa-solid/undo';
  import Logo from "$lib/components/Logo.svelte";
  import ButtonMode from "$lib/components/ButtonMode.svelte";

  // stores
  const state = createState();

  // $ : console.log("state ",state)
  
  const alertSelectMesh = () =>{
    alert("신발 내 영역을 선택해주세요.");
    return "신발 내 영역을 선택해주세요.";
  }
  
  let isMenuClicked = false;
  
  const toggleMenu = () =>{
    isMenuClicked=!isMenuClicked;
  }
  
  
  const handleComponentClick = (componentName) => {
    selectedComponent = componentName;
  
    model.traverse((node)=>{
      if(node.isMesh && node.userData.name === componentName){
        $state.clickedMesh = node;
      }
    });
  };
  
  
  
  // 전역 변수 생성
  let camera;
  let model;
  
  let intersects;
  // let clickedMesh;
  
  let componentsList = [];
  let selectedComponent = null;
  
  // 여기 수정
  let renderer;

  // 함수 모듈화 수정
  let scene;

  // darkMode 수정
  let ground;
  // let isLightMode = true; //darkMode로 시작
  // let isLightMode; //darkMode로 시작
  let isLightMode;

if (typeof window !== "undefined") {
  isLightMode = localStorage.getItem('color-theme') === 'light'; // match the initial value with local storage
}

  const handleThemeChange = (event) =>{
    const theme = event.detail;
    isLightMode = theme === 'light';
    scene.background = new THREE.Color(isLightMode? 'white' : 'black');
    ground.material.color.set(isLightMode?'rgb(246, 246, 246)':0x222222);
  }
  
  const handlePurchase = () =>{
    // console.log("저장하기 ", appliedOptions);
  
    let optionsString = "";
  
    for(let meshName in $state.appliedOptions){
      let options = $state.appliedOptions[meshName];
      optionsString += `${meshName}: Color - ${options.color}, Material - ${options.material}\n`;
    }
  
    return optionsString;
  }
  
  const handlePurchaseBtn = () => {
    let purchaseOptions = handlePurchase();
    console.log(purchaseOptions);
    isSaveBtnClicked = false;
    toggleModal();
  }
  
  const handleResetBtn = () =>{
    location.reload()
  }
  
  
  // screenshot function
  let screenshot = "";
  let  isSaveBtnClicked = false;
  
  const handleSaveBtn = () => {
    renderer.render(scene, camera);
    screenshot = renderer.domElement.toDataURL();
    // document.getElementById('image').src = renderer.domElement.toDataURL();
  
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


    renderer = new THREE.WebGL1Renderer({canvas:document.querySelector("#canvas"), antialias:true})
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
  
    // camera 설정
    camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000)
    camera.position.set(-3,4,4);
  
    let controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.rotateSpeed = 0.8;
    controls.zoomSpeed = 1.2;
  
  
    // window resizing
    window.addEventListener('resize', onWindowResize, false);
  
    function onWindowResize(){
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
  
    function render(){
      renderer.render(scene, camera)
    }
  
  
    function animate(){
      requestAnimationFrame(animate);
      controls.update();
      render();
    }
  
  
  // 개별 매시 탐지
  renderer.domElement.addEventListener('click', onMouseClick, false);
  
  
  function onMouseClick(event) {
    // 마우스의 좌표 저장할 Vector2 객체 생성
    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);
  
    // 광선 상에 3d 모델과 교차한 객체 유무 확인 후, 결과를 배열에 저장
    intersects = raycaster.intersectObject(model, true);
    console.log("model? ", model)
    
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
    let loader = new GLTFLoader();
  
    loader.load("/models/gltf/Loafers.glb", function(gltf){
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
        if(node.isMesh && node.userData.name){
          componentsList.push(node.userData.name);
        }
      })
  
      // 3d 모델이 로드가 된 후에 실행
      animate();
    })
  
  })
  
  </script>
  
  {#if isSaveBtnClicked}
  <Modal message="저장 성공!" subMessage="선택한 커스텀 옵션이 성공적으로 저장되었습니다." showModal={$showModal} on:click={toggleModal} screenshot={screenshot} isSaveBtnClicked={isSaveBtnClicked}> 
    <div>
      <img src="{screenshot}" alt="screenshot"/>
    </div>
  </Modal>
  
  {:else}
    
  <Modal message="이대로 주문하시겠습니까?" subMessage="선택한 옵션을 확인해주세요." showModal={$showModal} on:click={toggleModal} appliedOptions={$state.appliedOptions} screenshot={screenshot} isSaveBtnClicked={isSaveBtnClicked}>
    <ul>
      {#each Object.entries($state.appliedOptions) as [meshName, options] }
        <li class="flex flex-col gap-5 mb-6">
          <p class="font-bold text-black">{meshName}</p>
          <div class="flex justify-center items-center gap-3">
            {#if options.color}
            <button class="w-9 h-9 rounded-full" style="background-color: {options.color? options.color : ""};" ></button>
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
  
    {#if !isMenuClicked}
    <div class="flex-1 p-5 border border-x-0 overflow-auto {isLightMode?' border-y-[#2C2E31]':'border-white'}">
      <OptionGrid title="Color" data="{colorData}">
        <div class="mb-3" slot="item" let:item>
            <button class="w-12 h-12 rounded-full {isLightMode?'border-2 border-gray-400':''}" style="background-color: {item.value};" on:click={() => state.handleColorChange(item)}></button>
            <div class="text-sm select-none">{item.name}</div>
        </div>
      </OptionGrid>
      
      <OptionGrid title="Material" data="{materialInfo}">
        <div class="mb-3" slot="item" let:item>
          <button class="w-12 h-12 rounded-full bg-no-repeat bg-cover {isLightMode?'border-2 border-gray-400':''}" style="background-image: url({item.urls.base});" on:click={()=>state.handleMaterialChange(item)}></button>
          <div class="text-sm select-none">{item.name}</div>
        </div>
      </OptionGrid>
    </div>
  
  {:else}
  
  
  <div class="flex-1 p-5 border border-x-0 overflow-auto {isLightMode?' border-y-[#2C2E31]':'border-white'}">
    <OptionGrid title="Components" data={componentsList} gridClass="grid-cols-2 gap-y-4 md:grid-cols-1  lg:grid-cols-2">
      <li class="text-center text-lg cursor-pointer hover:font-semibold transition-all duration-150 ease-in-out {selectedComponent===item&&"font-extrabold"}" on:click={()=>{handleComponentClick(item)}} slot="item" let:item>{item}
      </li>
    </OptionGrid>
  
  </div>
  {/if}
  
    <div class="flex flex-col items-center h-[150px] p-5">
      <div class="w-150 mx-auto mb-4 text-center">
        <!-- <Button variant="inverse-sm" >
          <div class="flex justify-center items-center gap-2 text-sm">
            <FaUndo class="w-4 h-4" />
            <span>되돌리기</span>
         </div>
        </Button> -->
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
    <!-- <Button variant="inverse-lg" on:click={handleSaveBtn}>
      <div class="flex justify-center items-center gap-2">
        <FaRegularHeart/>
        <span>저장하기</span>
      </div>
    </Button> -->
  
      <Button variant="primary" on:click={handlePurchaseBtn} {isLightMode}>구매하기</Button>
    </div>
  
  </div>
  </main>
  