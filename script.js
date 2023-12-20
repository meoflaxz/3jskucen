import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Sizes
const sizes = {width: 800,height: 600}

// Model
// const loader = new GLTFLoader()
// loader.load('maxwell_dance/maxwell_dance.glb', function(gltf) {
// 	scene.add(gltf.glb)
//     console.log(gltf.blg)
// }, undefined, function ( error ) {

// 	console.error( error )

// } )


const maxwell = new THREE.Object3D()
const loader = new GLTFLoader()
loader.load('maxwell_dance/scene.gltf', function(gltf) {
    maxwell.add(gltf.scene)
    scene.add(maxwell)
    console.log(maxwell)
}) 

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
// scene.add(mesh)


// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
camera.lookAt(maxwell.position)
scene.add(camera)

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 10)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 0.5)
camera.add(pointLight)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)

// Controls
const control = new OrbitControls(camera, canvas)
control.enableDamping = true

// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    maxwell.rotation.y =  - 0.7 * elapsedTime
    // plane.rotation.y = 0.1 * elapsedTime
    // torus.rotation.y = 0.1 * elapsedTime

    // sphere.rotation.x = -0.15 * elapsedTime
    // plane.rotation.x = -0.15 * elapsedTime
    // torus.rotation.x = -0.15 * elapsedTime

    // Update controls
    control.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()