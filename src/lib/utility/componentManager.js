import { gsap } from "gsap";
import { meshPositions } from "../meshPositions";

export const handleComponentClick = (componentName, model, camera, state) => {
  state.update((currentState) => ({
    ...currentState,
    selectedComponent: componentName,
  }));

  model.traverse((node) => {
    if (node.isMesh && node.userData.name === componentName) {
      state.update((currentState) => ({ ...currentState, clickedMesh: node }));
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
