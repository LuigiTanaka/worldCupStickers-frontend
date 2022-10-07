import { useState } from "react";
import Header from "../components/Header";
import styled from "styled-components";
import { Triangle } from 'react-loader-spinner';
import GeneralFramework from "../components/GeneralFramework";

export default function StickersPage() {
    const [loading, setLoading] = useState("");
    //<Triangle color="#FFFFFF" height="160" width="160" />

    function showStickers() {
        return (
            <></>
        );
    }

    const stickers = showStickers();

    function showMainBody() {
        return (
            <MainBody>
                <GeneralFramework />
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
    padding-top: 140px;
`