import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Thumbnail from './Thumbnail';
import { Link } from "react-router-dom";
import api from '../api';

const YouTubeDiv = styled.div`    
    margin-left:${40}px;
    margin-top:${10}px;
    margin-right:${40}px;
    width:${470}px;
    display:flex;
    flex-direction:column;
    height:${500}px;
    &:hover {
        cursor: pointer;
    }
`
const YoutubeTitle = styled.span`  
    margin-left:${10}px;
    margin-right:${10}px;
    font-size:25px;
    color:black;
    white-space: normal;
    overflow:hidden;
    line-height: 1.2;
    max-height:2.4em;    
    text-align: left;
    word-wrap: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
`

const ChannelName = styled.p`
    margin-left:66px;
    color:#acacac;
    font-size:23px;
    margin-top:0px;
    margin-bottom:0px;
    text-decoration:none;
`

const ViewCount = styled.p`
    margin-left:66px;
    margin-top:0px;
    margin-bottom:0px;
    color:#bcbcbc;
    font-size:18px;
    text-decoration:none;
`

const Statistics = styled.div`
    
`

const ChanelLogo = styled.img`
    width:50px;
    height:50px;
    display:flex;
    float:left;
    margin :3px;
`
const LogoDiv = styled.div`
    width:100%;    
    display:flex;
    float:left;
    margin :3px;
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
    },
}

interface IChannelInfo{
    snippet: {
        localized: {
            title: string
        },
        thumbnails: {
            default: {
                url: string,
            }
        },
    }
    statistics: {
        viewCount:number,
    }

}


function YoutubeVideo({ ids }: { ids: IYoutubeVideoList }) {    
    const [hover, setHover] = useState(false);
    const renderHTML = (rawHTML: string) => React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });
    const [channel, setChannel] = useState<IChannelInfo>({
        snippet: {
            localized: {
            title: ""
            },
            thumbnails: {
                default: {
                    url: "",
                }
            },
        },
        statistics: {
            viewCount:0,
        }

    });
    function ProcessViewCount(viewCount: number) {

        if (viewCount < 1000) {
            return `조회수 ${viewCount}회`; 
        } else if (viewCount < 10000) {
            return `조회수 ${(viewCount / 1000).toFixed(1)}천회`; 
        } else if (viewCount < 100000) {
            return `조회수 ${(viewCount / 10000).toFixed(1)}만회`;
        } else if (viewCount < 100000000) {
            return `조회수 ${(viewCount / 10000).toFixed(0)}만회`; 
        } else {
            return `조회수 ${(viewCount / 100000000).toFixed(0)}억회`;
        }
    }
    const channelInfoHandle = async (channelId : string, videoId:string) => {
        const channelinfo = await api.get('/channels', {
            params: {
                part: "snippet, statistics",
                id: channelId
            }
        });

        const videoinfo = await api.get("/videos", {
            params: {
                part: "snippet, statistics",
                id: videoId
            }
        });
        
        setChannel({
            snippet: {
                localized: {
                    title: channelinfo.data.items[0].snippet.localized.title
                },
                thumbnails: {
                    default: {
                        url: channelinfo.data.items[0].snippet.thumbnails.default.url,
                    }
                },
            },
            statistics: {
                viewCount:videoinfo.data.items[0].statistics.viewCount,
            }
        })   
    }


    useEffect(() => {
        channelInfoHandle(ids.snippet.channelId, ids.id.videoId)        
    },[])
    return (
        <Link to={"/video/" + ids.id.videoId} style={{
            textDecoration:"none",
        }}>
            <YouTubeDiv
                onMouseOver={() => setHover(true)}
                onMouseOut={() => setHover(false)}
            >
                {hover ?
                    (<iframe style={{
                        "pointerEvents": "none",
                    }}
                        width={ids.snippet.thumbnails.high.width}
                        height={ids.snippet.thumbnails.high.height}
                        src={"https://www.youtube.com/embed/" + ids.id.videoId + "?controls=1&autohide=1&autoplay=1&mute=0"}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
                        allowFullScreen>
                    </iframe>
                    )
                    :
                    (
                        <Thumbnail src={ids.snippet.thumbnails.high} />
                    )
                }
                
                <LogoDiv>
                    <ChanelLogo src={channel?.snippet.thumbnails.default.url} />
                    <YoutubeTitle>
                        {renderHTML(ids.snippet.title)}
                    </YoutubeTitle>
                </LogoDiv>

                <ChannelName>{channel?.snippet.localized.title}</ChannelName>
                <Statistics>
                    <ViewCount>{ProcessViewCount(channel?.statistics.viewCount)}</ViewCount>
                </Statistics>

            </YouTubeDiv>
        </Link>
    )
}
export default YoutubeVideo