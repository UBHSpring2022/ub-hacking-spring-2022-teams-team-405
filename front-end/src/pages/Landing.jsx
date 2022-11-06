import About from "../components/About.jsx";
import Foundry from "../assets/brands/Foundry.png";
import ACV from "../assets/brands/ACV.png";
import IQVIA from "../assets/brands/IQVIA.png";
import MTTech from "../assets/brands/MTTech.png";
import Qarik from "../assets/brands/Qarik.png";
import Wegmans from "../assets/brands/Wegmans.png";
import WillisTowers from "../assets/brands/WillisTowers.png";
import "../styles/Landing.scss";
const Landing = () => {
	return (
		<div className="Landing">
			<div className="Landing-main">
				<div id="landing-hero" className="Landing-main-text">
					<h1>
						Save The <span>Rare Fish</span>
					</h1>
					<p>
						Divert from tech extremism and hold your own Rare fish. Whether you plan to buy or sell Rare fish, Mozam is the
						right maketplace for you
					</p>
					<button>Marketplace</button>
				</div>

				<div className="Landing-main-brands">
					<img src={Foundry} alt="Foundry" />
					<img src={MTTech} alt="M&TTech" />
					<img src={ACV} alt="ACV" />
					<img src={IQVIA} alt="IQVIA" />
					<img src={Qarik} alt="Qarik" />
					<img src={Wegmans} alt="Wegmans" />
					<img src={WillisTowers} alt="WillisTowers" />
				</div>
			</div>

			<About />
			{/* name of component */}
			{/* Footer */}
		</div>
	);
};
export default Landing;
