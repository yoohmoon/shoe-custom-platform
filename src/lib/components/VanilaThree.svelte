<script>
  import * as THREE from "three";
  import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
  import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"
  import { onMount } from "svelte";
  // import {theme} from '../store';/

  // export let theme = "light"
  // export let theme;
  // let themeMode = $theme;

  // const bgMode = {
  //   "dark" : 'black',
  //   "light": 'white'
  // };

  // let bgc = bgMode[theme];

  // console.log(bgc)

  // $:{
  //   bgc = bgMode[theme];
  // }

  let scene = new THREE.Scene();
  scene.background = new THREE.Color('black');

  // console.log("scene ",scene)

  onMount(()=>{



    let camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000)

  camera.position.set(0, 0, 1000);

  function addSphere(scene) {
    let geometry = new THREE.SphereGeometry( 5, 32, 32 );
    let material = new THREE.MeshPhongMaterial({color: 0x44aa99, roughness: 7});
    let sphere = new THREE.Mesh( geometry, material );
    sphere.position.set(0, 5, -100);
    sphere.scale.set(90, 90, 90);
    sphere.name = 'my-sphere';
    scene.add( sphere );
  }
  addSphere(scene);


  let default_position_y = -55;
  let acceleration = 70;
  let bounce_distance = 40;
  let bottom_position_y = -4;
  let time_step = 0.02;
  let time_counter = Math.sqrt(bounce_distance * 2 / acceleration);
  let initial_speed = acceleration * time_counter;
  let sphere = scene.getObjectByName("my-sphere");



  let loader = new GLTFLoader();

  loader.load("/models/gltf/rocket.gltf", function (gltf) {
    scene.add(gltf.scene);
    console.log(gltf)


  let controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.rotateSpeed = 0.8;
  controls.zoomSpeed = 1.2; 

  function animate() {
    requestAnimationFrame(animate);
    gltf.scene.rotation.y += 0.07;
    gltf.scene.position.z = 500;
    gltf.scene.scale.set(0.9,0.9,0.9);




    // if (gltf.scene.position.y < bottom_position_y+ default_position_y) {
    //   time_counter = 0;
    // }
    // gltf.scene.position.y = default_position_y + bottom_position_y + initial_speed * time_counter - 0.5 * acceleration * time_counter * time_counter;
    // time_counter += time_step;


    // sphere.rotation.y += 0.02;

    renderer.render(scene, camera);
    controls.update();
  }

  animate();


  });


  //lights
  let Slight = new THREE.SpotLight('red', 1);
  let light = new THREE.RectAreaLight(0xffff00, 0.5, 20, 20);
  let DLight = new THREE.DirectionalLight('blue',0.75);
  let PLight = new THREE.PointLight('red', 1);
  let ALight = new THREE.AmbientLight(0xffffff,0.75);
  DLight.position.set(-100, 150, 100);
  DLight.castShadow=true;
  PLight.position.set(30, 30, 300);
  scene.add(PLight, DLight, ALight);



  let renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#canvas"),
    antialias: true,
  });
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.setSize(window.innerWidth, window.innerHeight);
})


// 추가
import {colorData} from '$lib/colorData.js'
import {materialData} from '$lib/materialData.js'
import Modal from "./Modal.svelte";
import Button from "$lib/shared/Button.svelte";

let showModal = false;

const toggleModal = () =>{
 showModal = !showModal;
}

</script>

  <Modal message="이대로 주문하시겠습니까?" {showModal} on:click={toggleModal}/>

<main>
<canvas id="canvas" style="relative"></canvas>
<div class="flex flex-col fixed top-0 right-0 w-[450px] h-screen bg-white bg-opacity-20 backdrop-blur text-white overflow-visible">

  <!-- 영역 선택 안내 Nav -->
  <nav class="h-24 border-2 border-white font-bold text-lg text-center p-8">
    <!-- <div>Menu</div> -->
    <div class="align-middle">영역을 선택해주세요</div>
  </nav>

  <div class="flex-1 p-5 border-2 border-t-0 border-white overflow-auto">
      <h3 class="pb-2 text-lg font-bold">Color</h3>
      <ul class="grid grid-cols-4 gap-y-2 md:grid-cols-3  lg:grid-cols-4 ">
        {#each colorData as color}
        <li class="text-center">
          <button class="w-12 h-12 rounded-full" style="background-color: {color.value};"></button>
          <div class="text-sm">{color.name}</div>
        </li>
        {/each}
      </ul>

      <h3 class="pt-5 pb-3 text-lg font-bold">Material</h3>
      <ul class="grid grid-cols-4 md:grid-cols-3  lg:grid-cols-4 ">
        {#each materialData as material}
        <li class="text-center">
          <button class="w-12 h-12 rounded-full bg-no-repeat bg-cover" style="background-image: url({material.img});"></button>
          <div class="text-sm">{material.name}</div>
        </li>
        {/each}

  </div>
  <div class="h-[200px] p-5 border-2 border-t-0 border-white">
<div class="w-150 mx-auto mb-4 text-center">
  <Button variant="inverse-sm">다시하기</Button>
  <Button variant="inverse-sm">저장하기</Button>
</div>
<Button variant="primary" on:click={toggleModal}>구매하기</Button>

  </div>


</div>
</main>

