import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import StickerContainer from "./StickerContainer";
import UserContext from "../contexts/UserContext";
import axios from "axios";

export default function CategoryContainer({ categoryName, categoryId, repeatedPage, setLoading }) {
    const { apiUrl, authorization } = useContext(UserContext);

    const [stickers, setStickers] = useState([]);
    let sumTotalInCategory = 0;
    let sumOwnerInCategory = 0;

    useEffect(() => {
        const URL = `${apiUrl}/stickers/${categoryId}`;
        const AUT = authorization;

        const promise = axios.get(URL, AUT);
        promise.then((response) => {
            setStickers(response.data);
            setLoading(null);
        }).catch((err) => {
            console.log(err);
        });
    }, [apiUrl, authorization, categoryId, setLoading]);


    function showStickers() {
        return (
            <>
                { stickers.map((sticker, index) => {
                    sumTotalInCategory++;
                    if(sticker.quantity > 0) {
                        sumOwnerInCategory++;
                    }
                    return <StickerContainer key={index} stickerId={sticker.id} stickerName={sticker.name} quantity={sticker.quantity} repeatedPage={repeatedPage} />
                }) }
            </>
        );
    }

    function createPorcentage() {
        if(!repeatedPage) {
            return (
                <>
                    <h2>{`${Math.round((sumOwnerInCategory/sumTotalInCategory)*100)}% (${sumOwnerInCategory}/${sumTotalInCategory})`}</h2>
                </>
            );
        } else {
            return null;
        }
    }

    const stickersContainer = showStickers();
    const porcentage = createPorcentage();

    return (
        <Container>
            <Title>
                <h1>{categoryName}</h1>
                {porcentage}
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

    @media(max-width: 992px) {
        width: 100%;
    }

    @media(max-width: 500px) {
        width: 100%;
        border-radius: 8px;
    }
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
    height: fit-content;
    display: grid;
    justify-content: center;
    grid-template-columns: 38px 38px 38px 38px 38px 38px 38px;
    gap: 12px;

    @media(max-width: 992px) {
        width: 100%;
    }

    @media(max-width: 440px) {
        grid-template-columns: 36px 36px 36px 36px 36px 36px;
    }
`