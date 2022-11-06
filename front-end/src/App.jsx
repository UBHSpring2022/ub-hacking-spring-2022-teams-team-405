import "./styles/App.scss";
import Landing from "./pages/Landing.jsx";
import Market from "./pages/Market.jsx";
import Register from "./pages/Register.jsx";
import Navbar from "./components/Navbar.jsx";
import ModalView from "./components/ModalView.jsx";
import Footer from "./components/Footer.jsx";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";
function App() {
	const [openModal, setOpenModal] = useState(false);
	const navigate = useNavigate();
	let handleOpenModal = () => {
		setOpenModal(true);
	};
	return (
		<>
			
			<ModalView setOpenModal={setOpenModal} openModal={openModal}/>
			<Navbar handleOpenModal={handleOpenModal} />
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
			<Footer />
		</>
	);
}

export default App;
