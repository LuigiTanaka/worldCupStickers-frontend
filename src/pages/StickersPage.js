import { useState, useContext, useEffect } from "react";
import Header from "../components/Header";
import styled from "styled-components";
import { Triangle } from 'react-loader-spinner';
import GeneralFramework from "../components/GeneralFramework";
import GroupContainer from "../components/GroupContainer";
import UserContext from "../contexts/UserContext";
import axios from "axios";
import Modal from "../components/Modal";

export default function StickersPage() {
    const { apiUrl, authorization, showModal, setShowModal } = useContext(UserContext);

    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(<Triangle color="#FFFFFF" height="160" width="160" />);

    useEffect(() => {
        const URL = `${apiUrl}/stickers/groups`;
        const AUT = authorization;

        const promise = axios.get(URL, AUT);
        promise.then((response) => {
            setGroups(response.data);
        }).catch((err) => {
            console.log(err);
        });
    }, [apiUrl, authorization]);


    function showGroups() {
        return (
            <>
                { groups.map((group, index) => <GroupContainer key={index} groupName={group.name} groupId={group.id} repeatedPage={false} setLoading={setLoading}/>) }
            </>
        );
    }

    const groupsContainer = showGroups();

    function showMainBody() {
        return (
            <MainBody>
                <GeneralFramework />
                {groupsContainer}
            </MainBody>
        );
    }

    const mainBody = showMainBody();

    return (
        <Container>
            <Modal showModal={showModal} setShowModal={setShowModal} />
            <Header />
            {mainBody}
            {loading ? <Loading>{loading}</Loading> : null}
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    min-height: 100vh;
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #601717;
    padding-bottom: 200px;
`

const Loading = styled.div`
    width: 100%;
    height: 100%;
    background-color: #601717;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
`

const MainBody = styled.div`
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
    position: relative;
    padding-top: 140px;

    @media(max-width: 500px) {
        padding-top: 120px; 
        gap: 60px;
    }
`