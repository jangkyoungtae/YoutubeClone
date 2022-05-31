import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import api from "../api";
import YoutubeVideo from "./YoutubeVideo";
function Searchyoutube() {
    const [videos, setVideos] = useState([])
    
    
    const searchHandle = async (term:string) => {
        const res = await api.get('/search', {
            params: {
                q: term
            }            
        })
        setVideos(res.data.items)
    }
    useEffect(() => {
        if (videos.length >= 0) {
            searchHandle("벤 라이브");    
        }
    },[]) 
    return (
        <>
            {videos && videos.map((ids) => {
                return ids["id"]["videoId"] && <YoutubeVideo key={ids["id"]["videoId"]}  ids={ids} />
            })} 
            
        </>
    )
}

export default Searchyoutube