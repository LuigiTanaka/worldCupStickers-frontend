import { useContext } from "react";
import styled from "styled-components"
import UserContext from "../contexts/UserContext";
import axios from "axios";

export default function StickerContainer({ stickerId, stickerName, quantity, repeatedPage }) {
    const { apiUrl, authorization, disabled, setDisabled, setShowModal, setSticker } = useContext(UserContext);

    function postStickerUser() {
        setDisabled(true);

        const URL = `${apiUrl}/stickers/${stickerId}`;
        const AUT = authorization;

        const promise = axios.post(URL, {}, AUT);

        promise.then((response) => {
            setDisabled(false);
        }).catch((err) => {
            console.log(err);
            setDisabled(false);
        });
    }

    function incrementOrDeleteStickerUser() {
        setSticker({
            id: stickerId,
            name: stickerName,
            quantity
        });
        setShowModal(true);
    }
    
    function showSticker() {
        if(repeatedPage && quantity <= 1) {
            return null;

        } else if (repeatedPage && quantity === 2) {
            return (
                <Container quantity={quantity} onClick={disabled ? null : incrementOrDeleteStickerUser}>
                    <h4>{stickerName}</h4>
                </Container>
            );

        } else if (repeatedPage) {
            return (
                <Container quantity={quantity} onClick={disabled ? null : incrementOrDeleteStickerUser}>
                    <Quantity>{quantity-1}</Quantity>
                    <h4>{stickerName}</h4>
                </Container>
            );

        } else if(quantity === 0) {
            return (
                <Container quantity={quantity} onClick={disabled ? null : postStickerUser}>
                    <h4>{stickerName}</h4>
                </Container>
            );

        } else if(quantity === 1) {
            return (
                <Container quantity={quantity} onClick={disabled ? null : incrementOrDeleteStickerUser}>
                    <h4>{stickerName}</h4>
                </Container>
            );

        } else {
            return (
                <Container quantity={quantity} onClick={disabled ? null : incrementOrDeleteStickerUser}>
                    <Quantity>{quantity}</Quantity>
                    <h4>{stickerName}</h4>
                </Container>
            ); 
        }
    }

    const sticker = showSticker();

    return (
        <>
            {sticker}
        </>
    );
}

const Container = styled.div`
    display: flex;
    height: 38px;
    align-items: center;
    justify-content: center;
    text-align: center;
    box-shadow: 1px 1px 1px 1.5px rgba(0, 0, 0, 0.25);
    background-color: ${props => props.quantity ? "#6B1B1A" : "#FFFFFF"};
    padding: 0 4px;
    position: relative;

    h4 {
        font-size: 18px;
        font-weight: 700;
        color: ${props => props.quantity ? "#FFFFFF" : "#6B1B1A"};
    }
`

const Quantity = styled.div`
    font-weight: 700;
    font-size: 15px;
    width: 22px;
    height: 22px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #af3137;
    border-radius: 50%;
    box-shadow: 0px 1px 1px 1px rgba(0, 0, 0, 0.2);
    color: #ffffff;
    border: 1px solid #ffffff;
    position: absolute;
    top: -10px;
    right: -10px;
`