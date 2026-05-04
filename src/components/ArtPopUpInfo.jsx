import {getAltTextFromClaude} from "../ai.js"
import {useEffect, useState} from "react";

/**
 * function converts url link to a base 64 claude-friendly format
 * @param url
 * @returns {Promise<unknown>}
 */
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

/**
 * 2D pop-up window displaying info on painting user has clicked
 * @param selectedArt - art piece user has clicked into
 * @param setSelectedArt - state change for art piece
 * @param altTextCache - alt text that may have already been generated for this painting
 * @param setAltTextCache - state change to store alt text, if it hasn't been stored already
 * @returns {React.JSX.Element} - a 2D pop-up window with: close up painting, exit button, and a button redirecting user
 *                                  to painting on the Harvard Art Website (as per API usage terms)
 * @constructor
 */
export default function ArtPopUpInfo({selectedArt, setSelectedArt, altTextCache, setAltTextCache}) {
    const [altText, setAltText] = useState("") //state storing alt text for images

    useEffect(() => {
        //if the selected painting has alt text that has already been generated
        if (altTextCache[selectedArt.id]) {
            setAltText(altTextCache[selectedArt.id]) //set the alt text to previously generated text
            return
        }

        /**
         * generates alternative text for paintings that do not already have it
         * @returns {Promise<void>}
         */
        async function getAltText() {
            //temp text for alt text
            setAltText("Generating alternative text...")

            try {
                //convert the url to base 64
                const base64Data = await urlToBase64(selectedArt.primaryImageUrl)
                //call claude api to generate alt text
                const generatedAltText = await getAltTextFromClaude(base64Data)
                //set generated alt text to the painting's alt text
                setAltText(generatedAltText)
                //store the generated alt text in the current painting's state
                setAltTextCache(prev => ({
                    ...prev,
                    [selectedArt.id]: generatedAltText
                }))
            } catch (error) {
                //error message if alt text could not be generated
                console.error(error)
                setAltText("Could not generate description")
            }
        }

        //call function to generate alt text
        getAltText()


    }, [selectedArt, altTextCache, setAltTextCache])

    return (
        <div className="pop-up-container"
             role="dialog"
             aria-modal="true"
             aria-labelledby="modal-title"
             style={{zIndex: 10}}
        >
            {/*pop-up window*/}
            <div className="pop-up-window">
                {/*button to close pop-up window - when user clicks button, selected art state goes to null*/}
                <button
                    className="pop-up-button"
                    onClick={() => setSelectedArt(null)}
                    aria-label="Close details"
                >
                    &times; {/*x symbol for the close of button*/}
                </button>
                {/*set img source to the primary url of the selected art, set alt text to the current painting's alt text state*/}
                <img className="pop-up-img" src={selectedArt.primaryImageUrl} alt={altText}/>

                {/*information displayed to the user in the 2D pop-up window*/}
                <div className="pop-up-info-box">
                    <h1>{selectedArt.title}</h1>
                    <h2>{selectedArt.people?.[0]?.name || "Unknown Artist"}</h2>
                    <p><strong>Period: </strong>{selectedArt.period || "Unknown"}</p>
                    <p><strong>Dated: </strong>{selectedArt.dated || "Unknown"}</p>
                </div>

                {/*button that re-directs user to the painting on the Harvard Art Museum website*/}
                <div className="link-to-harvard-website">
                    <a href={selectedArt.url} target="_blank"><p>View on Harvard Art Museum Website</p></a>
                </div>
            </div>
        </div>
    )
}