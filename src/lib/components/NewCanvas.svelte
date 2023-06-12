<script>

import * as THREE from "three";
import * as SC from "svelte-cubed";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { onMount } from "svelte";

const modelURL = 'models/gltf/untitled.glb';
let model = null;

function loadGLTF() {
  const loader = new GLTFLoader();
  return loader.loadAsync(modelURL)
}

onMount(() => {
  loadGLTF().then(_model => model = _model);
})


let rotate = 0;
let sphereRotate = 0;
let positionY = 0;

SC.onFrame(()=>{
    rotate += .01;
    sphereRotate += .003;
})

function animate() {
    rotate += 0.05;
    positionY = -1.4 + Math.abs(Math.sin(performance.now() * 0.0015)) * 1.2;
  
    requestAnimationFrame(animate);
}

// animate();
</script>


<div>
<SC.Canvas
antialias
background={new THREE.Color('black')}
fog={new THREE.FogExp2('black', 0, 20)}
shadows={THREE.PCFShadowMap} >

    <SC.Mesh
    geometry={new THREE.SphereGeometry()}
    material={new THREE.MeshLambertMaterial({
        color: 'skyblue',
        roughness:0.3,
    })}
    scale={[13,13,13]}
    position={[0,0,-20]}
    rotation={[sphereRotate, sphereRotate, sphereRotate]} />

    {#if model}
        <SC.Primitive object={model.scene} scale={[.01,.01,.01]} 
        rotation={[0, rotate, 0]}
        position={[0, positionY, 0]} />
    {/if}

    <SC.PerspectiveCamera  position={[0, 0, 6]} fov={50} near={3} far={500}/>

    <SC.OrbitControls enabled={true} />

    <SC.DirectionalLight color={new THREE.Color(0xffffff)} intensity={0.75} position={[0,10,10]} shadow={false} />
    <SC.AmbientLight color={new THREE.Color(0xffffff)}
    intensity={0.09} />
    <SC.PointLight color={new THREE.Color('blue')}  intensity={0.9} position={[2, 3, 4]} distance={0} decay={10}/>
 </SC.Canvas>
</div>