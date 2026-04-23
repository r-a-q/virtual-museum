import { useEffect } from "react";

export default function CleanHarvardData({getApiData}) {

    useEffect(() => {
        const relevantFields = `objectid,dated,classification,period,primaryimageurl,title,people,url`
        const parameters = `classification=Paintings&hasimage=1&lendingpermissionlevel=0`
        const url = `https://api.harvardartmuseums.org/object?${parameters}&apikey=${import.meta.env.VITE_HARVARD_API_KEY}&fields=${relevantFields}&q=_exists_:primaryimageurl&sort=random&size=12`

        fetch(url)
            .then(res => res.json())
            .then(data => {
                const filteredMetaData = data.records.filter(record => record.primaryimageurl !== null)
                    .map(artPiece => ({
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
                    })).slice(0, 6)

                getApiData(filteredMetaData)

            })
            .catch(err => console.log("Harvard API Error:", err))
    }, [])

    return(
        <></>
    )
}