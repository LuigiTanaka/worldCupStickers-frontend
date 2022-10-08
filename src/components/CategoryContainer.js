import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import StickerContainer from "./StickerContainer";
import UserContext from "../contexts/UserContext";
import axios from "axios";

export default function CategoryContainer({ categoryName, categoryId }) {
    const { apiUrl, authorization } = useContext(UserContext);

    const [stickers, setStickers] = useState([]);

    useEffect(() => {
        const URL = `${apiUrl}/stickers/${categoryId}`;
        const AUT = authorization;

        const promise = axios.get(URL, AUT);
        promise.then((response) => {
            setStickers(response.data);
        }).catch((err) => {
            console.log(err);
        });
    }, [apiUrl, authorization, categoryId]);


    function showStickers() {
        return (
            <>
                { stickers.map(sticker => <StickerContainer stickerId={sticker.id} stickerName={sticker.name} quantity={sticker.quantity} />) }
            </>
        );
    }

    const stickersContainer = showStickers();

    return (
        <Container>
            <Title>
                <h1>{categoryName}</h1>
                <h2>{`5% (2/80)`}</h2>
            </Title>
            <StickersContainer>
                {stickersContainer}
            </StickersContainer>
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    height: fit-content;
    display: flex;
    background-color: #FFFFFF;
    box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
`

const Title = styled.div`
    width: 100%;
    height: 40px;
    background-color: #5BD0B8;
    border-radius: 8px 8px 0 0;
    padding-left: 10px;
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 10px;

    h1 {
        font-size: 24px;
        font-weight: 800;
    }

    h2 {
        font-size: 18px;
        font-weight: 500;
    }
`

const StickersContainer = styled.div`
    padding: 20px;
    display: grid;
    justify-content: center;
    grid-template-columns: 38px 38px 38px 38px 38px 38px 38px;
    grid-template-rows: 38px 38px 38px;
    gap: 12px;
`