import { useContext, useState } from "react";
import styled from "styled-components";
import { IoChevronDown, IoChevronUp, IoCopySharp, IoExitSharp } from "react-icons/io5";
import logoHeader from '../../assets/logo-header.svg'
import defaultAvatar from '../../assets/default-avatar.png';
import { useNavigate } from 'react-router-dom';
import UserContext from "../../contexts/UserContext";

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
                    <h1>WORLD CUP STICKERS</h1>
                    <div>
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
    font-family: 'Gemunu Libre', sans-serif;
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
    z-index: 10;
    background-color: #F0F0E4;

    &>img {
        width: 120px;
        height: 120px;
        margin-left: 28px;
        align-self: center;
        margin: 0 25px 0 20px;
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
    }

    div {
        color: #000000;
        display: flex;
        font-size: 25px;
        gap: 10px;

        &:hover{
            color: #8B2938;
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
`