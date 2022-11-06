import "../styles/Detail.scss";
import { useEffect, useState } from "react";
const Detail = () => {
    const [product, setProduct] = useState({})
    const [seller, setSeller] = useState({})
    useEffect(() => {
      fetch(`http://localhost:3000/products/${window.location.href.match(/\d+$/)[0]}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
      })
      .then((response) => response.json())
      .then((result) => {
        // console.log("result", result);
        if(result.error){
            // FAILED
        }else{
            // success
            setProduct(result)
            console.log("result", result);
            setSeller(result.user)
        }
        });
    }, [])
    
	return (
		<div className="detail">
			<div className="detail-image">
                <img src={product.image_url} alt="product" />
                <div className="detail-image-child">
                    <p>Description:</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis fermentum volutpat velit sollicitudin aliquam. Proin turpis dolor, suscipit ut eros quis, commodo dictum urna. </p>
                </div>
            </div>
            <div className="detail-details">
                <div>
                    <h1>{product.name}</h1>
                    <p>{seller.display_name}</p>
                    <p>{product.price}</p>
                </div>
                <button className="first">Message Seller</button>
                <button className="second">Buy</button>
            </div>
		</div>
	);
};
export default Detail;
