import { useState } from "react";
import styled from "styled-components";

export default function Modal({ showModal, setShowModal }) {

    function createModal() {
        return (
            <Background>
                <ModalWrapper showModal={showModal}>
                    <ModalContent>
                        <h1>olaa</h1>
                    </ModalContent>
                </ModalWrapper>
            </Background>
        );
    }

    const modal = createModal();

    return (
        <>
            { showModal ? modal : null}
        </>
    );
}

const Background = styled.div`
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.75);
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
`

const ModalWrapper = styled.div`
    width: 400px;
    height: 300px;
    background: #fff;
    color: #000;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative; 
    border-radius: 10px;
`

const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 50px;    
`
