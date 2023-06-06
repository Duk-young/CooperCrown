import React, { useRef, useEffect } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from "three";

const StarsBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        // Set up the scene
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.set(0, 0, 50); // Update camera position to move back

        // Set up the renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        canvasRef.current.appendChild(renderer.domElement);

        // Set up the controls
        const controls = new OrbitControls(camera, renderer.domElement);

        // Create stars
        const starGeometry = new THREE.SphereGeometry(0.1, 32, 32);
        const starMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const stars = [];
        const numStars = 100;

        for (let i = 0; i < numStars; i++) {
            const star = new THREE.Mesh(starGeometry, starMaterial);
            const orbitRadius = Math.random() * 50 + 20; // Adjust the orbit radius range here
            const orbitSpeed = Math.random() * 0.05 + 0.02; // Adjust the speed range here
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(Math.random() * 2 - 1); // Use the inverse cosine function

            const x = orbitRadius * Math.sin(phi) * Math.cos(theta);
            const y = orbitRadius * Math.sin(phi) * Math.sin(theta);
            const z = orbitRadius * Math.cos(phi);

            star.position.set(x, y, z);

            stars.push({ star, orbitRadius, orbitSpeed });
            scene.add(star);
        }



        // Render the scene
        const animate = () => {
            requestAnimationFrame(animate);

            const time = Date.now() * 0.0005; // Time-based factor for smooth animation

            for (const { star, orbitRadius, orbitSpeed } of stars) {
                const angle = orbitSpeed * time; // Calculate the angle based on time
                const x = Math.cos(angle) * orbitRadius; // Calculate the x-coordinate
                const y = Math.tan(angle) * orbitRadius; // Calculate the y-coordinate
                const z = Math.sin(angle) * orbitRadius; // Calculate the z-coordinate

                star.position.set(x, y, z);
            }

            controls.update();
            renderer.render(scene, camera);
        };

        animate();

        // Clean up
        return () => {
            scene.remove(...stars.map(({ star }) => star));
            renderer.dispose();
            controls.dispose();
        };
    }, []);

    return <div ref={canvasRef} style={{ width: "100%", height: "100vh", zIndex: '-2' }} />;
};

export default StarsBackground;
