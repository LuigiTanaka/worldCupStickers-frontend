import { useContext, useState } from "react";
import styled from "styled-components";
import { IoChevronDown, IoChevronUp, IoCopySharp, IoExitSharp } from "react-icons/io5";
import logoHeader from '../assets/images/logo-header.svg'
import defaultAvatar from '../assets/images/default-avatar.png';
import { useNavigate } from 'react-router-dom';
import UserContext from "../contexts/UserContext";

export default function Header() {  
    const { user } = useContext(UserContext);

    const [showLogout, setShowLogout] = useState(false);

    const userPicture = user.userData.pictureUrl;

    const navigate = useNavigate();

    function logout() {
        if(window.confirm("Do you really want to leave?")) {
            localStorage.removeItem("userData");
            navigate("/");
        }
    }

    function createDropdown() {
        if(!showLogout) {
            return (
                <>
                    <IoChevronDown />
                    <img src={userPicture ? userPicture : defaultAvatar} alt="Avatar" />
                </>
            );
        } else {
            return (
                <>
                    <IoChevronUp />
                    <img src={userPicture ? userPicture : defaultAvatar} alt="Avatar" />
                    <ul className='dropdown-content' onClick={logout}>
                        <li>
                            <IoExitSharp />
                            Logout
                        </li>
                    </ul>
                </>
            );
        }
    }

    const dropdown = createDropdown();

    return (
        <Container>
            <HeaderStyled>
                <img src={logoHeader} alt="logo" onClick={() => navigate("/stickers")} />
                <Middle>
                    <h1 onClick={() => navigate("/stickers")}>WORLD CUP STICKERS</h1>
                    <div onClick={() => navigate("/repeated")}>
                        <IoCopySharp />
                        <h3>Repeated</h3>
                    </div>
                </Middle>
                <Dropdown onMouseOver={() => setShowLogout(true)} onMouseOut={() => setShowLogout(false)}>
                    {dropdown}
                </Dropdown>
            </HeaderStyled>
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    position: relative;
`

const HeaderStyled = styled.header`
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    background-color: #F0F0E4;
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.25);

    &>img {
        width: 120px;
        height: 120px;
        margin-left: 28px;
        align-self: center;
        margin: 0 25px 0 20px;
        cursor: pointer;
    }

    @media(max-width: 992px) {
        &>img {
            display: none;
        }
    }
`

const Middle = styled.div`
    width: 100%;
    height: 50px;
    padding: 0 25px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #8B2938;
    border-left: 2px solid #000000;
    h1 {
        font-size: 40px;
        font-weight: 700;
        cursor: pointer;
    }
    div {
        color: #000000;
        display: flex;
        font-size: 25px;
        gap: 10px;
        cursor: pointer;
        &:hover{
            color: #8B2938;
        }
    }
    @media(max-width: 992px) {
        border-left: none;
        padding: 0 20px;
    }
    @media(max-width: 700px) {
        padding: 0 10px 0 15px;
        h1 {
            font-size: 30px;
        }
        div {
            font-size: 20px;
        }
    }
    @media(max-width: 600px) {
        div {
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 5px;
        }
    }
`

const Dropdown = styled.div`
    display: flex;
    align-items: center;
    justify-content: end;
    gap: 10px;
    position: relative;
    align-self: center;
    width: 200px;
    height: 100%;
    
    &:hover{
        &>svg {
            color: #8B2938;
        }
    }
    svg {
        font-size: 30px; 
        color: #000000;
    }
    img {
        width: 52px;
        height: 52px;
        margin-right: 20px;
        border-radius: 50%;
    }
    
    .dropdown-content {
        width: 150px;
        height: 47px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        right: 0;
        bottom: -45px;  
        background-color: #F0F0E4;
        z-index: 1;
        box-shadow: -3px 3px 3px rgba(0, 0, 0, 0.25);
    }
    li {
        margin-bottom: 8px;
        white-space: nowrap;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
        font-weight: 600;
        font-size: 22px;
        line-height: 20px;
        letter-spacing: 0.05em;
        color: #000000; 
        cursor: pointer;
        svg {
            font-size: 26px;
        }
        &:hover{
            color: #8B2938;
            &>svg {
                color: #8B2938;
            }
        }
        &:last-child{
            margin-bottom: 0;
        }
    }
    @media(max-width: 992px) {
        width: 150px;
    }
    @media(max-width: 700px) {
        img {
            width: 44px;
            height: 44px;
            margin-right: 10px;
        }
        svg {
            font-size: 25px; 
        }
        .dropdown-content {
            width: 100px;
        }
        li {
            font-size: 18px;
            gap: 6px;
            svg {
                font-size: 20px;
            }
        }
    }
`