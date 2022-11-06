import "./styles/App.scss";
import Landing from "./pages/Landing.jsx";
import Market from "./pages/Market.jsx";
import Register from "./pages/Register.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

import { Routes, Route, useNavigate } from "react-router-dom";

function App() {
	const navigate = useNavigate();
	return (
		<>
      <Navbar />
			<Routes>
				<Route path="/" element={<Landing />} />
				<Route path="/register" element={<Register />} />
				<Route path="/market" element={<Market />} />
				<Route
					path="*"
					element={
            <button className="errorpage-btn" onClick={() => navigate("/")}>
							ERROR PAGE go to main page
						</button>
					}
				/>
			</Routes>
		<Footer/>
      

		</>
	);
}

export default App;
