import "../styles/Footer.scss";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import EmailIcon from "@mui/icons-material/Email";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
const Footer = () => {
	return (
		<div className="Footer">
			<div className="Footer__icon-container">
				<a target="_blank" rel="noreferrer" href="https://google.com">
					<PhoneInTalkIcon />
				</a>
				<a target="_blank" rel="noreferrer" href="https://gmail.com">
					<EmailIcon />
				</a>
				<a target="_blank" rel="noreferrer" href="https://twitter.com">
					<TwitterIcon />
				</a>
				<a target="_blank" rel="noreferrer" href="https://www.facebook.com/">
					<FacebookIcon />
				</a>
				<a target="_blank" rel="noreferrer" href="https://www.instagram.com/">
					<InstagramIcon />
				</a>
			</div>
		</div>
	);
};
export default Footer;
