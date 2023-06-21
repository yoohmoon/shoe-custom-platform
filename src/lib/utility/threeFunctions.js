import * as THREE from "three";

// textures
export const loadTexture = (url) => {
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load(url);
  texture.magFilter = THREE.NearestFilter;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;

  return texture;
};
