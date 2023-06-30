

import { Vector3, BoxGeometry, MeshBasicMaterial, Mesh, Group, Euler } from '../../../node_modules/three/build/three.module.js';
import { PointerLockControls } from "../three/PointerLockControls.js";

import { serverCommunication } from '../multiplayer/server_communication.js';


let controls;
let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let canJump = false;

let zoom_scale = 0.1;

const _velocity = new Vector3();
const _direction = new Vector3();
const _vector = new Vector3();
const _euler = new Euler( 0, 0, 0, 'YXZ' );
const user = new Group();
const character_body_model = new Mesh();
const character_head_model = new Mesh();


const proces_update_from_server = function (data) {
	//console.log(data);
}
let multiplayer = new serverCommunication(proces_update_from_server, user);
let last_multiplayer_update = 0;
const now = new Date();

//based on https://threejs.org/examples/misc_controls_pointerlock.html
class VRcontrols {
	constructor(camera,scene) {



		let cube = new Mesh(new BoxGeometry(1,1,1), new MeshBasicMaterial({color: 0x00ff00}));
		
		//this.user.add(cube);

		camera.position.set(0,1.6,0);
		user.add(camera);
		scene.add(user);

		//attempt to automatically create a blocker and instructions
		//this.html_elements = '<div id="blocker" style="display: block;">'
		//	+ '<div id="instructions"  class="label" style="width: 100%; height: 100%;">'
		//	+ '<p style="font-size:36px">Click to play</p><p>Move: WASD<br>Look: MOUSE</p></div></div>';
		//let html = document.body.innerHTML;
		//document.body.innerHTML += this.html_elements;

		controls = new PointerLockControls( camera, document.body );

		const instructions = document.getElementById( 'instructions' );
		const blocker = document.getElementById( 'blocker' );
		instructions.style.display = '';

		instructions.addEventListener( 'click', function () {
			controls.lock();
		} );

		controls.addEventListener( 'lock', function () {
			instructions.style.display = 'none';
			blocker.style.display = 'none';
		} );

		controls.addEventListener( 'unlock', function () {
			instructions.style.display = '';
			blocker.style.display = '';
		} );

		controls.addEventListener( 'change', function () {
			_euler.setFromQuaternion( camera.quaternion );
			//user.rotation.y = _euler.y;
		} );

		this.prevTime = performance.now();

		document.addEventListener( 'keydown', onKeyDown );
		document.addEventListener( 'keyup', onKeyUp );

		this.zoom = function (event) {
			event.preventDefault();
		  
			zoom_scale += event.deltaY * -0.001;
		  
			// Restrict scale
			zoom_scale = Math.min(Math.max(0.1, zoom_scale), 1);
		  
			// Apply scale transform
			camera.setFocalLength(75.0 * zoom_scale);
		}

		document.addEventListener('wheel', this.zoom, { passive: false })

		this.setPosition = function (x,y,z) {
			user.position.set(x,y,z);
		}


		this.update = function () {
			const time = performance.now();

			if (new Date() - now > multiplayer.client_tick_rate * multiplayer.client_tick){
				server_tick++;
				//console.log("Server tick: " + server_tick);
			}

			if ( controls.isLocked === true ) {

				
				const delta = ( time - this.prevTime ) / 1000;

				_velocity.x -= _velocity.x * 10.0 * delta;
				_velocity.z -= _velocity.z * 10.0 * delta;

				//velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

				_direction.z = Number( moveForward ) - Number( moveBackward );
				_direction.x = Number( moveRight ) - Number( moveLeft );
				_direction.normalize(); // this ensures consistent movements in all directions

				if ( moveForward || moveBackward ) _velocity.z -= _direction.z * 40.0 * delta;
				if ( moveLeft || moveRight ) _velocity.x -= _direction.x * 40.0 * delta;

				//usaly we would move the camera directly, 
				//but we are moving the user group witch also moves the camera
				//this is done so the camera can move freely in the VR playspace.
				this.moveRight( - _velocity.x * delta );
				this.moveForward( - _velocity.z * delta );
			}

			if (new Date() - last_multiplayer_update > 1000) {
				multiplayer.sendUpdate(user.position.x, user.position.y, user.position.z, 0.0, user.rotation.y, 0.0, 0.0);
				last_multiplayer_update = new Date();
			}

			this.prevTime = time;
		}

		//moves the camera dolly on the xz-plane
		this.moveForward = function ( distance ) {

			// move forward parallel to the xz-plane
			// assumes camera.up is y-up

			_vector.setFromMatrixColumn( camera.matrix, 0 );

			_vector.crossVectors( camera.up, _vector );

			user.position.addScaledVector( _vector, distance );

		};

		this.moveRight = function ( distance ) {

			_vector.setFromMatrixColumn( camera.matrix, 0 );

			user.position.addScaledVector( _vector, distance );

		};
	}
}

const onKeyDown = function ( event ) {
	//console.log(event.code); // see the key codes
	switch ( event.code ) {

		case 'ArrowUp':
		case 'KeyW':
			moveForward = true;
			break;

		case 'ArrowLeft':
		case 'KeyA':
			moveLeft = true;
			break;

		case 'ArrowDown':
		case 'KeyS':
			moveBackward = true;
			break;

		case 'ArrowRight':
		case 'KeyD':
			moveRight = true;
			break;

	}

};
const onKeyUp = function ( event ) {

	switch ( event.code ) {

		case 'ArrowUp':
		case 'KeyW':
			moveForward = false;
			break;

		case 'ArrowLeft':
		case 'KeyA':
			moveLeft = false;
			break;

		case 'ArrowDown':
		case 'KeyS':
			moveBackward = false;
			break;

		case 'ArrowRight':
		case 'KeyD':
			moveRight = false;
			break;

	}

};



export { VRcontrols };