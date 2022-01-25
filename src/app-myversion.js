import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";

import styled from "styled-components";

export const StyledButton = styled.button;


function App() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [feedback, setFeedback] = useState("");
  const [claimingNft, setClaimingNft] = useState(false);
  const claimNFTs = (_amount) => {
    _amount = document.getElementById("inputBox").value;
    if (_amount <= 0) {
      return;
    }
    setFeedback("Minting your Official TC1 NFT...");
    setClaimingNft(true);
    
    blockchain.smartContract.methods
      .preSaleMint(_amount)
      // ********
      // You can change the line above to
      // .whiteListMint(blockchain.account, _amount) if you want only whitelisted
      // users to be able to mint through your website!
      // And after you're done with whitelisted users buying from your website,
      // You can switch it back to .mint(blockchain.account, _amount).
      // ********
      .send({
        gasLimit: 285000 * _amount,
        to: "0x0b2CD470d9d97096a3F591F6B2D6f2907754d15f",
        from: blockchain.account,
        value: blockchain.web3.utils.toWei((0.0308 * _amount).toString(), "ether"),
      })
      .once("error", (err) => {
        console.log(err);
        setFeedback("Sorry, something went wrong. Check your transaction on Etherscan to find out what happened!");
        setClaimingNft(false);
      })
      .then((receipt) => {
        setFeedback(
          "CONGRATS! Your NFT successfully minted!"
        );
        setClaimingNft(false);
        dispatch(fetchData(blockchain.account));
      });
    /*
    blockchain.smartContract.methods
      .mint(blockchain.account, _amount)
      // ********
      // You can change the line above to
      // .whiteListMint(blockchain.account, _amount) if you want only whitelisted
      // users to be able to mint through your website!
      // And after you're done with whitelisted users buying from your website,
      // You can switch it back to .mint(blockchain.account, _amount).
      // ********
      .send({
        gasLimit: 285000 * _amount,
        to: "0x0567b8272df3fB4E3b0cF1f50FfdAA1A1BC766B8",
        from: blockchain.account,
        value: blockchain.web3.utils.toWei((0.0308 * _amount).toString(), "ether"),
      })
      .once("error", (err) => {
        console.log(err);
        setFeedback("Sorry, something went wrong. Check your transaction on Etherscan to find out what happened!");
        setClaimingNft(false);
      })
      .then((receipt) => {
        setFeedback(
          "CONGRATS! Your NFT successfully minted!"
        );
        setClaimingNft(false);
        dispatch(fetchData(blockchain.account));
      });
      */
  };

  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  };

  useEffect(() => {
    getData();
  }, [blockchain.account]);

  return (
    <div className="app-wrapper">
      <div className="inner">
        
        <div className="inner-2">
          <div className="inner-3">
          
            <div className="counter">
              Counter: {blockchain.account == null ? "   ?????" : ("   " + data.totalSupply)}/10000
            </div>
            
            <div>
            {Number(data.totalSupply) === 10000 ? (
              <>
                <div className="sale-ended">
                  The sale has ended.
                </div>
                {/* <s.SpacerSmall /> */}
                <div className="opensea-link">
                  Dont worry, you're not missing out! You can still get TC1 on{" "}
                  <a
                    // target={"_blank"}
                    href={"https://testnets.opensea.io/collection/"}
                  >
                    Opensea.io
                  </a>
                </div>
              </>
            ) : (
              <>

                <div className="feedback">
                  {feedback}
                </div>
                {/* <s.SpacerMedium /> */}
                {blockchain.account === "" ||
                blockchain.smartContract === null ? (
                  <div className="wallet-button">

                    <button className="wallet-connect-button"
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(connect());
                        getData();
                      }}
                    >
                      CONNECT
                    </button>
                    
                    {/* <s.TextDescription style={{textAlign: "center", fontSize: 30, marginBottom: 0, paddingBottom: 0}}>
                      <a href="https://google.com">Boo Crew NFT Smart Contract</a>
                    </s.TextDescription> */}
                    {blockchain.errorMsg !== "" ? (
                      <>
                        <div className="blockchain-error">
                          {blockchain.errorMsg}
                        </div>
                      </>
                    ) : null}
                  </div>
                ) : (
                  <div>
                    <form className="mint-form">
                    {/* I want  */}
                    <input
                    id="inputBox"
                    placeholder="#"
                    type="number"
                    min="1"
                    max="5"
                    style={{
                      fontFamily: "'Staatliches', cursive",
                      fontSize: 30,
                      textAlign: "center",
                      backgroundColor: "black",
                      color: "white",
                      borderWidth: 4,
                      borderColor: "white",
                      borderStyle: "solid",
                      borderRadius: 100,
                      paddingRight: 10,
                      // marginBottom: 20,
                      // paddingLeft: 0,
                      // marginLeft: 0,
                      width: 100,
                      }}
                    />
                    {/* Skulljunkies! */}
                    </form>
                    
                    <StyledButton
                      className="mint-button"
                      disabled={claimingNft ? 1 : 0}
                      onClick={(e) => {
                        e.preventDefault();
                        claimNFTs(1);
                        getData();
                      }}
                    >
                      {claimingNft ? "BUSY" : "MINT"}
                    </StyledButton>
                  </div>
                )}
              </>
            )}
            </div>
          
              
          </div>
          
          
        </div>
        
        
      </div>
    </div>
  );
}

export default App;
