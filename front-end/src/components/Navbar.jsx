import "../styles/Navbar.scss";
import coinLogo from "../assets/landing/mozam-logo-text.png";
import { HashLink } from "react-router-hash-link";

const Navbar = () => {
	return (
		<div className="Navbar">
            <HashLink smooth to="/#landing-hero">
			    <img src={coinLogo} alt="Coin" />
			</HashLink>
			<div className="Navbar-items">
				<HashLink smooth to="/#Marketplace">
					Marketplace
				</HashLink>
				<HashLink smooth to="/#About">
					About
				</HashLink>
				<HashLink smooth to="/#Lore">
					Lore
				</HashLink>
				<button>Login / Register</button>
			</div>
		</div>
	);
};
export default Navbar;
