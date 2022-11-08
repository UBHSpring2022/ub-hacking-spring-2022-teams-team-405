import coinLogo from "../assets/mozam-logo.png"
import Divider from '@mui/material/Divider';

const About = () => {
  return (
    <div className="About">
      <h1 id="About" className="About-title"> Who are we <span className="About-questionmark">?</span></h1>
      <p>Mozam is a marketplace for sellers and buyers to exchange 
rare fish with anonymity. Our mission is to serve our customers 
with the best service possible while protecting their identity   </p>
<Divider flexItem></Divider>

      <h1 className="About-title"> How we handle <span className="About-underlines">Transactions:</span></h1>
      <img src={coinLogo} alt="Coin" />
      <p>All transactions will be made via our latest cryptocurrency, Mozam 
coin. With blockchain technology, we are able to insure that 
all customers can buy and sell Rare fish with anonymity. 
We want to ensure privacy for all customers! </p>
<Divider flexItem></Divider>

    </div>
  );
}
export default About;