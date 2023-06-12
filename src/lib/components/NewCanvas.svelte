<script>

  
/* import * as THREE from 'three';
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { onMount } from "svelte";

import * as SC from "svelte-cubed";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";





let model;

const loader = new GLTFLoader();

onMount(() => {
        loader.load("models/gltf/untitled.glb", (gltf) => {
            console.log(gltf);
            model = gltf.scene.children[0].geometry;
        });
    }); */

/* 
// 공식 문서

loader.load('models/gltf/untitled.glb', function ( gltf ) {

	scene.add( gltf.scene );

}, undefined, function ( error ) {

	console.error( error );

} ); */

import * as THREE from "three";
	import * as SC from "svelte-cubed";
	import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
    // import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
	import { onMount } from "svelte";
    // import lerp from 'lerp'
    
    // const dracoLoader = new DRACOLoader()
    const loader = new GLTFLoader()
    // dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')
    // dracoLoader.setDecoderConfig({ type: 'js' })
    // loader.setDRACOLoader(dracoLoader)

    // let model;
    let spot = new THREE.SpotLight();
    spot.position.set(0, 0, 8)

    let mouse = { x: 0, y: 0 };

    function handleMousemove(event) {
        mouse.x = event.clientX;
        mouse.y = event.clientY;
    }

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
    // positionY =0.5 + Math.abs(Math.sin(time * 3)) * 2;
})

function animate() {
    rotate += 0.01;
    positionY = -1.4 + Math.abs(Math.sin(performance.now() * 0.0025)) * 2;
  
    // 모델에 애니메이션 값 적용

    requestAnimationFrame(animate);
}

// animate();

    
    // onMount(() => {
    //     loader.load("models/gltf/untitled.glb", (gltf) => {
    //         console.log(gltf);
    //         // model = gltf.scene.children[2].geometry;
    //         // model=gltf.scene;
    //         model=gltf

    //         scene.add( model.scene );
    //     });
    // }); 

    // SC.onFrame(() => {
    // // follow mouse with light
    // spot.position.x = lerp((spot.position.x -0.5), mouse.x / 250, 0.1)
    // spot.position.y = lerp((spot.position.y), -mouse.y / 250, 0.1)

    // });

</script>


<div on:mousemove={handleMousemove}>
	<SC.Canvas
        antialias
        background={new THREE.Color('black')}
        fog={new THREE.FogExp2('black', 0, 20)}
        shadows={THREE.PCFShadowMap}
>

<SC.Mesh
geometry={new THREE.SphereGeometry()}
material={new THREE.MeshLambertMaterial({
  color: new THREE.Color('skyblue')
})}
scale={[13,13,13]}
position={[0,0,-20]}
rotation={[sphereRotate, sphereRotate, sphereRotate]}
/>

	{#if model}
         <!-- <SC.Mesh 
            material={new THREE.MeshStandardMaterial({
                color: '#474747',
                roughness: 0.9,
                metalness: 0.5
            })}
            scale={[1,1,1]}
            position={[0, -2.5, 0]}
            rotation={[0, -0.2, 0]}
            castShadow
            receiveShadow
        /> -->
        <SC.Primitive object={model.scene} scale={[.01,.01,.01]} 
        rotation={[0, rotate, 0]}
        position={[0, positionY, 0]}
          />
	{/if}

	<SC.PerspectiveCamera  position={[0, 0, 6]} fov={50} near={3} far={500}/>


    
  <SC.OrbitControls 
  enabled={true}

/>

	<SC.DirectionalLight color={new THREE.Color(0xffffff)} intensity={0.75} position={[0,10,10]} shadow={false} />
    <SC.AmbientLight color={new THREE.Color(0xffffff)}
intensity={0.09} />
	<SC.PointLight color={new THREE.Color('blue')}  intensity={0.9} position={[2, 3, 4]} distance={0} decay={10}/>
<!--     <SC.SpotLight
            intensity={2}
            position={spot.position.toArray()}
            penumbra={2}
            distance={10}
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            /> -->
 </SC.Canvas>
</div>