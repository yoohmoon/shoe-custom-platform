<script>
  import * as THREE from "three";
  import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
  import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"
  import { onMount } from "svelte";

  const bgMode = {
    dark: 'black',
    white: 'white'
  }

  let scene = new THREE.Scene();
  scene.background = new THREE.Color(bgMode.dark);

  console.log("scene ",scene)


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




    if (gltf.scene.position.y < bottom_position_y+ default_position_y) {
      time_counter = 0;
    }
    gltf.scene.position.y = default_position_y + bottom_position_y + initial_speed * time_counter - 0.5 * acceleration * time_counter * time_counter;
    time_counter += time_step;


    sphere.rotation.y += 0.02;

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



</script>

<canvas id="canvas"></canvas>