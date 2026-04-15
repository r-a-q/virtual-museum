import { useRef } from 'react'
import { useHelper } from '@react-three/drei'
import { DirectionalLightHelper, CameraHelper } from 'three'

export default function DirectionalLightWithHelper() {
    const light = useRef()
    useHelper(light, DirectionalLightHelper, 2, "crimson")
    //new arg specifies the size of the helper

    const shadow = useRef()
    useHelper(shadow, CameraHelper)

    return (
        <directionalLight
            ref={light}
            position={[-5, 8, 0]}
            castShadow
        >
            <orthographicCamera
                attach="shadow-camera"
                ref={shadow}
                args={[-2, 2, 2, -2]}
            />
        </directionalLight>
    )
}