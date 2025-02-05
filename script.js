import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const lighterColor = '#969696';

const camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ alpha: true }); // Enable alpha for transparency
renderer.setSize(150, 150);

const sceneContainer = document.createElement('div');
sceneContainer.classList.add('scene-container');
document.querySelector('.scene').appendChild(sceneContainer);
sceneContainer.appendChild(renderer.domElement);

// Create a low-poly donut using TorusGeometry
const geometry = new THREE.TorusGeometry(0.3, 0.2, 16, 16); // Low-poly by reducing segments
const material = new THREE.MeshNormalMaterial({ transparent: true, opacity: 1 });

const object = new THREE.Group();

// Create the donut mesh and add it to the object
const donut = new THREE.Mesh(geometry, material);
object.add(donut);
scene.add(object);

// Add some lighting
const light = new THREE.AmbientLight(0xffffff, 1.5);
scene.add(light);

const dirLight = new THREE.DirectionalLight(0xffffff, 3);
dirLight.position.set(5, 10, 7.5);
dirLight.castShadow = true;
scene.add(dirLight);

// Set camera position
camera.position.z = 5;

const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
    controls.minDistance = 4;
    controls.maxDistance = 20;

    // Rotate the object to match animation style from the first script
    object.rotation.x += 0.001;
    object.rotation.y += 0.01;

    controls.update();

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();
