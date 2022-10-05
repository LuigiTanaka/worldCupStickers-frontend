import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import UserContext from "../contexts/UserContext";

import LoginPage from "./pages/LoginPage";

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
				</Routes>
			</BrowserRouter>
		</UserContext.Provider>
    );
}

export default App;
