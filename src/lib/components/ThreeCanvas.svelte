<!-- <script>
  import * as THREE from "three";
  import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
  import { onMount } from "svelte";

  let renderer;

  onMount(()=>{
    let scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer({
    canvas:document.querySelector('#canvas'),
    antialias: true
  })
  renderer.outputEncoding = THREE.sRGBEncoding;

  let camera = new THREE.PerspectiveCamera(30,1);
  camera.position.set(0,10,70)

  scene.background = new THREE.Color('white')

  // 조명
  // let light = new THREE.DirectionalLight(0xffff00,10);
  // scene.add(light)

   let loader = new GLTFLoader()
  loader.load('/rocket.gltf', function(gltf){
    scene.add(gltf.scene)
     renderer.render(scene, camera)
  })
 
  })

  
 
</script>

<canvas id="canvas" width="1000" height="600"></canvas> -->

<!-- <script>
  import * as THREE from "three";
  import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
  import { onMount } from "svelte";

  let scene = new THREE.Scene();
  let renderer;
  let canvas;

  onMount(() => {
    renderer = new THREE.WebGLRenderer({
      canvas
    });

    let loader = new GLTFLoader();
    loader.load("/rocket.gltf", (gltf) => {
      scene.add(gltf.scene);
      renderer.render(scene, new THREE.PerspectiveCamera());
    });
  });
</script>

<canvas bind:this="{canvas}" id="canvas" width="300" height="300"></canvas> -->

<!-- <script>
  import * as THREE from "three";
  import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
  import { onMount } from "svelte";

  let renderer;
  let scene;
  let camera;
    
  onMount(() => {
    scene = new THREE.Scene(); 
    camera = new THREE.PerspectiveCamera(75, 1000 / 600, 0.1, 1000);
    camera.position.set(0, 10, 70);

    renderer = new THREE.WebGLRenderer({ 
      canvas: document.querySelector("#canvas"), 
      antialias: true
    }); 
    renderer.setSize(1000, 600); 

    const loader = new GLTFLoader();
    loader.load("/rocket.gltf", (gltf) => {
      scene.add(gltf.scene);
      
      // 카메라를 모델을 향하게 설정하려면 이 코드를 사용하세요.
      camera.lookAt(gltf.scene.position);

        function animate() {
      requestAnimationFrame(animate);
      gltf.scene.rotation.y-=0.1
      renderer.render(scene, camera);
    }
    animate();
    });

  

    
  });
</script>

<canvas id="canvas" width="1000" height="600"></canvas>
 -->


<!-- geting started! -->

<script>
  import * as THREE from "three";
  import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
  import { onMount } from "svelte";

  let renderer;

  onMount(()=>{
    let scene = new THREE.Scene();


    let camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight,0.1,1000)

    camera.position.z=5;

    scene.background = new THREE.Color('pink')

    // renderer = new THREE.WebGLRenderer({
    // canvas:document.querySelector('#canvas'),
    // antialias: true

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement)

       let loader = new GLTFLoader()
  loader.load('/rocket.gltf', function(gltf){
    scene.add(gltf.scene)
  })
  renderer.render(scene, camera)
 
  })
  // renderer.outputEncoding = THREE.sRGBEncoding;

  // let camera = new THREE.PerspectiveCamera(30,1);
  // camera.position.set(0,10,70)

  // scene.background = new THREE.Color('white')

  // 조명
  // let light = new THREE.DirectionalLight(0xffff00,10);
  // scene.add(light)

  //  let loader = new GLTFLoader()
  // loader.load('/rocket.gltf', function(gltf){
  //   scene.add(gltf.scene)
  //    renderer.render(scene, camera)
  // })
 
  // })

  
 
</script>

<!-- <canvas id="canvas"></canvas> -->

<style>

  canvas{
    width: 100%;
    height: 100%;
  }
</style>