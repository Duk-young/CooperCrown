import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const MyModel = () => {
    const modelRef = useRef();
    const [modelLoaded, setModelLoaded] = useState(false);

    useFrame(() => {
        if (modelLoaded) {
            modelRef.current.rotation.y += 0.005;
        }
    });

    React.useEffect(() => {
        const loader = new GLTFLoader();

        loader.load('./planet/scene.gltf', (gltf) => {
            const model = gltf.scene;
            modelRef.current.add(model);
            setModelLoaded(true);

            // Apply the scale transformation after the model is loaded
            model.scale.set(2, 2, 2);
        });
    }, []);

    return (
        <>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <group ref={modelRef} />
        </>
    );
};

const Earth = () => {
    return (
        <Canvas
        style={{ background: 'transparent' }}
            camera={{
                fov: 45,
                near: 0.1,
                far: 200,
                position: [-4, 3, 6],
            }}
        >
            <MyModel />
        </Canvas>
    );
};

export default Earth;
