import "../styles/Market.scss";
import coinLogo from "../assets/mozam-logo.png";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import MarketItem from "../components/MarketItem.jsx";
import { useEffect, useState } from 'react'
const Market = () => {
  const [fishData, setFishData] = useState([])
  const [filtered, setFiltered] = useState([])
	let handleChange = (e) => {
    let searchTerm = e.target.value.toLowerCase()
    setFiltered(fishData.filter(fish=>fish.name.toLowerCase().includes(searchTerm)))
	};
  
  useEffect(()=>{
    fetch("http://127.0.0.1:3000/products")
        .then(res => res.json())
        .then(data => {
          setFishData(data)
          setFiltered(data)
        });
    
  },[])
	return (
		<div className="Market">
			<div className="Market-title">
				<img src={coinLogo} alt="Coin" />
				<h1>Explore, Collect, and Sell Rare Fish</h1>
			</div>
			<div className="Market-searchbar-container">
				<SearchRoundedIcon fontSize="large" sx={{ position: "absolute", padding: "1rem" }} />
				<input placeholder="Search by name" className="Market-searchbar" onChange={handleChange} type="text" />
			</div>

			<div className="Market-map-container">{
        filtered.map(data=>(
          <MarketItem data={data} />
        ))}</div>
		</div>
	);
};
export default Market;
