import {useEffect} from "react";

/**
 * calls Harvard Art Museum API and filters/cleans data for virtual museum usage
 * @param getApiData - reference to function in main -> helps with saving painting data in main file
 * @returns {React.JSX.Element} - metadata for all 6 paintings in the virtual museum
 * @constructor
 */
export default function CleanHarvardData({getApiData}) {

    useEffect(() => {
        //fields of data relevant to virtual museum - add to api url call
        const relevantFields = `objectid,dated,classification,period,primaryimageurl,title,people,url`
        //returns only the relevant data we want to extract - add to api url call
        const parameters = `classification=Paintings&hasimage=1&lendingpermissionlevel=0`
        //url we call the api with - return 12 random paintings (12 as a cushion)
        const url = `https://api.harvardartmuseums.org/object?${parameters}&apikey=${import.meta.env.VITE_HARVARD_API_KEY}&fields=${relevantFields}&q=_exists_:primaryimageurl&sort=random&size=12`

        //call the harvard art museum api
        fetch(url)
            .then(res => res.json())
            .then(data => {
                const filteredMetaData = data.records.filter(record => record.primaryimageurl !== null) //only return those who have an image attached
                    .map(artPiece => ({
                        //map all data we get from the api into a readable and clean structure
                        key: artPiece.objectid,
                        id: artPiece.objectid,
                        title: artPiece.title,
                        people: (artPiece.people ? artPiece.people.map(contributor => ({
                            name: contributor.name,
                            role: contributor.role
                        })) : []),
                        dated: artPiece.dated,
                        period: artPiece.period,
                        primaryImageUrl: artPiece.primaryimageurl,
                        url: artPiece.url
                    })).slice(0, 6) //only take 6 painting data of the data we collected

                getApiData(filteredMetaData) //assign the data to be stored in the main component

            })
            .catch(err => console.log("Harvard API Error:", err)) //error message if api call could not be made
    }, [])

    return (
        <></>
    )
}