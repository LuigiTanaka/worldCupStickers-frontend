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
            setLoading(null);
        }).catch((err) => {
            console.log(err);
            setLoading(null);
        });
    }, [apiUrl, authorization]);


    function showGroups() {
        return (
            <>
                { groups.map(group => <GroupContainer groupName={group.name} groupId={group.id} />) }
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
            {loading ? <Loading>{loading}</Loading> : mainBody}
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
    background-color: #6b0b1a;
    padding-bottom: 200px;
`

const Loading = styled.div`
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const MainBody = styled.div`
    max-width: fit-content;
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
    position: relative;
    padding-top: 140px;
`