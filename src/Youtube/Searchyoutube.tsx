import { useEffect,  useState } from "react";
import styled from "styled-components";
import api from "../api";
import Header from "../Component/Header";
import YoutubeVideo from "./YoutubeVideo";


const VideosContainer = styled.div`
    display: inline-flex;
    flex-flow: row wrap;
    justify-content:center;
    
`
interface IYoutubeVideoList{
    id: {
        videoId:string
    },
    snippet: {
        channelId: string,
        title:string,
        thumbnails: {
            high: {
                width: string,
                height: string,
                url:string
            }
        }
    }
}


function Searchyoutube() {
    const [videos, setVideos] = useState({
        videoList: [],
        isLoading:false        
    });
    const searchHandle = async (text : string) => {
        const res = await api.get('/search', {
            params: {
                q: text,
                regionCode: "KR",
                maxResults: 48,
                order: "relevance",
                safeSearch: "moderate",
                pageToken: ""
            }
        });

        setVideos({
            videoList: res.data.items,
            isLoading: true
        });    
        
    }
    
    useEffect(() => {
        searchHandle("킬링보이스")        
    },[])
    return (
        <>
            <Header searchHandle={searchHandle} />
            <VideosContainer>
                {videos && videos.videoList.map((ids:IYoutubeVideoList) => { 
                    return <YoutubeVideo key={ids.id.videoId} ids={ids} />                
                })}
            </VideosContainer>
        </>
    )
}

export default Searchyoutube