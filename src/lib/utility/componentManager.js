import { gsap } from "gsap";
import { meshPositions } from "../meshPositions";
import { get } from "svelte/store";

const originalMaterials = new Map();

export const handleComponentClick = (componentName, model, camera, state) => {
  const currentState = get(state);
  const prevMesh = currentState.clickedMesh;

  if (prevMesh && originalMaterials.has(prevMesh)) {
    prevMesh.material = originalMaterials.get(prevMesh);
  }

  state.update((currentState) => ({
    ...currentState,
    selectedComponent: componentName,
  }));

  model.traverse((node) => {
    if (node.isMesh && node.userData.name === componentName) {
      state.update((currentState) => ({ ...currentState, clickedMesh: node }));

      originalMaterials.set(node, node.material);
      const highlightMaterial = node.material.clone();
      highlightMaterial.emissive.set(0xffff00);
      highlightMaterial.transparent = true;
      highlightMaterial.opacity = 0.7;
      node.material = highlightMaterial;

      setTimeout(() => {
        if (originalMaterials.has(node)) {
          node.material = originalMaterials.get(node);
        }
      }, 2000);
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
