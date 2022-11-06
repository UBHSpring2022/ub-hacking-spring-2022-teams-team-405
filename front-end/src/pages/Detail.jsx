import "../styles/Detail.scss";
import { useEffect, useState } from "react";
import contract from './nft.json';
import { ethers } from 'ethers';
import { useNavigate } from "react-router-dom";

const contractAddress = "0x355638a4eCcb777794257f22f50c289d4189F245";
const abi = contract.abi;
const Detail = () => {
    const navigate = useNavigate();
    const [product, setProduct] = useState({})
    const [seller, setSeller] = useState({})
    const [currentAccount, setCurrentAccount] = useState(null);

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
            
  const checkWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have Metamask installed!");
      return;
    } else {
      console.log("Wallet exists! We're ready to go!")
    }

    const accounts = await ethereum.request({ method: 'eth_accounts' });

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account: ", account);
      setCurrentAccount(account);
    } else {
      console.log("No authorized account found");
    }
  }

  const connectWalletHandler = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      alert("Please install Metamask!");
    }

    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      console.log("Found an account! Address: ", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (err) {
      console.log(err)
    }
  }

  const mintNftHandler = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const nftContract = new ethers.Contract(contractAddress, abi, signer);

        console.log("Initialize payment");
        let nftTxn = await nftContract.mintNFTs(1, { value: ethers.utils.parseEther("0.000000001") });

        console.log("Mining... please wait");
        await nftTxn.wait();

        alert(`Mined, see transaction: https://goerli.etherscan.io/tx/${nftTxn.hash}`);
        let product_id = window.location.href.match(/\d+$/)[0]
        fetch('http://localhost:3000/complete-order', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "super-token": localStorage.getItem("token")
            },
            body: JSON.stringify({
                product_id
            }),
        })
        .then((response) => response.json())
        .then((result) => {
            // console.log("result", result);
            if(result.error){
                // FAILED
            }else{
                // success
                navigate('/market')
                console.log("result", result);
            }
        });

      } else {
        console.log("Ethereum object does not exist");
      }

    } catch (err) {
      console.log(err);
    }
  }

  const connectWalletButton = () => {
    return (
      <button onClick={connectWalletHandler} className='cta-button connect-wallet-button'>
        Connect Wallet
      </button>
    )
  }

  const mintNftButton = () => {
    return (
      <button onClick={mintNftHandler} className='cta-button mint-nft-button'>
        Mint NFT
      </button>
    )
  }

  useEffect(() => {
    checkWalletIsConnected();
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
                <button className="second" onClick={()=> handleBuy()}>Buy</button>
                {currentAccount ? mintNftButton() : connectWalletButton()}
            </div>
		</div>
	);
};
export default Detail;
