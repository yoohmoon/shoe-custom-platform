import { writable, get } from "svelte/store";
import * as THREE from "three";
import { loadTexture } from "$lib/utility/threeFunctions";

const initialState = {
  clickedMesh: null,
  appliedOptions: {},
};

export const createState = () => {
  const state = writable(initialState);

  //handleMaterialChange 내부에서만 쓰이는 함수이기에 return(exposure)해줄 필요 없음
  const handleMeshExistence = () => {
    if (get(state).clickedMesh && get(state).clickedMesh.material) {
      return true;
    } else {
      alert("먼저 영역을 선택해주세요");
      return false;
    }
  };

  const handleColorChange = (colorValue) => {
    if (handleMeshExistence()) {
      get(state).clickedMesh.material.color.set(colorValue.value);

      let meshOptions =
        get(state).appliedOptions[get(state).clickedMesh.userData.name] || {};
      // meshOptions.color = colorValue.name;
      meshOptions = { ...meshOptions, color: colorValue.name };
      get(state).appliedOptions[get(state).clickedMesh.userData.name] =
        meshOptions;
    }
  };

  const handleMaterialChange = (material) => {
    if (handleMeshExistence()) {
      const baseTexture = loadTexture(material.urls.base);
      const RTexture = loadTexture(material.urls.rough);
      const NTexture = loadTexture(material.urls.normal);
      const DTexture = loadTexture(material.urls.displace);
      const ATexture = loadTexture(material.urls.ao);

      let currentColor = get(state).clickedMesh.material.color.clone();

      get(state).clickedMesh.material = new THREE.MeshPhysicalMaterial({
        map: baseTexture,
        normalMap: NTexture,
        roughnessMap: RTexture,
        displacementMap: DTexture,
        displacementScale: 0.0009,
        roughness: 0.3,
        aoMap: ATexture,
      });

      get(state).clickedMesh.material.color.set(currentColor);

      let meshOptions =
        get(state).appliedOptions[get(state).clickedMesh.userData.name] || {};
      meshOptions = { ...meshOptions, material: material.name };
      get(state).appliedOptions[get(state).clickedMesh.userData.name] =
        meshOptions;
    }
  };

  return {
    handleColorChange,
    handleMaterialChange,
    set: state.set,
    update: state.update,
    subscribe: state.subscribe,
  };
};
