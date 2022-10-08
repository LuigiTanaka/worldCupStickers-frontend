import { useContext, useState } from "react";
import styled from "styled-components"
import UserContext from "../contexts/UserContext";
import axios from "axios";

export default function StickerContainer({ stickerId, stickerName, quantity }) {
    const { apiUrl, authorization, update, setUpdate, disabled, setDisabled, setShowModal } = useContext(UserContext);

    function postStickerUser() {
        setDisabled(true);

        const URL = `${apiUrl}/stickers/${stickerId}`;
        const AUT = authorization;

        const promise = axios.post(URL, {}, AUT);

        promise.then((response) => {
            setUpdate(!update);
            setDisabled(false);
        }).catch((err) => {
            console.log(err);
            setDisabled(false);
        });
    }

    function incrementOrDeleteStickerUser() {
        setShowModal(true);
    }
    
    function showSticker() {
        if(quantity === 0) {
            return (
                <Container quantity={quantity} onClick={disabled ? null : postStickerUser}>
                    <h4>{stickerName}</h4>
                </Container>
            );
        } else {
            return (
                <Container quantity={quantity} onClick={disabled ? null : incrementOrDeleteStickerUser}>
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
    text-align: center;
    box-shadow: 1px 1px 1px 1.5px rgba(0, 0, 0, 0.25);
    background-color: ${props => props.quantity ? "#6B1B1A" : "#FFFFFF"};
    padding: 0 4px;

    h4 {
        font-size: 18px;
        font-weight: 700;
        color: ${props => props.quantity ? "#FFFFFF" : "#6B1B1A"};
    }
`