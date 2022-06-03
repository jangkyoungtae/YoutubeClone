import styled from "styled-components"
import Search from "./Search";

const Container = styled.div`
    width:100%;
    display: flex;
    align-items: center;
`

const Logo = styled.img`
    width: 100px;
    height: 80px;
    margin-left:10px;
`
const Block = styled.hr`
    width: 100%;

`

export default function Header({ searchHandle } : {searchHandle :Function}) {    
    return (
        <>
            <Container >
                <Logo src="https://live.staticflickr.com/4117/4852250788_fd7272c4ee.jpg" />
                <Search searchHandle={searchHandle}/>                
            </Container>
            <Block />
        </>
    )
}
