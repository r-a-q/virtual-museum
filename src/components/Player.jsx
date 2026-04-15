import { useFrame, useThree } from '@react-three/fiber'
import { useKeyboardControls } from "@react-three/drei";

export default function Player() {
    const { camera } = useThree()
    const [, getKeys ] = useKeyboardControls()

    useFrame(() => {
        const { forward, backward, left, right } = getKeys()

        const speed = 0.1

        if (forward)
            camera.translateZ(-speed)
        if (backward)
            camera.translateZ(speed)
        if (left)
            camera.translateX(-speed)
        if (right)
            camera.translateX(speed)

        camera.position.y = 0
    })

    return null
}