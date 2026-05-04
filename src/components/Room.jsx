import {useTexture} from '@react-three/drei'
import * as THREE from 'three'

/**
 * walls, roof, and ceiling of the virtual museum
 * @returns {React.JSX.Element} - walls, roof, and ceiling of the virtual museum
 * @constructor
 */
export default function Room() {

    //map texture of the walls to jpg image
    const wall = useTexture("/navy_wall.jpg")
    return (
        <>
            {/*set position of the room in space*/}
            <mesh position={[0, 1.5, 0]}>
                {/*set the dimensions of the room*/}
                <boxGeometry args={[10, 7, 20]}/>
                {/*set the walls and ceiling texture*/}
                <meshStandardMaterial map={wall} side={THREE.BackSide}/>
            </mesh>
        </>
    )
}