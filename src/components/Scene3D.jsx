import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';

const RotatingBox = ({ position, color }) => {
    const meshRef = useRef();

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
            meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.5;
        }
    });

    return (
        <mesh ref={meshRef} position={position}>
            <dodecahedronGeometry args={[1.5, 0]} />
            <meshStandardMaterial color={color} wireframe />
        </mesh>
    );
};

const Scene3D = () => {
    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, pointerEvents: 'none' }}>
            <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
                <ambientLight intensity={0.3} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#D4AF37" />
                <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
                <RotatingBox position={[5, 3, -5]} color="#7000FF" />
                <RotatingBox position={[-6, -2, -8]} color="#D4AF37" />
            </Canvas>
        </div>
    );
};

export default Scene3D;
