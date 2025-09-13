
"use client"

import { Keyboard } from '@/components/keyboard'
import { Keycap } from '@/components/Keycap'
import { Environment, OrbitControls, PerspectiveCamera} from '@react-three/drei'
import { useControls } from 'leva'
import React, { useContext } from 'react'

function Scene() {
    const {positionX, positionY, positionZ, rotationX, rotationY, rotationZ} = useControls({
        positionX: 0, 
        positionY: -.5, 
        positionZ: 3,
        rotationX: 0, 
        rotationY: -.5,
        rotationZ: 3
    })

  return (
    <group>
        <PerspectiveCamera 
            position={[0, 0, 4]}
            fov={50}
            makeDefault
        />
        <Keyboard 
            scale={9}
            position={[0.23, -0.5, 1.8]}
            rotation={[1.60, 0.40, 0]}
        />
        <ambientLight 
            intensity={0.2}
        />

        <group>

            <Keycap position={[0, -0.4, 2.6]} floatSeed={0.001}/>
            <Keycap position={[-1.4, 0, 2.3]} floatSeed={0.002}/>
            <Keycap position={[-1.8, 1, 1.5]} floatSeed={0.003}/>
            <Keycap position={[0, 1, 1]} floatSeed={0.004}/>
            <Keycap position={[0.7, .9, 1.4]} floatSeed={0.005}/>
            <Keycap position={[1.3, -.3, 2.3]} floatSeed={0.006}/>
            <Keycap position={[-.7, .6, 2]} floatSeed={0.007}/>
            <Keycap position={[-.77, .1, 2.8]} floatSeed={0.008}/>
            <Keycap position={[2, 0, 1]} floatSeed={0.009}/>

        </group>

        <Environment
            environmentIntensity={.05}
            files={["/hdr/blue-studio.hdr"]}
        />
        <spotLight 
            position={[-2, 1.5, 3]}
            intensity={30}
            castShadow
            shadow-bias={-0.0002}
            shadow-normalBias={.002}
            shadow-mapSize={1024}
        />
    </group>
  )
}

export default Scene
