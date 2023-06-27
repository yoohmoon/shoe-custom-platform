import * as THREE from "three";

const alertSelectMesh = () => {
  alert("신발 내 영역을 선택해주세요.");
  return "신발 내 영역을 선택해주세요.";
};

export function onMouseClick(event, raycaster, camera, model, state) {
  const mouse = new THREE.Vector2();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObject(model, true);

  if (intersects.length > 0) {
    state.clickedMesh = intersects[0].object;

    if (state.clickedMesh.userData && state.clickedMesh.userData.name) {
      document.body.style.cursor = "pointer";
    } else {
      console.log("이름이 없는 속성입니다.");
      state.clickedMesh = null;
    }
  }
}

/* 
function onMouseClick(event) {
  // 마우스의 좌표 저장할 Vector2 객체 생성
  const mouse = new THREE.Vector2();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  // 광선 상에 3d 모델과 교차한 객체 유무 확인 후, 결과를 배열에 저장
  const intersects = raycaster.intersectObject(model, true);
  // console.log("model? ", model)

  // 교차한 객체가 있을 경우
  if (intersects.length > 0) {
    // 카메라와 가장 가까운 교차 객체를 변수에 저장
    $state.clickedMesh = intersects[0].object;

    // userData 객체에 name 속성이 있는지 여부 확인
    if ($state.clickedMesh.userData && $state.clickedMesh.userData.name) {
      renderer.domElement.style.cursor = "pointer";
    } else {
      console.log("이름이 없는 속성입니다.");
      $state.clickedMesh = null;
    }
  }
  // else{
  //    // 교차한 객체가 없는 경우 alertSelectMesh() 함수를 호출
  //   alertSelectMesh()
  // }
}
 */
