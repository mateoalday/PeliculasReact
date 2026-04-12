import { useState } from "react"
import MediaList from "../components/MediaList/MediaList"

function Home () {

    const [peliculas,setPeliculas] =useState([])
    



    return(
        <MediaList/>
    )
}

export default Home