import coinLogo from "../assets/mozam-logo.png";
import "../styles/MarketItem.scss";
import { useNavigate } from "react-router-dom";

const MarketItem = ({ data }) => {
	const navigate = useNavigate()
	return (
		<div onClick={()=>navigate(`/detail/${data.id}`)} className="MarketItem">
			<div className="MarketItem-image-container">
      
        {!data.image_url ?<img src={"https://static.dezeen.com/uploads/2019/02/new-zara-logo-hero-1.jpg"} alt={data.name} />:<img src={data.image_url} alt={data.name} />}
				
			</div>
			<div className="MarketItem-body">
				<div className="MarketItem-title">
					<h1>{data.name}</h1>
					<h2>{data.user.display_name}</h2>
				</div>
				<div className="MarketItem-price">
					<img src={coinLogo} alt="coin" />
					<p>
						{data.price} <span>MOZ</span>
					</p>
				</div>
			</div>
			<h3>View Detail</h3>
		</div>
	);
};
export default MarketItem;
