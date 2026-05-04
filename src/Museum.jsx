import {Canvas} from '@react-three/fiber'
import {
    Environment,
    PointerLockControls,
    KeyboardControls
} from '@react-three/drei'
import DirectionalLightWithHelper from './components/DirectionalLightWithHelper.jsx'
import Room from './components/Room.jsx'
import {Suspense, useState, useEffect} from 'react';
import Frame from "./components/Frame.jsx"
import Player from './components/Player.jsx'
import './Museum.css'
import CleanHarvardData from "./components/CleanHarvardData.jsx";
import ArtPopUpInfo from './components/ArtPopUpInfo.jsx'

const map = [
    {name: "forward", keys: ["ArrowUp", "w", "W"]},
    {name: "backward", keys: ["ArrowDown", "s", "S"]},
    {name: "left", keys: ["ArrowLeft", "a", "A"]},
    {name: "right", keys: ["ArrowRight", "d", "D"]},
]


/**
 * functionality and display of the virtual museum
 * @returns {React.JSX.Element} - a 3D room with 6 randomly generated art pieces
 * @constructor
 */
export default function Museum() {

    const [painting, setPainting] = useState([]) //state holding painting information
    const [selectedArt, setSelectedArt] = useState(null) //state determining if a painting was selected
    const [altTextCache, setAltTextCache] = useState({}) //state holding alt text that has already been generated

    //get api data from claude api
    const getApiData = (data) => {
        setPainting(data)
    }

    useEffect(() => {

        //controls for web controller locks (whether use is in the museum or wants to exit the museum)
        if (selectedArt && document.pointerLockElement) {
            document.exitPointerLock()
        }

        //if visitor presses 'esc' and a painting is selected
        const handleKeyDown = (e) => {
            if (e.key === "Escape" && selectedArt) {
                setSelectedArt(null) //deselect the painting
            }
        }

        document.addEventListener("keydown", handleKeyDown)

        return () => {
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [selectedArt])


    return (
        //allows for the visitor to use keyboard controls
        <KeyboardControls map={map}>
            <div id="canvas-container">
                <Canvas camera={{position: [0, 1, 6], fov: 50}} aria-label="3D Virtual Art Gallery">

                    <axesHelper args={[10]}/>

                    {/*suspense - waiting for objects to render*/}
                    <Suspense fallback={null}>
                        {!selectedArt && <PointerLockControls/>}

                        {/*first get the paintings to be displayed in the virtual museum*/}
                        <CleanHarvardData getApiData={getApiData}/>
                        {/*player controls*/}
                        <Player/>
                        {/*generate the room*/}
                        <Room/>
                        <group>
                            {painting.length > 0 && painting.map((element, index) => {

                                    //display the 6 paintings evenly across from each other - 3 on each side
                                    const onOppositeWall = index % 2 === 0 ? 4.75 : -4.75
                                    const zPosition = Math.floor(index / 2)

                                    return (
                                        //generate the frames with the image, positioning, and click controls
                                        <Frame
                                            key={element.key}
                                            paintingURL={element.primaryImageUrl}
                                            position={[onOppositeWall, 0, (zPosition * 6) - 6]}
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                {/*change the state to the selected art*/
                                                }
                                                setSelectedArt(element)
                                            }}
                                        />
                                    )
                                }
                            )}
                        </group>

                    </Suspense>

                    {/*lighting of the museum*/}
                    <Environment preset="sunset"/>
                    <ambientLight intensity={2}/>
                    <DirectionalLightWithHelper/>

                    {/*grid view*/}
                    <gridHelper args={[20, 20]}/>

                </Canvas>

                {/*if art has been selected, return 2D pop-up window with relevant information*/}
                {selectedArt && <ArtPopUpInfo
                    selectedArt={selectedArt}
                    setSelectedArt={setSelectedArt}
                    altTextCache={altTextCache}
                    setAltTextCache={setAltTextCache}
                />}

                {/*Crosshair*/}
                <div className="crosshair" style={{zIndex: 2}}/>

            </div>
        </KeyboardControls>
    )
}