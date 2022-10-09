import { useState, useRef, useContext } from "react";
import { IoClose, IoTrashSharp, IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";
import styled from "styled-components";
import userContext from "../contexts/UserContext";
import axios from "axios";

export default function Modal({ showModal, setShowModal }) {
    const modalRef = useRef();

    const { apiUrl, authorization, sticker } = useContext(userContext);

    const [repeated, setRepeated] = useState(0);

    function closeModal(e) {
        if(modalRef.current === e.target) {
            setRepeated(0);
            setShowModal(false);
        }
    }

    function removeSticker() {
        if(window.confirm(`Are you sure you want to remove all stickers of ${sticker.name}?`)) {
            const URL = `${apiUrl}/stickers/${sticker.id}`;
            const AUT = authorization;

            const promise = axios.delete(URL, AUT);

            promise.then((response) => {
                setRepeated(0);
                setShowModal(false);
            }).catch((err) => {
                console.log(err);
            });
        }
    }

    function updateRepeated() {
        const URL = `${apiUrl}/stickers/${sticker.id}`;
        const AUT = authorization;
        const BODY = { quantity: sticker.quantity + repeated };

        const promise = axios.put(URL, BODY, AUT);

        promise.then((response) => {
            setRepeated(0);
            setShowModal(false);
        }).catch((err) => {
            console.log(err);
        });
    }

    function removeRepeated() {
        const sum = sticker.quantity + repeated - 1;
        if(sum === 1) {
            setRepeated(repeated-1);
        } else if( sum > 1) {
            setRepeated(repeated-1);
        } 
    }

    function addRepeated() {
        setRepeated(repeated+1);
    }

    function createModal() {
        return (
            <Background ref={modalRef} onClick={closeModal}>
                <ModalWrapper>
                    <h1>REMOVE OR UPDATE REPEATED</h1>
                    <IoClose onClick={() => {
                        setRepeated(0);
                        setShowModal(false)
                    }}/>
                    <ModalContent>
                        <div className="firstRow">
                            <h2>{sticker.name}</h2>
                            <h3><strong>Total: </strong>{sticker.quantity + repeated}</h3>
                        </div>
                        <div className="secondRow">
                            <h2>Remove sticker(s)</h2>
                            <IoTrashSharp onClick={removeSticker}/>
                        </div>
                        <div className="thirdRow">
                            <h2>Update repeated</h2>
                            <div>
                                <IoRemoveCircleOutline onClick={removeRepeated} className={sticker.quantity + repeated > 1 ? "enable" : "notEnable"} />
                                <h3>{repeated}</h3>
                                <IoAddCircleOutline onClick={addRepeated}/>
                            </div>
                        </div>
                    </ModalContent>
                    <button onClick={updateRepeated} disabled={repeated === 0}>CONFIRM</button>
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
        font-size: 23px;
        font-weight: 600;
        color: #FFFFFF;
        background-color: #6B1B1A;
        padding: 8px 16px;
        border-radius: 6px;
    }

    &>svg {
        font-size: 30px; 
        color: #000000;
        position: absolute;
        top: 6px;
        right: 6px;
    }

    button {
        font-size: 18px;
        font-weight: 500;
        padding: 3px 18px;
        border: 2px solid #000000;
        margin-bottom: 8px;

        &:disabled {
            opacity: 0.6;
            border: 2px solid rgba(0, 0, 0, 0.3);
        }
    }

    @media(max-width: 400px) {
        width: 100%;
        border-radius: 0;
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
        align-items: center;
        padding-bottom: 5px;
        border-bottom: 1px solid #777777;

        h2 {
            width: 100px;
            text-align: start;
            font-size: 26px;
            font-weight: 800;
            color: #6B1B1A;
            margin-right: 106px;
        }

        h3 {
            width: 80px;
            text-align: end;
            font-size: 22px;
            color: #000000;
            margin-right: 3px;
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
            box-sizing: content-box;
            padding: 5px 23px;
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
            font-size: 24px;
        }

        svg:last-child {
            color: #085b08;
            font-size: 24px;
        }

        .notEnable {
            color: #777777;
        }

        .enable {
            color: #c91e40;
        }
    }
    
`
