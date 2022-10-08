import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import UserContext from "../contexts/UserContext";

import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import StickersPage from "../pages/StickersPage";

function App() {
	const apiUrl = "http://localhost:5000";

	const [user, setUser] = useState(getUser);
	const [update, setUpdate] = useState(false);
	const [disabled, setDisabled] = useState(false);
	const [showModal, setShowModal] = useState(false);

	function getUser() {
        const userData = localStorage.getItem("userData");
        if (userData) {
            return JSON.parse(userData);
        }
        return {};
    }

	const authorization = {
        headers: {
            Authorization: `Bearer ${user.token}`
        }
    }

	const contextValue = { user, setUser, apiUrl, authorization, update, setUpdate, disabled, setDisabled, showModal, setShowModal };
	return (
		<UserContext.Provider value={contextValue}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<LoginPage />} />
					<Route path="/sign-up" element={<SignUpPage />} />
					<Route path="/stickers" element={<StickersPage />} />
				</Routes>
			</BrowserRouter>
		</UserContext.Provider>
    );
}

export default App;
