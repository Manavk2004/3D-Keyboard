import * as THREE from "three";
import { Float, useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

type KeycapProps = {
    position?: [number, number, number];
    rotation?: [number, number, number];
    floatSeed?: number
}

type GLTFResult = GLTF & {
  nodes: {
    Keycap: THREE.Mesh;
  };
  materials: Record<string, unknown>;
};

export function Keycap({ position=[0,0,0], rotation=[0,0,0], floatSeed=0 }: KeycapProps) {

    const group = useRef<THREE.Group>(null!)

    useFrame(() => {
        if(group.current){
            group.current.rotation.x += floatSeed
            group.current.rotation.y += floatSeed
        }
    })

  const { nodes } = useGLTF("/keycap.gltf") as unknown as GLTFResult;

  const placeholderMat = new THREE.MeshStandardMaterial({
    color: "#cccccc",
    roughness: 0.2,
  });

  return (
    <Float rotationIntensity={1} floatIntensity={1}>
        <group ref={group} dispose={null} position={position} rotation={rotation}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Keycap.geometry}
                material={placeholderMat}
                rotation={[Math.PI / 2, 0, 0]}
                scale={10}
            />
        </group>
    </Float>
  );
}
