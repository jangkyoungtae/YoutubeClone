import styled from "styled-components"
import { MdOutlineSearch } from "react-icons/md";
import {  useState } from "react";

const SearchInput = styled.input`
    width: 30vh;
    font-size:23px;    
    border: 3px solid #cecece;
    border-radius:10px;
    padding:13px;
`;


const SearchContainer = styled.div`    
    width: 100%;
    display: flex;
    justify-content:center;
    align-items: center;
`;


const SearchBtn = styled.button`
    padding-left:8px;
    padding-right:8px;
    padding-top:8px;
    padding-bottom:5px;
    font-size:20px;
    font-weight:bold;
    border-radius:10px;
    cursor:pointer;
`;


export default function Search({searchHandle}:{searchHandle:Function}) {
    const [search, setSearch] = useState("");
    const searchChange = (e: React.ChangeEvent<HTMLInputElement>) => {        
        setSearch(e.target.value)
    }
    const onClickSearchBtn = (e:React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            searchYoutube(search)
        }
    }
    const searchYoutube = async (text: string) => {
        await searchHandle(text)
    }
    return (
        <SearchContainer>
            <SearchInput type={"text"} onChange={searchChange} onKeyDown={onClickSearchBtn} value={search}  />
            <SearchBtn onClick={()=>searchYoutube(search)}>
                <MdOutlineSearch style={{
                    fontSize: "30px",
                    padding: "5px",
                }} />
            </SearchBtn>
        </SearchContainer>
    )
}