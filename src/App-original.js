import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import * as s from "./styles/globalStyles";
import styled from "styled-components";
import i1 from "./assets/images/mintkeeper.jpg";
import silver from "./assets/images/testimage.png";
import gold from "./assets/images/testimage.png";
import diamond from "./assets/images/testimage.png";
import newbanner from "./assets/images/newbannere.png"

export const StyledButton = styled.button`
  padding: 10px;
  border-radius: 50px;
  border: solid;
  background-color: black;
  padding: 10px;
  fontFamily: Staatliches, cursive;
  padding-left: 15px;
  padding-right: 15px;
  font-weight: bold;
  font-size: 40px;
  color: white;
  cursor: pointer;
  box-shadow: 0px 6px 0px -2px black;
  -webkit-box-shadow: 0px 6px 0px -2px black;
  -moz-box-shadow: 0px 6px 0px -2px black;
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    color: #white;
  }
  :hover {
    transition-duration: .4s;
    color: #02F702;
  }
`;

export const ResponsiveWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: stretched;
  align-items: stretched;
  width: 100%;
  @media (min-width: 767px) {
    flex-direction: row;
  }
`;

export const StyledImg = styled.img`
  width: 300px;
  height: 44px;
  @media (min-width: 767px) {
    width: 600px;
    height: 80px;
  }
  transition: width 0.5s;
  transition: height 0.5s;
