import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import api from "../api";

const VideoContainer = styled.div`
    width: 100vw;
    display:flex;    
    justify-content:center;
`
const VideoFrame = styled.div`
    width: 90vw;
    height: 50vw;
    @media (min-width: 1923px) {
        width: 70vw;
        height: 35vw;
    }    
`;


const VideoInfoContainer = styled.div`
    display:flex;    
    justify-content:center;    
`;

const VideoName = styled.p`
    width: 90vw;
    margin:3px 5px;
    font-size:28px;
    line-height: 1.7;
    font-weight:bold;
    @media (min-width: 1923px) {
        width: 70vw;
        height: 35vw;
    }
`


interface IVideolInfo{
    snippet: {
        channelTitle: string,
        description: string,
        title: string,
        thumbnails: {
            height: number,
            url: string,
            width: number,
        }        
    },

    statistics: {
        viewCount:number
    },

}


export default function VideoPlayerPage() {    
    const params = useParams();
    const [videoinfo, setVideoinfo] = useState<IVideolInfo>({
        snippet: {
            channelTitle: "",
            description: "",
            title: "",
            thumbnails: {
                height: 0,
                url: "",
                width: 0,
            }
            
        },
        statistics: {
            viewCount:0
        }
    })
    const GetVideoInfo = async () => {
        const videoinfo = await api.get("/videos", {
            params: {
                part: "snippet, statistics",
                id: params.videoId
            }
        });
        
        const channelinfo = await api.get('/channels', {
            params: {
                part: "snippet, statistics",
                id: videoinfo?.data.items[0].snippet.channelId
            }            
        })
        const videoinfodata = videoinfo?.data.items[0];
        const channelinfodata = channelinfo.data.items[0].snippet;
        setVideoinfo({
            snippet: {
                channelTitle: videoinfodata.snippet.channelTitle,
                description: videoinfodata.snippet.description,
                title: videoinfodata.snippet.title,
                thumbnails: {
                    height: channelinfodata.thumbnails.default.height,
                    url: channelinfodata.thumbnails.default.url,
                    width: channelinfodata.thumbnails.default.width,
                }
                
            },
            statistics: {
                viewCount:videoinfodata.statistics.viewCount
            }
        })
    }
    useEffect(() => {
        GetVideoInfo(); 
    })
    return (
        <>
            <VideoContainer>
                <VideoFrame>
                    <iframe
                        width="100%"
                        height="100%"
                        src={"https://www.youtube.com/embed/" + params.videoId + "?controls=1&autohide=1&autoplay=1&mute=0"}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
                        allowFullScreen>
                    </iframe>
                </VideoFrame>               
            </VideoContainer>
             <VideoInfoContainer>
                <VideoName>{ videoinfo.snippet.title}</VideoName>
            </VideoInfoContainer>
        </>
    )
}