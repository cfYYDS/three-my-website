import './style.css'; // Import style file

import * as THREE from 'three'; // Import Three.js library
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'; // Import OrbitControls controller

// Setup 3D scene
const scene = new THREE.Scene();

// Create perspective camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Create WebGL renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'), // Output rendering result to canvas element with id "bg"
});

// Set renderer pixel ratio
renderer.setPixelRatio(window.devicePixelRatio);

// Set renderer size
renderer.setSize(window.innerWidth, window.innerHeight);

// Set camera position
camera.position.setZ(30);
camera.position.setX(-3);

// Render scene and camera on renderer
renderer.render(scene, camera);

// Create torus geometry
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
// Create standard material
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
// Create torus mesh
const torus = new THREE.Mesh(geometry, material);
// Add torus mesh to scene
scene.add(torus);

// Create point light
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

// Create ambient light
const ambientLight = new THREE.AmbientLight(0xffffff);
// Add lights to scene
scene.add(pointLight, ambientLight);

// Create stars
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

// Add multiple stars
Array(200).fill().forEach(addStar);

// Load space background texture
const spaceTexture = new THREE.TextureLoader().load('space.jpg');
// Set scene background
scene.background = spaceTexture;

// Load avatar texture
const jeffTexture = new THREE.TextureLoader().load('jeff.png');
// Create avatar mesh
const jeff = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: jeffTexture }));
// Add avatar mesh to scene
scene.add(jeff);

// Load moon texture and normal map
const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');
// Create moon mesh
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);
// Add moon mesh to scene
scene.add(moon);

// Set moon and avatar positions
moon.position.z = 30;
moon.position.setX(-10);

jeff.position.z = -5;
jeff.position.x = 2;

// Implement camera movement on scroll
function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  jeff.rotation.y += 0.01;
  jeff.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Implement animation loop
function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  moon.rotation.x += 0.005;

  renderer.render(scene, camera);
}

animate();
