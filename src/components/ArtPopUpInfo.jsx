import {getAltTextFromClaude} from "../ai.js"
import { useEffect, useState } from "react";

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

export default function ArtPopUpInfo({ selectedArt, setSelectedArt, altTextCache, setAltTextCache }) {
    const [altText, setAltText] = useState("")

    useEffect(() => {
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


    }, [selectedArt, altTextCache, setAltTextCache])

    return (
        <div className="pop-up-container"
             role="dialog"
             aria-modal="true"
             aria-labelledby="modal-title"
             style={{ zIndex: 10}}
        >

            <div className="pop-up-window">
                <button
                    className="pop-up-button"
                    onClick={() => setSelectedArt(null)}
                    aria-label="Close details"
                >
                    &times;
                </button>
                <img className="pop-up-img" src={selectedArt.primaryImageUrl} alt={altText}/>

                <div className="pop-up-info-box">
                    <h1>{selectedArt.title}</h1>
                    <h2>{selectedArt.people?.[0]?.name || "Unknown Artist"}</h2>
                    <p><strong>Period: </strong>{selectedArt.period || "Unknown"}</p>
                    <p><strong>Dated: </strong>{selectedArt.dated || "Unknown"}</p>
                </div>
                <div className="link-to-harvard-website">
                    <a href={selectedArt.url} target="_blank"><p>View on Harvard Art Museum Website</p></a>
                </div>
            </div>
        </div>
    )
}