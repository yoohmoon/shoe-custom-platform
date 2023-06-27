import { gsap } from "gsap";
import { meshPositions } from "../meshPositions";
import { get } from "svelte/store";
import { appliedOptions } from "$lib/stores/store";

const originalMaterials = new Map();

export const handleComponentClick = (componentName, model, camera, state) => {
  const currentState = get(state);

  if (
    currentState.clickedMesh &&
    originalMaterials.has(currentState.clickedMesh.userData.name)
  ) {
    currentState.clickedMesh.material.emissive.set(0x000000);
  }

  state.update((currentState) => ({
    ...currentState,
    selectedComponent: componentName,
  }));

  model.traverse((node) => {
    if (node.isMesh && node.userData.name === componentName) {
      state.update((currentState) => ({ ...currentState, clickedMesh: node }));

      if (!originalMaterials.has(node.userData.name)) {
        originalMaterials.set(node.userData.name, node.material);
      }

      // Highlight node
      node.material.emissive.set(0xffffff);

      setTimeout(() => {
        node.material.emissive.set(0x000000);
      }, 700);

      appliedOptions.update((optionsMap) => {
        if (optionsMap.has(node.userData.name)) {
          const options = optionsMap.get(node.userData.name);
          if (options.color) state.handleColorChange({ value: options.color });
          if (options.material) state.handleMaterialChange(options.material);
        }
        return optionsMap;
      });
    }
  });

  if (meshPositions[componentName]) {
    const componentPos = meshPositions[componentName].position;
    const componentRot = meshPositions[componentName].rotation;
    gsap.to(camera.position, {
      duration: 1,
      ...componentPos,
      ease: "power2.inOut",
    });

    if (componentRot) {
      gsap.to(camera.rotation, {
        duration: 1,
        ...componentRot,
        ease: "power2.inOut",
        onUpdate: () => (camera.rotation.order = componentRot.order),
      });
    }
  }
};
