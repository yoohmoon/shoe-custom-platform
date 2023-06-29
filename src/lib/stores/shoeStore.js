import { writable, get } from "svelte/store";
import * as THREE from "three";
import { loadTexture } from "$lib/utility/threeFunctions";
import { appliedOptions } from "$lib/stores/store";

const initialState = {
  clickedMesh: null,
  selectedComponent: null,
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
        get(appliedOptions)[get(state).clickedMesh.userData.name] || {};

      meshOptions = { ...meshOptions, color: colorValue.value };
      get(appliedOptions)[get(state).clickedMesh.userData.name] = meshOptions;

      appliedOptions.update((optionsMap) => {
        optionsMap.set(get(state).clickedMesh.userData.name, meshOptions);
        return optionsMap;
      });
    }
  };

  const handleMaterialChange = (material) => {
    if (handleMeshExistence()) {
      if (
        material &&
        material.urls &&
        material.urls.base &&
        material.urls.rough &&
        material.urls.normal &&
        material.urls.displace &&
        material.urls.ao
      ) {
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
          roughness: 0.1,
          aoMap: ATexture,
        });

        get(state).clickedMesh.material.color.set(currentColor);

        let meshOptions =
          get(appliedOptions)[get(state).clickedMesh.userData.name] || {};
        meshOptions = { ...meshOptions, material: material.name };
        get(appliedOptions)[get(state).clickedMesh.userData.name] = meshOptions;

        appliedOptions.update((optionsMap) => {
          optionsMap.set(get(state).clickedMesh.userData.name, meshOptions);
          return optionsMap;
        });
      } else {
        console.error("The material object or its urls property is undefined");
      }
    }
  };

  const selectComponent = (componentName) => {
    state.update((currentState) => {
      currentState.selectedComponent = componentName;
      return currentState;
    });
  };

  const clickMesh = () => {
    state.update((currentState) => {
      currentState.clickedMesh = meshNode;
      return currentState;
    });
  };

  return {
    selectComponent,
    clickMesh,
    handleColorChange,
    handleMaterialChange,
    set: state.set,
    update: state.update,
    subscribe: state.subscribe,
  };
};
