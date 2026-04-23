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
import {getAltTextFromClaude} from "./ai.js"
import CleanHarvardData from "./components/CleanHarvardData.jsx";

const map = [
    { name: "forward", keys: ["ArrowUp", "w", "W"]},
    { name: "backward", keys: ["ArrowDown", "s", "S"]},
    { name: "left", keys: ["ArrowLeft", "a", "A"]},
    { name: "right", keys: ["ArrowRight", "d", "D"]},
]

async function urlToBase64(url) {
    const response = await fetch(url)
    const blob = await response.blob()
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result.split(',')[1])
        reader.onerror = reject
        reader.readAsDataURL(blob)
    })
}

export default function Museum() {

    const [painting, setPainting] = useState([])
    const [altText, setAltText] = useState("")
    const [selectedArt, setSelectedArt] = useState(null)
    const [altTextCache, setAltTextCache] = useState({})

    const getApiData = (data) => {
        setPainting(data)
    }


    useEffect(() => {
        if(selectedArt) {

            if (altTextCache[selectedArt.id]) {
                setAltText(altTextCache[selectedArt.id])
                return
            }
            async function getAltText() {

                setAltText("Generating alternative text...")

                try {
                    const base64Data = await urlToBase64(selectedArt.primaryImageUrl)
                    const generatedAltText = await getAltTextFromClaude(base64Data)
                    setAltText(generatedAltText)
                    setAltTextCache(prev => ({
                        ...prev,
                        [selectedArt.id]: generatedAltText
                    }))
                }
                catch (error) {
                    console.error(error)
                    setAltText("Could not generate description")
                }
            }

            getAltText()

        }
    }, [selectedArt, altTextCache])



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

            {/*2D Pop-up*/}
            {selectedArt && (
                <div className="pop-up-container"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-title"
                    style={{ zIndex: 10}}
                >
                    <p className="pop-up-exit-instructions">Press esc to exit pop-up view</p>
                    <div className="pop-up-window">
                        <img className="pop-up-img" src={selectedArt.primaryImageUrl} alt={`Close up of ${selectedArt.title}`}/>
                        
                        <div className="pop-up-info-box">
                            <h1>{selectedArt.title}</h1>
                            <h2>{selectedArt.people?.[0]?.name || "Unknown Artist"}</h2>
                            <p><strong>Period: </strong>{selectedArt.period || "Unknown"}</p>
                            <p><strong>Dated: </strong>{selectedArt.dated || "Unknown"}</p>
                            <p aria-live="polite" aria-atomic="true"><strong>Alt Text:</strong> {altText}</p>
                        </div>
                        <div className="link-to-harvard-website">
                            <a href={selectedArt.url} target="_blank"><p>Link back to painting on the Harvard Art Museum Website</p></a>
                        </div>
                    </div>
                </div>
            )}

            {/*Crosshair*/}
            <div className="crosshair" style={{zIndex: 2}}/>

        </div>
        </KeyboardControls>
    )
}