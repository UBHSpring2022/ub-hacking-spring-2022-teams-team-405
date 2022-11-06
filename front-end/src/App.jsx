import "./styles/App.scss";
import Landing from "./pages/Landing.jsx";
import Market from "./pages/Market.jsx";
import Register from "./pages/Register.jsx";
import Navbar from "./components/Navbar.jsx";
import Chat from "./components/Chat.jsx";
import Detail from "./pages/Detail.jsx";
import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import ModalView from "./components/ModalView.jsx";
import PersistProfile from "./components/PersistProfile.jsx";
import Footer from "./components/Footer.jsx";

function App({cable}) {

	const [isMining, setIsMining] = useState(false)
	const [openModal, setOpenModal] = useState(false);
	const navigate = useNavigate();
	let handleOpenModal = () => {
		setOpenModal(true);
	};
	return (
		<>
			<PersistProfile />
			<ModalView isMining={isMining} setOpenModal={setOpenModal} openModal={openModal}/>
			<Navbar handleOpenModal={handleOpenModal} />
			<Routes>
				<Route path="/" element={<Landing />} />
				<Route path="/detail/:uuid" element={<Detail setOpenModal={setOpenModal} setIsMining={setIsMining}/>} />
				<Route path="/register" element={<Register />} />
				<Route path="/chat/:uuid" element={<Chat cable={cable}/>} />
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
