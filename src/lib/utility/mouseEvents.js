import * as THREE from "three";

export function onMouseClick(event, raycaster, camera, model) {
  const mouse = new THREE.Vector2();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObject(model, true);

  if (intersects.length > 0) {
    const clickedMesh = intersects[0].object;

    if (clickedMesh.userData && clickedMesh.userData.name) {
      document.body.style.cursor = "pointer";
      return clickedMesh; // 클릭된 메시 객체 반환
    } else {
      console.log("이름이 없는 속성입니다.");
      return null;
    }
  }

  return null;
}
