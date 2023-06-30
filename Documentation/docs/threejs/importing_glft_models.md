---
sidebar_position: 2
---

# importing GLFT models

In the previous tutorial we learned how to setup a basic three.js project and how to create a scene with a single cube. Now we will be adding a model to the scene. We will be using the gltf format for the model. The gltf format is a binary format for 3D models that is supported by most 3D software. The model we will be using is 3D scan of a operating room. The model can be downloaded from [here](https://sketchfab.com/3d-models/charite-university-hospital-operating-room-9ec46c4d615a4581a235eebfb162f574). We will also be importing a custom model made in Blender.

## downloading the model from sketchfab
First we find the model we want to download. In this case we will be using the operating room model. We can download the model by clicking on the download button.
after clicking on the download button we will be presented with a list of formats that the model can be downloaded in. We will be using the gltf format.

In the future the library will support more formats but for now we will be using the gltf format.

![sketchfab](../img/sketchfab_download_model.png)

## importing the model into the project

Now that we have downloaded the model we can import it into the project. We will be using the [GLTFLoader](https://threejs.org/docs/#examples/en/loaders/GLTFLoader) to load the model into the scene. The GLTFLoader is a three.js library that allows us to load gltf models into the scene. We will also be using the [OrbitControls](https://threejs.org/docs/#examples/en/controls/OrbitControls) to control the camera. The OrbitControls is a three.js library that allows us to control the camera using the mouse.

```javascript
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

//create scene
const scene = new THREE.Scene();

//create camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

//create renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//create controls
const controls = new OrbitControls(camera, renderer.domElement);

//create light
const light = new THREE.AmbientLight(0xffffff);
scene.add(light);

//create model
const loader = new GLTFLoader();
loader.load(
    // resource URL
    'models/operating_room/scene.gltf',
    // called when the resource is loaded
    function (gltf) {
        scene.add(gltf.scene);
    },
    // called while loading is progressing
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    // called when loading has errors
    function (error) {
        console.log('An error happened');
    }
);

//create camera position
camera.position.z = 5;

//render scene
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
```
