import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

function Scene(){
    const mountRef = useRef<HTMLDivElement>(null);

        useEffect(() => {
            if(!mountRef.current) return;

            const currentMount = mountRef.current; //checking assignment

            const scene = new THREE.Scene(); //scene start
            scene.background = new THREE.Color(0xd4c8bb); //bg color

            const camera = new THREE.PerspectiveCamera( //camera setup
                75,
                window.innerWidth / window.innerHeight,
                0.1,
                1000
            ); 
            camera.position.set(0, 10, 20);
            camera.lookAt(0, 5, 0);

            const renderer = new THREE.WebGLRenderer();
            renderer.setSize(window.innerWidth, window.innerHeight);
            mountRef.current.appendChild(renderer.domElement);// attached renderer to DOM


            //orbital controls
            const controls = new OrbitControls(camera, renderer.domElement);
            controls.target.set(0, 2, 0); 
            controls.enableDamping = true;
            controls.dampingFactor = 0.05;
            controls.maxPolarAngle = Math.PI / 2; // Limit vertical rotation
            controls.minDistance = 5;
            controls.maxDistance = 20;
            // Test cube
            
            const geometry = new THREE.BoxGeometry(2, 2, 2);
            const material = new THREE.MeshBasicMaterial({ color: 0x6b4ba6 });
            const cube = new THREE.Mesh(geometry, material);
            cube.position.set(0, 2, 0);
            scene.add(cube);

            
            function animate() { //For camera orbit
                requestAnimationFrame(animate);
                controls.update();
                renderer.render(scene, camera);
            }
            animate();

            const handleResize = () => { //resize handler
                renderer.setSize(window.innerWidth, window.innerHeight);
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
            };

            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);
                mountRef.current?.removeChild(renderer.domElement);
                controls.dispose();
                renderer.dispose();

            };
            

        }, []);

        return <div ref={mountRef} style={{ width: '100%', height: '100vh' }} />;
    }
    export default Scene;