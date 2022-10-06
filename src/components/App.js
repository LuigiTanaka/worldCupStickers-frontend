import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import UserContext from "../contexts/UserContext";

import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import Header from "./shared/Header";

function App() {
	const apiUrl = "http://localhost:5000";

	const [user, setUser] = useState(getUser);

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

	const contextValue = { user, setUser, apiUrl, authorization };
	return (
		<UserContext.Provider value={contextValue}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<LoginPage />} />
					<Route path="/sign-up" element={<SignUpPage />} />
					<Route path="/stickers" element={<Header />} />
				</Routes>
			</BrowserRouter>
		</UserContext.Provider>
    );
}

export default App;
