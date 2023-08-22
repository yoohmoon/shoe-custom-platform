import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { isMobile } from '../stores/responsiveStore';

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

export const createControls = (camera, rendererElement) => {
  const controls = new OrbitControls(camera, rendererElement);

  controls.enableDamping = true;
  controls.rotateSpeed = 0.8;
  controls.zoomSpeed = 1.2;

  return controls;
};

export const loadGLTFModel = (modelPath, onLoad) => {
  const loader = new GLTFLoader();
  loader.load(modelPath, onLoad);
};

// 반응형 너비 체크
const checkWindowSize = () => {
  if (window.innerWidth <= 768) {
    //576px
    isMobile.set(true);
  } else {
    isMobile.set(false);
  }
};

export const resizeHandler = (camera, renderer) => {
  checkWindowSize();
  window.addEventListener('resize', onWindowResize, false);

  function onWindowResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
  }
};

export const createRaycaster = () => {
  return new THREE.Raycaster();
};
