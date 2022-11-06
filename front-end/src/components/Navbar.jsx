import "../styles/Navbar.scss";
import coinLogo from "../assets/landing/mozam-logo-text.png";
import { HashLink } from "react-router-hash-link";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../state/user";
import Swal from "sweetalert2";

const Navbar = ({handleOpenModal}) => {
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch()
	let handleSignout = () => {
		Swal.fire({
			title: 'Do you want to sign out?',
			text: "Please click the button below to confirm",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Log Out'
		  }).then((result) => {
			if (result.isConfirmed) {
				dispatch(clearUser())
			}
		  })
	}
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
				{user.isAuthenticated ?  <button onClick={handleSignout}>{user.isVerified? <VerifiedRoundedIcon/> : ""}{user.profile.display_name}</button> : <button onClick={handleOpenModal}>Login / Register</button>}
				
			</div>
		</div>
	);
};
export default Navbar;