`;

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
    <s.Screen style={{ backgroundColor: "var(--black)", fontSize: 40 }}>
      <s.Container flex={1} ai={"center"} style={{ padding: 24, backgroundColor: "black"}}>
        <s.TextTitle
          style={{
          display: "flex",
          flexDirection: "row",
          textAlign: "left",
          fontSize: 40,
          fontWeight: "bold",
          paddingRight: 10,
          margin: 0,
          
          borderStyle: "solid",
          borderColor: "white",
          borderWidth: 0,
          paddingLeft: 30,
          paddingRight: 30,
          paddingTop: 30,
          
          borderRadius: 20,
          textAlign: "center",
          justifySelf: "center",
          justifyContent: "center",
          color:"#7C3AED",
          background: "black",
          }}
        >
          <a href="https://google.com"><StyledImg alt={"none"}
          src={newbanner}
          style={{textAlign: "center"}}></StyledImg></a>
        </s.TextTitle>
        <s.SpacerMedium />
        <ResponsiveWrapper flex={1} style={{ padding: 24, paddingTop: 0 }}>
          <s.Container flex={1} jc={"center"} ai={"center"} style={{paddingTop: 0, flexDirection: "column"}}>
          <s.TextTitle
              style={{
              color: "white",
              textAlign: "center",
              maxWidth: 600,
              fontSize: 25,
              fontWeight: "bold",
              borderStyle: "solid",
              borderColor: "black",
              paddingBottom: 30}}>
                 Lorem ipsum dolor sit amet,
                 consectetur adipiscing elit,
                 sed do eiusmod tempor incididunt
                 ut labore et dolore magna aliqua.
                 Ut enim ad minim veniam, quis nostrud
                 exercitation ullamco laboris nisi ut
                 aliquip ex ea commodo consequat. Duis
                 aute irure dolor in reprehenderit.
              </s.TextTitle>
            {/* <a href="https://skulljunkiesnft.com/"><StyledImg alt={"Mintkeeper"} src={i1} style={{paddingTop: 0, borderStyle: "solid", borderColor: "black", borderWidth: 0,
                    borderRadius: 0 }}/></a> */}
            <s.TextTitle
              style={{ textAlign: "center", fontSize: 40, fontWeight: "bold", borderStyle: "solid", borderColor: "white",
              borderWidth: 5,
              paddingLeft: 100,
              paddingRight: 100,
              borderRadius: 10,
              paddingTop: 5,
              paddingBottom: 5,
              marginTop: 5,
              marginBottom: 20,
              background: "black",
              color: "white",
              }}
            > Counter:<br/>
              {blockchain.account == null ? "   ?????" : ("   " + data.totalSupply)}/1000
            </s.TextTitle>
            <s.Container
            flex={1}
            jc={"center"}
            ai={"center"}
            style={{
              backgroundColor: "black",
              padding: 24,
              paddingTop: 20,
              borderStyle: "solid",
              borderColor: "white",
              borderWidth: 0,
              borderRadius: 20,
              fontSize: 40,
              maxWidth: 700,
              maxHeight: 1500 }}
          >
            {Number(data.totalSupply) == 1000 ? (
              <>
                <s.TextTitle style={{ textAlign: "center" }}>
                  The sale has ended.
                </s.TextTitle>
                {/* <s.SpacerSmall /> */}
                <s.TextDescription style={{ fontSize: 30, textAlign: "center", color: "white" }}>
                  Dont worry, you're not missing out! You can still get TC1 on{" "}
                  <a
                    // target={"_blank"}
                    href={"https://testnets.opensea.io/collection/"}
                  >
                    Opensea.io
                  </a>
                </s.TextDescription>
              </>
            ) : (
              <>
                {/* <s.TextTitle style={{ textAlign: "center", fontSize: 30 }}>
                  1 DOODL costs .01 ETH.
                </s.TextTitle>
                <s.SpacerXSmall />
                <s.TextDescription style={{ textAlign: "center", fontSize: 30 }}>
                  Excluding gas fees.
                </s.TextDescription>
                <s.SpacerSmall /> */}
                <s.TextDescription style={{ textAlign: "center", fontSize: 40, color: "white" }}>
                  {feedback}
                </s.TextDescription>
                {/* <s.SpacerMedium /> */}
                {blockchain.account === "" ||
                blockchain.smartContract === null ? (
                  <s.Container ai={"center"} jc={"center"}>
                    <s.TextDescription style={{
                      textAlign: "center",
                      fontSize: 25,
                      marginBottom: 0,
                      color: "white",
                      maxWidth: 600 }}>
                    Lorem ipsum dolor sit amet,
                 consectetur adipiscing elit,
                 sed do eiusmod tempor incididunt
                 ut labore et dolore magna aliqua.
                 Ut enim ad minim veniam, quis nostrud
                 exercitation ullamco laboris nisi ut
                 aliquip ex ea commodo consequat. Duis
                 aute irure dolor in reprehenderit.
                    <s.SpacerSmall/>
                    <s.SpacerSmall/>
                      <div style={{flex: "display"}}>
                        <StyledImg alt={"silver"} src={silver}
                        style={{
                          paddingTop: 0,
                          borderStyle: "solid",
                          borderColor: "black",
                          borderWidth: 3,
                          borderRadius: 0,
                          height: 100,
                          width: 100,
                          margin: "2px"
                           }}/>
                        <StyledImg alt={"silver"} src={silver}
                        style={{
                          paddingTop: 0,
                          borderStyle: "solid",
                          borderColor: "black",
                          borderWidth: 3,
                          borderRadius: 0,
                          height: 100,
                          width: 100,
                          margin: "2px"
                           }}/>
                        <StyledImg alt={"gold"} src={gold}
                        style={{
                          paddingTop: 0,
                          borderStyle: "solid",
                          borderColor: "black",
                          borderWidth: 3,
                          borderRadius: 0,
                          height: 100,
                          width: 100,
                          margin: "2px"
                           }}/>
                        <StyledImg alt={"diamond"} src={diamond}
                        style={{
                          paddingTop: 0,
                          borderStyle: "solid",
                          borderColor: "black",
                          borderWidth: 3,
                          borderRadius: 0,
                          height: 100,
                          width: 100,
                          margin: "2px"
                           }}/>
                        <StyledImg alt={"diamond"} src={diamond}
                        style={{
                          paddingTop: 0,
                          borderStyle: "solid",
                          borderColor: "black",
                          borderWidth: 3,
                          borderRadius: 0,
                          height: 100,
                          width: 100,
                          margin: "2px"
                           }}/>

                    </div>
                    {/* <div style={{display: "flex", flexDirection: "column",
                        borderStyle: "solid",
                          borderColor: "#D5B300",
                          borderWidth: 5,
                          borderRadius: 10,
                          backgroundColor: "black" }}>
                      <bold style={{color: "#C0C0C0"}}>Silver:  5 / 10,000</bold> <br/>
                      <bold style={{color: "#D5B300"}}>Gold:  3 / 10,000</bold> <br/>
                      <bold style={{color: "#B9F2FF"}}>Diamond:  1 / 10,000</bold></div> */}
                    </s.TextDescription>
                    {/* <s.SpacerSmall /> */}
                    {/* <s.TextDescription style={{ textAlign: "center", fontSize: 30, marginBottom: 0 }}>
                      Connect to the Skulljunkies Minter!
                    </s.TextDescription> */}
                    {/* <s.SpacerSmall /> */}
                    <StyledButton
                      style={{
                        fontFamily:"'Staatliches', cursive;",
                        // background: "black",
                        // color: "white",
                        // borderStyle: "solid",
                        // borderColor: "#7C3AED",
                        borderWidth: 10,
                        borderRadius: 90,
                        fontSize: 60,
                        marginTop: 30

                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(connect());
                        getData();
                      }}
                    >
                      CONNECT
                    </StyledButton>
                    <s.SpacerLarge />
                    {/* <s.TextDescription style={{textAlign: "center", fontSize: 30, marginBottom: 0, paddingBottom: 0}}>
                      <a href="https://google.com">Boo Crew NFT Smart Contract</a>
                    </s.TextDescription> */}
                    {blockchain.errorMsg !== "" ? (
                      <>
                        <s.SpacerSmall />
                        <s.TextDescription style={{ textAlign: "center", fontSize: 50}}>
                          <bold style={{color: "white"}}>{blockchain.errorMsg}</bold>
                        </s.TextDescription>
                      </>
                    ) : null}
                  </s.Container>
                ) : (
                  <s.Container ai={"center"} jc={"center"} fd={"row"} style={{
                    marginTop: 0,
                    paddingTop: 0,
                    color: "white"}}>
                    <form>
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
                    <s.SpacerSmall/>
                    <StyledButton
                     style={{fontFamily: "'Staatliches', cursive;", fontSize: 50}}
                      disabled={claimingNft ? 1 : 0}
                      onClick={(e) => {
                        e.preventDefault();
                        claimNFTs(1);
                        getData();
                      }}
                    >
                      {claimingNft ? "BUSY" : "MINT"}
                    </StyledButton>
                  </s.Container>
                )}
              </>
            )}
          </s.Container>
          <s.TextTitle
              style={{
              color: "white",
              textAlign: "left",
              borderStyle: "solid",
              borderColor: "white",
              borderWidth: 5,
              borderRadius: 20,
              maxWidth: 600,
              fontSize: 70,
              paddingLeft: 30,
              paddingRight: 30,
              paddingTop: 30,
              lineHeight: .6,
              paddingBottom: 30
              }}>
                 Road Map
                 <br/><br/>
                 <text style={{fontSize: 35}}>
                   <text style={{fontSize: 50 }}>25%</text> - Lorem ipsum dolor sit amet,
                 consectetur adipiscing elit,
                 sed do eiusmod tempor incididunt
                   <br/><br/>
                   <text style={{fontSize: 50}}>50%</text> - Lorem ipsum dolor sit amet,
                 consectetur adipiscing elit,
                 sed do eiusmod tempor incididunt
                   <br/><br/>
                   <text style={{fontSize: 50}}>100%</text> - Lorem ipsum dolor sit amet,
                 consectetur adipiscing elit,
                 sed do eiusmod tempor incididunt
                 </text>
              </s.TextTitle>
              <s.TextTitle
              style={{
              color: "white",
              textAlign: "left",
              borderStyle: "solid",
              borderColor: "white",
              borderWidth: 5,
              borderRadius: 20,
              marginTop: 50,
              maxWidth: 600,
              fontSize: 70,
              paddingLeft: 30,
              paddingRight: 30,
              paddingTop: 30,
              lineHeight: .6,
              paddingBottom: 30
              }}>
                 F.A.Q.
                 <br/><br/>
                 <text style={{fontSize: 35}}>
                 Lorem ipsum dolor sit amet,
                 consectetur adipiscing elit,
                 sed do eiusmod tempor incididunt
                   <br/><br/>
                   <text style={{fontSize: 50, color: "white"}}>
                     Question 1?
                     </text>
                   <br/>
                   lorem ipsum
                   <br/><br/>
                   <text style={{fontSize: 50, color: "white"}}>
                     Question 2?</text>
                   <br/>
                   lorem ipsum
                   <br/><br/>
                   <text style={{fontSize: 50, color: "white"}}>
                     Question 3?</text>
                   <br/>
                   lorem ipsum
                   <br/><br/>
                   <text style={{fontSize: 50, color: "white"}}>
                     Question 4?</text>
                   <br/>
                   lorem ipsum
                   <br/><br/>
                   <text style={{fontSize: 50, color: "white"}}>
                     Question 5?</text>
                   <br/>
                   lorem ipsum
                   <br/><br/>
                   
                   
                 </text>
              </s.TextTitle>
          </s.Container>
          {/* <s.SpacerMedium /> */}
          
        </ResponsiveWrapper>
        <s.SpacerSmall />
        <s.Container jc={"center"} ai={"center"} style={{ width: "70%" }}>
          <s.TextDescription style={{ textAlign: "center", fontSize: 40}}>
                      <a
                      href="https://rinkeby.etherscan.io/address/0x94976dD8df588ce2aB902697EE2fa4A42ADADf5e"
                      style={{
                        textDecoration: "none",
                        color: "white",
                        fontSize: 20,
                      }}
                      >Smart Contract Link</a>
          </s.TextDescription>
          <s.SpacerSmall />
          {/* <s.TextDescription style={{ textAlign: "center", fontSize: 10, color: "white" }}>
            asdf
          </s.TextDescription> */}
        </s.Container>
      </s.Container>
    </s.Screen>
  );
}

export default App;
