import React, { useState } from 'react'
import styled from 'styled-components'
import Thumbnail from './Thumbnail';
const YouTubeDiv = styled.div`    
    padding-left:${20}px;
    padding-top:${10}px;
    padding-right:${20}px;
    float:left;
    width:${300}px;
    &:hover {
        cursor: pointer;
    }
`
const YoutubeTitle = styled.span`  
    margin:${0}px;
    padding-right:${10}px;
    font-weight:bold;
    white-space: normal;
    overflow:hidden;
    line-height: 1.2;
    height: 2.4em;
    text-align: left;
    word-wrap: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;

`
function YoutubeVideo({ ids }: { ids: any }) {
    const [hover, setHover] = useState(false);
    const renderHTML = (rawHTML: string) => React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });
    return (
        <YouTubeDiv
            onMouseOver={() => setHover(true)}
            onMouseOut={() => setHover(false)}
            onClick={()=>console.log("test")}
        >   
            {hover ?
                (<iframe style={{
                    "pointerEvents": "none",
                    
                }}  width="320" height="180" src={"https://www.youtube.com/embed/" + ids["id"]["videoId"] + "?controls=1&autohide=1&autoplay=1&mute=0"} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;" allowFullScreen></iframe>)
                : (
                    <Thumbnail src={ids["snippet"]["thumbnails"]["medium"]} />
                )
            }
            <YoutubeTitle>{renderHTML(ids["snippet"]["title"])}</YoutubeTitle>

        </YouTubeDiv>
    )
}
export default YoutubeVideo