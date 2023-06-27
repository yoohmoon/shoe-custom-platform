import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

/* 
  // scene 생성
  let scene = new THREE.Scene();
  scene.background = new THREE.Color('black')
*/

// scene
export const createScene = (color) => {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(color);
  return scene;
};

// textures
export const loadTexture = (url) => {
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load(url);
  texture.magFilter = THREE.NearestFilter;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;

  return texture;
};

/* 
  // lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(1, 2, 3);
  directionalLight.castShadow=true;
  directionalLight.shadow.mapSize.width = 512;
  directionalLight.shadow.mapSize.height = 512;
  directionalLight.shadow.camera.near = 0.5;
  directionalLight.shadow.camera.far = 500;

  const pointLight = new THREE.PointLight(0xffffff, 0.1, 100);
  pointLight.position.set(3, 5, 5);
  pointLight.castShadow=true;
  pointLight.shadow.mapSize.width = 512;
  pointLight.shadow.mapSize.height = 512;
  pointLight.shadow.camera.near = 0.5;
  pointLight.shadow.camera.far = 500;
  
  scene.add(ambientLight, directionalLight);
  
*/

// lights
export const createLights = (scene) => {
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(1, 2, 3);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 512;
  directionalLight.shadow.mapSize.height = 512;
  directionalLight.shadow.camera.near = 0.5;
  directionalLight.shadow.camera.far = 500;

  const pointLight = new THREE.PointLight(0xffffff, 0.1, 100);
  pointLight.position.set(3, 5, 5);
  pointLight.castShadow = true;
  pointLight.shadow.mapSize.width = 512;
  pointLight.shadow.mapSize.height = 512;
  pointLight.shadow.camera.near = 0.5;
  pointLight.shadow.camera.far = 500;

  scene.add(ambientLight, directionalLight);
};

/* 
  // shadow ground
  const groundGeometry = new THREE.PlaneGeometry(200,200);
  const groundMaterial = new THREE.MeshStandardMaterial({color:0x222222});
  const ground = new THREE.Mesh(groundGeometry, groundMaterial);
  ground.rotation.x = -Math.PI/2;
  ground.position.y = -0.7;
  ground.receiveShadow=true;
  scene.add(ground);
*/

// shadow ground
export const createGround = (scene, color) => {
  const groundGeometry = new THREE.PlaneGeometry(200, 200);
  const groundMaterial = new THREE.MeshStandardMaterial({ color: color });
  const ground = new THREE.Mesh(groundGeometry, groundMaterial);
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.7;
  ground.receiveShadow = true;
  scene.add(ground);

  return ground;
};

/* //renderer

renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector("#canvas"),
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

renderer.setPixelRatio(window.devicePixelRatio);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;

 */

export const createRenderer = (canvasElement, antialias = true) => {
  const renderer = new THREE.WebGL1Renderer({
    canvas: canvasElement,
    antialias: antialias,
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;

  return renderer;
};

/* 
// camera 설정
camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000)
camera.position.set(-3,4,4);

 */

export const createCamera = () => {
  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(-3, 4, 4);

  return camera;
};

/* let controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.rotateSpeed = 0.8;
controls.zoomSpeed = 1.2;
 */

export const createControls = (camera, rendererElement) => {
  const controls = new OrbitControls(camera, rendererElement);

  controls.enableDamping = true;
  controls.rotateSpeed = 0.8;
  controls.zoomSpeed = 1.2;

  return controls;
};

/*     // 3D 모델 불러오기
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
        if(node.isMesh && node.userData.name && !node.userData.name.includes("Stitches")){
          componentsList.push(node.userData.name);
        }
      })
  
      // 3d 모델이 로드가 된 후에 실행
      animate();
    })
 */

export const loadGLTFModel = (modelPath, onLoad) => {
  const loader = new GLTFLoader();
  loader.load(modelPath, onLoad);
};

/*     // window resizing
    window.addEventListener('resize', onWindowResize, false);
  
    function onWindowResize(){
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
   */

export const resizeHandler = (camera, renderer) => {
  window.addEventListener("resize", onWindowResize, false);

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
};

// raycaster
// const raycaster = new THREE.Raycaster();
export const createRaycaster = () => {
  return new THREE.Raycaster();
};
