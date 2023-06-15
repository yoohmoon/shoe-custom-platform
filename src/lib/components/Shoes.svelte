<script>
import { onMount } from "svelte";
import * as THREE from "three";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {colorData} from '$lib/colorData.js'
import {materialData} from '$lib/materialData.js'
import Modal from "$lib/components/Modal.svelte";
import Button from "$lib/shared/Button.svelte";
import OptionGrid from "$lib/shared/OptionGrid.svelte";

let showModal = false;

const toggleModal = () =>{
 showModal = !showModal;
}

const handleColorChange = (colorValue) => {
  if(clickedMesh&&clickedMesh.material){
    // clickedMesh.material.color.set(colorValue);
    clickedMesh.material = new THREE.MeshStandardMaterial({color:colorValue});
  } else {
    alert("먼저 영역을 선택해주세요")
  }
}

const handleMaterialChange = (material) =>{
  if(clickedMesh&&clickedMesh.material){
    clickedMesh.material.color.set(material)
  }
}

const alertSelectMesh = () =>{
  alert("신발 내 영역을 선택해주세요.");
  return "신발 내 영역을 선택해주세요.";
}

let isMenuClicked = false;

const toggleMenu = (e) =>{
  isMenuClicked=!isMenuClicked;
}


const handleComponentClick = (componentName) => {
  selectedComponent = componentName;

  model.traverse((node)=>{
    if(node.isMesh && node.userData.name === componentName){
      clickedMesh = node;
    }
  });
};




// 전역 변수 생성
let camera;
let model;

let intersects;
let clickedMesh;

let componentsList = [];
let selectedComponent = null;

// scene 생성
let scene = new THREE.Scene();
scene.background = new THREE.Color('black')

// lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 2, 3);
const pointLight = new THREE.PointLight(0xffffff, 1, 100);
pointLight.position.set(3, 5, 2);

scene.add(ambientLight, directionalLight, pointLight);



onMount(()=>{
  let renderer = new THREE.WebGL1Renderer({canvas:document.querySelector("#canvas"), antialias:true})
  renderer.setSize(window.innerWidth, window.innerHeight);

  // camera 설정
  camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000)
  camera.position.set(0,0,5);

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
    render();
  }

  function render(){
    renderer.render(scene, camera)
  }


  function animate(){
    requestAnimationFrame(animate);
    controls.update()
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
    clickedMesh = intersects[0].object;

    // userData 객체에 name 속성이 있는지 여부 확인
    if (clickedMesh.userData && clickedMesh.userData.name) {
      console.log("Clicked Mesh userData Name: ", clickedMesh.userData.name);
      console.log(renderer.domElement);
      renderer.domElement.style.cursor = 'pointer';
      // console.log("Clicked Mesh 정보! ", intersects[0].material);
      
    } else {
      console.log("이름이 없는 속성입니다.");
      clickedMesh=null;
    }
  }
}

  
  // 3D 모델 불러오기
  let loader = new GLTFLoader();

  loader.load("/models/gltf/Loafers.glb", function(gltf){
    model = gltf.scene;
    scene.add(model)
    console.log(gltf);
    model.scale.set(4,4,4)
    model.rotation.x = 0.6;
    model.rotation.y = 0.6;
    model.position.x = -1.2;


    // mesh name rendering 
    model.traverse((node)=>{
      if(node.isMesh && node.userData.name){
        componentsList.push(node.userData.name);
      }
    })

    // 3d 모델이 로드가 된 후에 실행
    animate();
  })

})

</script>

<Modal message="이대로 주문하시겠습니까?" {showModal} on:click={toggleModal}/>

<main>
<canvas id="canvas" style="relative"></canvas>
<div class="flex flex-col fixed top-0 right-0 w-[450px] h-screen bg-white bg-opacity-20 backdrop-blur text-white overflow-visible">

  <nav class="h-24 border-2 border-white font-bold text-lg text-center p-8">
    {#if !isMenuClicked}
      <img src="/icons/menu.svg" alt="menu icon" class="absolute w-5 h-5 cursor-pointer" on:click={toggleMenu}/>  
    {:else}
      <img src="/icons/cancel.svg" alt="menu close icon" class="absolute w-4 h-4 cursor-pointer" on:click={toggleMenu}/>
    {/if}

    {#if clickedMesh}
      <div class="align-middle">{clickedMesh?.userData.name||alertSelectMesh()}</div>
    {:else}
      <div class="align-middle">영역을 선택해주세요</div>
    {/if}
  </nav>

  {#if !isMenuClicked}
  <div class="flex-1 p-5 border-2 border-t-0 border-white overflow-auto">
    <OptionGrid title="Color" data="{colorData}">
      <div class="mb-3" slot="item" let:item>
          <button class="w-12 h-12 rounded-full" style="background-color: {item.value};" on:click={() => handleColorChange(item.value)}></button>
          <div class="text-sm">{item.name}</div>
      </div>
    </OptionGrid>
    
    <OptionGrid title="Material" data="{materialData}">
      <div slot="item" let:item>
        <button class="w-12 h-12 rounded-full bg-no-repeat bg-cover" style="background-image: url({item.img});" on:click={handleMaterialChange()}></button>
        <div class="text-sm">{item.name}</div>
      </div>
    </OptionGrid>
  </div>

{:else}


<div class="flex-1 p-5 border-2 border-t-0 border-white overflow-auto">
  <OptionGrid title="Components" data={componentsList} gridClass="grid-cols-2 gap-y-4 md:grid-cols-1  lg:grid-cols-2">
    <li class="text-center text-lg cursor-pointer hover:font-semibold transition-all duration-150 ease-in-out {selectedComponent===item&&"font-extrabold"}" on:click={()=>{handleComponentClick(item)}} slot="item" let:item>{item}
    </li>
  </OptionGrid>

</div>
{/if}

  <div class="h-[200px] p-5 border-2 border-t-0 border-white">
    <div class="w-150 mx-auto mb-4 text-center">
      <Button variant="inverse-sm">다시하기</Button>
      <Button variant="inverse-sm">저장하기</Button>
    </div>
    <Button variant="primary" on:click={toggleModal}>구매하기</Button>
  </div>

</div>
</main>


<style>
  .menuIcon{
    background-image: url(/icons/menu.svg);
  }
</style>