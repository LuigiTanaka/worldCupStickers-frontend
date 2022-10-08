import { useContext } from "react";
import styled from "styled-components"
import UserContext from "../contexts/UserContext";

export default function StickerContainer({ stickerName, missing }) {
    const { disable, setDisable } = useContext(UserContext);
    
    return (
        <Container missing={missing}>
            <h4>{stickerName}</h4>
        </Container>
    );
}

const Container = styled.div`
    text-align: center;
    box-shadow: 1px 1px 1px 1.5px rgba(0, 0, 0, 0.25);
    background-color: ${props => props.missing ? "#FFFFFF" : "#6B1B1A"};

    h4 {
        font-size: 18px;
        font-weight: 700;
        color: ${props => props.missing ? "#6B1B1A" : "#FFFFFF"};
    }
`