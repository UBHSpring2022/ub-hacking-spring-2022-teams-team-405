import "../styles/Navbar.scss";
import coinLogo from "../assets/landing/mozam-logo-text.png";
import { HashLink } from "react-router-hash-link";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import { useSelector, useDispatch } from "react-redux";
import { clearUser, verifyUser } from "../state/user";
import Swal from "sweetalert2";
import Modal from "@mui/material/Modal";
import { useState } from "react"
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";

const Navbar = ({handleOpenModal}) => {
	const user = useSelector((state) => state.user);
	const [smsModal, setSmsModal] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
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
	let handleSubmit = (e) => {
		e.preventDefault();
		setIsLoading(true);
		fetch("http://127.0.0.1:3000/verify", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"super-token": e.target.sms_token.value,
			},
		})
			.then((res) => {
				setIsLoading(false);
				return res.json();
			})
			.then((data) => {
				if (data["error"]) {
					Swal.fire(data["error"], data["message"], "error");
				} else {
					dispatch(verifyUser());
					setSmsModal(false);
				}
			});

	}
	let handleNewCode = () => {
		let token = localStorage.getItem("token");


		fetch("http://127.0.0.1:3000/textme",{
			method: "GET",
			  headers: {
				"Content-Type": "application/json",
				'super-token': token
			  },
			})
			.then(res => res.json())
			.then(data => {
				if(data["_error"]){
					Swal.fire('Error', `Something went wrong:  ${data["_error"]}`, 'error')
				}else{
					if(data["error"]){
						Swal.fire('Error', `Something went wrong: ${data["error"]}`, 'error')
					}else{
						Swal.fire('Success', `${data["message"]}`, 'success')
					}
				}
			});
	}
	
	let buttonStyle = {
		border: "none",
		backgroundColor: "var(--accent-one-color)",
		color: "whitesmoke",
		transition: "all ease 0.25s",
		padding: "1rem",
		fontSize: "1.3rem",
		fontWeight: "bold",
		letterSpacing: "1px",
		display: "flex",
		gap: "1rem",
		textTransform: "none",
		"&:hover": {
			border: "none",
			color: "white",
			backgroundColor: "var(--accent-one-dark-color)",
		},
	};
	return (
		<>
			<Modal
				open={smsModal}
				onClose={() => setSmsModal(false)}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description">
				<div className="Modal">
					<div className="Modal-container">
					<h1>Enter SMS code</h1>
					<h4 onClick={handleNewCode} className="Modal-container-sms-link">Click for new code</h4>
					<form onSubmit={handleSubmit}>
						<TextField
							label="Code"
							name="sms_token"
							placeholder="Numbers only"
							className="Modal-login-input"
							variant="filled"
							fullWidth
							required
						/>
						{isLoading ? (
							<CircularProgress size={60} sx={{ color: "purple" }} />
						) : (
							<Button className="Modal-submitbtn" type="submit" sx={buttonStyle} variant="outlined">
								Verify
								<VerifiedRoundedIcon fontSize="large" />
							</Button>
						)}
						<p onClick={() => setSmsModal(false)} className="Modal-signup-text">
							Skip for now
						</p>
					</form>
					</div>
				</div>
			</Modal>
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
					<HashLink onClick={()=>setSmsModal(true)}  smooth to="/#landing">
						Verifyme
					</HashLink>
					{user.isAuthenticated ?  <button onClick={handleSignout}>{user.isVerified? <VerifiedRoundedIcon/> : ""}{user.profile.display_name}</button> : <button onClick={handleOpenModal}>Login / Register</button>}
					
				</div>
			</div>
		</>
	);
};
export default Navbar;
