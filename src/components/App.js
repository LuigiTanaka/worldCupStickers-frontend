import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import UserContext from "../contexts/UserContext";

import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import StickersPage from "../pages/StickersPage";
import RepeatedPage from "../pages/RepeatedPage";

function App() {
	const apiUrl = process.env.REACT_APP_API_BASE_URL;

	const [user, setUser] = useState(getUser);
	const [sticker, setSticker] = useState({});
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

	const contextValue = { user, setUser, apiUrl, authorization, disabled, setDisabled, showModal, setShowModal, sticker, setSticker };
	return (
		<UserContext.Provider value={contextValue}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<LoginPage />} />
					<Route path="/sign-up" element={<SignUpPage />} />
					<Route path="/stickers" element={<StickersPage />} />
					<Route path="/repeated" element={<RepeatedPage />} />
				</Routes>
			</BrowserRouter>
		</UserContext.Provider>
    );
}

export default App;
