import { useState } from "react";
import { IoClose, IoTrashSharp, IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";
import styled from "styled-components";

export default function Modal({ showModal, setShowModal }) {

    function createModal() {
        return (
            <Background>
                <ModalWrapper showModal={showModal}>
                    <h1>REMOVE OR ADD REPEATED</h1>
                    <IoClose />
                    <ModalContent>
                        <div className="firstRow">
                            <h2>QAT 1</h2>
                            <h3><strong>Total: </strong>1</h3>
                        </div>
                        <div className="secondRow">
                            <h2>Remove sticker(s)</h2>
                            <IoTrashSharp />
                        </div>
                        <div className="thirdRow">
                            <h2>Include repeated</h2>
                            <div>
                                <IoRemoveCircleOutline />
                                <h3>1</h3>
                                <IoAddCircleOutline />
                            </div>
                        </div>
                    </ModalContent>
                    <button>CONFIRM</button>
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
    width: 370px;
    height: fit-content;
    background: #F0F0E4;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px;
    position: relative; 
    border-radius: 8px;

    h1 {
        margin-top: 20px;
        font-size: 24px;
        font-weight: 600;
        color: #FFFFFF;
        background-color: #6B1B1A;
        padding: 8px 20px;
        border-radius: 6px;
    }

    &>svg {
        font-size: 30px; 
        color: #000000;
        position: absolute;
        top: 8px;
        right: 8px;
    }

    button {
        font-size: 18px;
        padding: 2px 14px;
        border: 1px solid #000000;
        margin-bottom: 8px;
    }
`

const ModalContent = styled.div`
    width: 330px;
    padding: 20px 20px;
    display: grid;
    justify-content: center;
    grid-template-rows: 38px 38px 38px;
    gap: 10px;

    .firstRow {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 5px;
        border-bottom: 1px solid #777777;

        h2 {
            text-align: center;
            font-size: 26px;
            font-weight: 800;
            color: #6B1B1A;
            margin-right: 160px;
        }

        h3 {
            text-align: center;
            font-size: 22px;
            color: #000000;
        }

        strong {
            font-size: 24px;
            font-weight: 600;
            margin-right: 4px;
        }
    }

    .secondRow {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 5px;
        border-bottom: 1px solid #777777;
        color: #000000;

        h2 {
            text-align: center;
            font-size: 22px;
            font-weight: 600;
        }

        svg {
            font-size: 26px;
            margin-right: 23px;
        }
    }

    .thirdRow {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 5px;
        border-bottom: 1px solid #777777;
        color: #000000;

        h2 {
            text-align: center;
            font-size: 22px;
            font-weight: 600;
        }

        div {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 8px;
        }

        h3 {
            font-size: 22px;
        }

        svg:first-child {
            color: #c91e40;
            font-size: 24px;
        }

        svg:last-child {
            color: #085b08;
            font-size: 24px;
        }
    }
    
`
