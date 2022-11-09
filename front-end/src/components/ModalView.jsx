import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import FilledInput from "@mui/material/FilledInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import VpnKeyRoundedIcon from "@mui/icons-material/VpnKeyRounded";
import SailingRoundedIcon from "@mui/icons-material/SailingRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import "../styles/Modal.scss";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser, verifyUser } from "../state/user.js";
import pickachuMining from "../assets/pickachu.gif";
import Swal from "sweetalert2";

const ModalView = ({ setOpenModal, openModal, isMining }) => {
	const dispatch = useDispatch();

	const [switchLogin, setSwitchLogin] = useState(true);
	const [verifySMS, setVerifySMS] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [form, setForm] = useState({});
	let handleLogin = (e) => {
		e.preventDefault();
		setIsLoading(true);
		fetch("http://127.0.0.1:3000/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ ...form, phone: form.email }),
		})
			.then((res) => {
				setIsLoading(false);
				return res.json();
			})
			.then((data) => {
				if (data["error"]) {
					Swal.fire(data["error"], data["message"], "error");
				} else {
					localStorage.setItem("token", data["token"]);
					dispatch(setUser(data.user));
					setOpenModal(false);
				}
			});
	};
	let handleSignup = (e) => {
		e.preventDefault();
		setIsLoading(true);
		fetch("http://127.0.0.1:3000/signup", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(form),
		})
			.then((res) => res.json())
			.then((data) => {
				setIsLoading(false);
				if (data["error"]) {
					Swal.fire(data["error"], data["message"], "error");
				} else {
					if (data["data"]) {
						dispatch(setUser(data.data.user));
						setVerifySMS(true);
						localStorage.setItem("token", data.data.token);
					} else {
						dispatch(setUser(data.user));
						setVerifySMS(true);
						localStorage.setItem("token", data.token);
					}
				}
			});
	};
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
	let handleChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	};
	let handleVerify = (e) => {
		e.preventDefault();
		setIsLoading(true);

		fetch("http://127.0.0.1:3000/verify", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"super-token": form.sms_token,
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
					setOpenModal(false);
				}
			});
	};
	useEffect(() => {
		setForm({});
	}, [switchLogin, verifySMS]);
	return (
		<>
			<Modal
				open={openModal}
				onClose={() => setOpenModal(false)}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description">
				<div className="Modal">
					<div className="Modal-container">
						{isMining ? (
							<>
								<h1>Minting NFT ...</h1>
								<img src={pickachuMining} alt="Mining" />
								<CircularProgress fontSize="Large" sx={{ color: "purple" }} />
							</>
						) : verifySMS ? (
							<>
								<h1>Enter SMS code</h1>
								<form onSubmit={handleVerify}>
									<TextField
										onChange={handleChange}
										label="Code"
										name="sms_token"
										value={form.sms_token || ""}
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
									<p onClick={() => {
										setVerifySMS(false)
										setOpenModal(false)
										}} className="Modal-signup-text">
										Skip for now
									</p>
								</form>
							</>
						) : switchLogin ? (
							<>
								<h1>Login</h1>
								<form onSubmit={handleLogin}>
									<TextField
										onChange={handleChange}
										autoComplete="email"
										label="Email / Phone"
										name="email"
										value={form.email || ""}
										placeholder="Email / Phone"
										className="Modal-login-input"
										variant="filled"
										fullWidth
										required
									/>
									<FormControl fullWidth className="Modal-login-input" variant="filled">
										<InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
										<FilledInput
											onChange={handleChange}
											required
											value={form.password || ""}
											name="password"
											id="filled-adornment-password"
											autoComplete="password"
											type={showPassword ? "text" : "password"}
											endAdornment={
												<InputAdornment position="end">
													<IconButton
														sx={{ color: "var(--accent-two-color)" }}
														aria-label="toggle password visibility"
														onClick={() => setShowPassword(!showPassword)}
														edge="end">
														{showPassword ? (
															<VisibilityOff sx={{ color: "var(--accent-one-color)" }} />
														) : (
															<Visibility sx={{ color: "var(--main-color)" }} />
														)}
													</IconButton>
												</InputAdornment>
											}
										/>
									</FormControl>
									{isLoading ? (
										<CircularProgress size={60} sx={{ color: "purple" }} />
									) : (
										<Button className="Modal-submitbtn" type="submit" sx={buttonStyle} variant="outlined">
											Login
											<VpnKeyRoundedIcon fontSize="large" />
										</Button>
									)}
									<div className="Modal-switch">
										<span>Dont have a account ? </span>
										<p onClick={() => setSwitchLogin(false)} className="Modal-signup-text">
											Sign Up
										</p>
									</div>
								</form>
							</>
						) : (
							<>
								<h1>Sign Up</h1>
								<form onSubmit={handleSignup}>
									<TextField
										onChange={handleChange}
										value={form.display_name || ""}
										label="Display name"
										name="display_name"
										placeholder="Display name"
										className="Modal-login-input"
										variant="filled"
										fullWidth
										required
									/>
									<TextField
										onChange={handleChange}
										value={form.email || ""}
										autoComplete="email"
										label="Email"
										name="email"
										placeholder="Email"
										className="Modal-login-input"
										variant="filled"
										fullWidth
										required
									/>
									<TextField
										onChange={handleChange}
										autoComplete="phone"
										label="Phone"
										name="phone"
										value={form.phone || ""}
										placeholder="Phone"
										className="Modal-login-input"
										variant="filled"
										fullWidth
										required
									/>
									<FormControl fullWidth className="Modal-login-input" variant="filled">
										<InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
										<FilledInput
											onChange={handleChange}
											value={form.password || ""}
											required
											name="password"
											id="filled-adornment-password"
											autoComplete="password"
											type={showPassword ? "text" : "password"}
											endAdornment={
												<InputAdornment position="end">
													<IconButton
														sx={{ color: "var(--accent-two-color)" }}
														aria-label="toggle password visibility"
														onClick={() => setShowPassword(!showPassword)}
														edge="end">
														{showPassword ? (
															<VisibilityOff sx={{ color: "var(--accent-one-color)" }} />
														) : (
															<Visibility sx={{ color: "var(--main-color)" }} />
														)}
													</IconButton>
												</InputAdornment>
											}
										/>
									</FormControl>
									{isLoading ? (
										<CircularProgress size={60} sx={{ color: "purple" }} />
									) : (
										<Button className="Modal-submitbtn" type="submit" sx={buttonStyle} variant="outlined">
											Sign Up
											<SailingRoundedIcon fontSize="large" />
										</Button>
									)}
									<div className="Modal-switch">
										<span>Already have a account ? </span>
										<p onClick={() => setSwitchLogin(true)} className="Modal-signup-text">
											Log In
										</p>
									</div>
								</form>
							</>
						)}
					</div>
				</div>
			</Modal>
		</>
	);
};
export default ModalView;
