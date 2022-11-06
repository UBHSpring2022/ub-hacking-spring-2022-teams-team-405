import "../styles/Navbar.scss";
import coinLogo from "../assets/landing/mozam-logo-text.png";
import { HashLink } from "react-router-hash-link";

const Navbar = ({handleOpenModal}) => {
	return (
		<div id="landing" className="Navbar">
			<HashLink smooth to="/#landing">
				<img src={coinLogo} alt="Coin" />
			</HashLink>
			<div className="Navbar-items">
				<HashLink smooth to="/market">
					Marketplace
				</HashLink>
				<HashLink smooth to="/#About">
					About
				</HashLink>
				<HashLink smooth to="/#Lore">
					Lore
				</HashLink>
				<button onClick={handleOpenModal}>Login / Register</button>
			</div>
		</div>
	);
};
export default Navbar;
