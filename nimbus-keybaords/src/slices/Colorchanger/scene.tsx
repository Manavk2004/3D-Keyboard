import { Keyboard } from "@/components/keyboard";
import { Stage } from "@react-three/drei";


type SceneProps = {
    selectedTextureId: string;
    onAnimationComplete: () => void;
}


export function Scene({ selectedTextureId, onAnimationComplete}: SceneProps){
    return(
        <Stage environment={"city"} intensity={0.01}>
            <group>
                <Keyboard />
            </group>
        </Stage>
    )
}