import { useTexture } from '@react-three/drei'
import * as THREE from 'three'


export default function Room() {

    const wall = useTexture("/navy_wall.jpg")
    return (
        <>
            <mesh position={[0, 1.5, 0]}>
                <boxGeometry args={[10, 7, 20]}/>
                <meshStandardMaterial map={wall} side={THREE.BackSide}/>
            </mesh>
        </>
    )
}