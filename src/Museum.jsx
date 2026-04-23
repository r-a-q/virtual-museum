import { Canvas } from '@react-three/fiber'
import {
    Environment,
    PointerLockControls,
    KeyboardControls
} from '@react-three/drei'
import DirectionalLightWithHelper from './components/DirectionalLightWithHelper.jsx'
import Room from './components/Room.jsx'
import { Suspense, useState, useEffect } from 'react';
import Frame from "./components/Frame.jsx"
import Player from './components/Player.jsx'
import './Museum.css'
import CleanHarvardData from "./components/CleanHarvardData.jsx";
import ArtPopUpInfo from './components/ArtPopUpInfo.jsx'

const map = [
    { name: "forward", keys: ["ArrowUp", "w", "W"]},
    { name: "backward", keys: ["ArrowDown", "s", "S"]},
    { name: "left", keys: ["ArrowLeft", "a", "A"]},
    { name: "right", keys: ["ArrowRight", "d", "D"]},
]



export default function Museum() {

    const [painting, setPainting] = useState([])
    const [selectedArt, setSelectedArt] = useState(null)
    const [altTextCache, setAltTextCache] = useState({})

    const getApiData = (data) => {
        setPainting(data)
    }


    useEffect(() => {

        if (selectedArt && document.pointerLockElement) {
            document.exitPointerLock()
        }

        const handleKeyDown = (e) => {
            if (e.key === "Escape" && selectedArt) {
                setSelectedArt(null)
            }
        }

        const handlePointerLockChange = () => {
            if (!document.pointerLockElement && selectedArt) {
                selectedArt(null)
            }
        }

        document.addEventListener("pointerlockchange", handlePointerLockChange)
        document.addEventListener("keydown", handleKeyDown)

        return () => {
            document.removeEventListener("keydown", handleKeyDown)
            document.removeEventListener("pointerlockchange", handlePointerLockChange)}
    }, [selectedArt])


    return (
        <KeyboardControls map={map}>
        <div id="canvas-container">
            <Canvas camera={{ position: [0, 1, 6], fov: 50 }} aria-label="3D Virtual Art Gallery">

                <axesHelper args={[10]}/>

                <Suspense fallback={null}>
                    <PointerLockControls enabled={!selectedArt}/>

                    <CleanHarvardData getApiData={getApiData}/>
                    <Player />
                    <Room />
                    <group>
                        {painting.length > 0 && painting.map((element, index) => {

                            const onOppositeWall = index % 2  === 0 ? 4.75 : -4.75
                            const zPosition = Math.floor(index / 2)

                            return (
                                <Frame
                                    key={element.key}
                                    paintingURL={element.primaryImageUrl}
                                    position={[onOppositeWall, 0, (zPosition * 6) - 6]}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setSelectedArt(element)}}
                                />
                            )
                            }
                        )}
                    </group>

                </Suspense>

                <Environment preset="sunset"/>

                <ambientLight intensity={2} />
                <DirectionalLightWithHelper />
                <gridHelper args={[20, 20]}/>

            </Canvas>

            {selectedArt && <ArtPopUpInfo
                selectedArt={selectedArt}
                altTextCache={altTextCache}
                setAltTextCache={setAltTextCache}
            />}

            {/*Crosshair*/}
            <div className="crosshair" style={{zIndex: 2}}/>

        </div>
        </KeyboardControls>
    )
}