
"use client"

import { Keyboard } from '@/components/keyboard'
import { Keycap } from '@/components/Keycap'
import { Environment, OrbitControls, PerspectiveCamera} from '@react-three/drei'
import { useControls } from 'leva'
import React, { useContext, useRef, useState, useEffect } from 'react';
import * as THREE from "three"
import gsap from "gsap"
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(useGSAP, ScrollTrigger)

function Scene() {
    const keyboardGroupRef = useRef<THREE.Group>(null)
    const [lightIntensityScaler, setLightIntensityScaler] = useState(0)



    let [scalingFactor, setScalingFactor] = useState(1)



    useGSAP(() => {
        const mm = gsap.matchMedia()
        
        mm.add("(prefers-reduced-motion: no-preference", () => {
            if(!keyboardGroupRef.current) return

            const keyboard = keyboardGroupRef.current

            gsap.to(
                {lightIntensityScaler: 0},
                {lightIntensityScaler: 1,
                    duration: 3.5,
                    delay: .5,
                    ease: "power2.inOut",
                    onUpdate: function(){
                        setLightIntensityScaler(this.targets()[0].lightIntensityScaler)
                    }
                }
            )


            const tl = gsap.timeline({
                ease: "power2.inOut"
            })

            tl.to(keyboard.position, {
                x: 0,
                y: -.5,
                z: .5,
                duration: 2
            }).to(keyboard.rotation, {
                x: 1.4,
                y: 0,
                z: 0,
                duration: 1.8
            }, "<")
            .to(keyboard.position, {
                x: 0,
                y: -0.5,
                z: 1.9,
                duratiom: 2,
                delay: 0.5
            }).to(keyboard.rotation, {
                x: 1.6,
                y: 0.4,
                z: 0,
                duration: 2
            }, "<")
        })
    })

    useEffect(() => {
        const handleResize = () => {
            setScalingFactor(window.innerWidth >= 500 ? 1 : .5)
        }
        

        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener('resize', handleResize)
    })

  return (
    <group>
        <PerspectiveCamera 
            position={[0, 0, 4]}
            fov={50}
            makeDefault
        />
        <group scale={scalingFactor}>
            <group ref={keyboardGroupRef} >
                <Keyboard 
                    scale={9}
                />
            </group>
            <ambientLight 
                intensity={0.1}
                />

            <group>

                <Keycap position={[0, -0.4, 2.6]} floatSeed={0.001} texture={0}/>
                <Keycap position={[-1.4, 0, 2.3]} floatSeed={0.002} texture={1}/>
                <Keycap position={[-1.8, 1, 1.5]} floatSeed={0.003} texture={2}/>
                <Keycap position={[0, 1, 1]} floatSeed={0.004} texture={3}/>
                <Keycap position={[0.7, .9, 1.4]} floatSeed={0.005} texture={4}/>
                <Keycap position={[1.3, -.3, 2.3]} floatSeed={0.006} texture={5}/>
                <Keycap position={[-.7, .6, 2]} floatSeed={0.007} texture={6}/>
                <Keycap position={[-.77, .1, 2.8]} floatSeed={0.008} texture={7}/>
                <Keycap position={[2, 0, 1]} floatSeed={0.009} texture={8}/>

            </group>
        </group>

        <Environment
            environmentIntensity={.05 * lightIntensityScaler}
            files={["/hdr/blue-studio.hdr"]}
        />
        <spotLight 
            position={[-2, 1.5, 3]}
            intensity={30 * lightIntensityScaler}
            castShadow
            shadow-bias={-0.0002}
            shadow-normalBias={.002}
            shadow-mapSize={1024}
        />
    </group>
  )
}

export default Scene
