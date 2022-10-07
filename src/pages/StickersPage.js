import { useState, useContext } from "react";
import Header from "../components/Header";
import styled from "styled-components";
import { Triangle } from 'react-loader-spinner';
import UserContext from "../contexts/UserContext";
import album from "../assets/images/album.jpg"

export default function StickersPage() {
    const { user } = useContext(UserContext);

    const [loading, setLoading] = useState("");

    //<Triangle color="#FFFFFF" height="160" width="160" />

    function showGeneralFramework() {
        return (
            <GeneralFramework>
                <LeftSide>
                    <h2>{`${user.userData.username.toUpperCase()}'S ALBUM`}</h2>
                    <img src={album} alt="album"/>
                </LeftSide>
            </GeneralFramework>
        );
    }


    function showStickers() {
        return (
            <></>
        );
    }

    const stickers = showStickers();
    const generalFramework = showGeneralFramework();

    function showMainBody() {
        return (
            <MainBody>
                {generalFramework}
                {stickers}
            </MainBody>
        );
    }

    const mainBody = showMainBody();

    return (
        <Container>
            <Header />
            {loading ? <Loading>{loading}</Loading> : mainBody}
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #6b0b1a;
`

const Loading = styled.div`
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const MainBody = styled.div`
    max-width: fit-content;
    width: 100%;
    height: fit-content;
    display: flex;
    justify-content: center;
    gap: 30px;
    position: relative;
    padding-top: 160px;
`

const GeneralFramework = styled.div`
    width: 900px;
    height: 200px;
    padding: 20px;
    display: flex;
    background-color: #F0F0E4;
`

const LeftSide = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h2 {
        font-size: 24px;
        font-weight: 700;
        margin-bottom: 10px;
        color: #6b0b1a;
    }

    img {
        width: 100px;
        height: 120px;
    }
`