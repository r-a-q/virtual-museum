import {useFrame, useThree} from '@react-three/fiber'
import {useKeyboardControls} from "@react-three/drei";

/**
 * functionality for the first-person perspective of walking through the museum
 * @returns {null}
 * @constructor
 */
export default function Player() {
    const {camera} = useThree()
    const [, getKeys] = useKeyboardControls()

    useFrame(() => {
        //keys for the movements we want to take within the museum - forward, backward, left, and right
        const {forward, backward, left, right} = getKeys()

        //speed at which we want to change our movements - speed we want to go
        const speed = 0.03

        //for forward and backward - change our z position
        if (forward)
            camera.translateZ(-speed)
        if (backward)
            camera.translateZ(speed)
        //for left and right - change our x position
        if (left)
            camera.translateX(-speed)
        if (right)
            camera.translateX(speed)

        //keep user perspective in the center
        camera.position.y = 0
    })

    return null
}