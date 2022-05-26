import React, { useEffect, useState } from "react";
import NFTCard from "../components/NFTCard";
import { useMoralisWeb3Api } from "react-moralis";
import { MoralisProvider } from "react-moralis";

const API_ID = process.env.NEXT_PUBLIC_MORALIS_APP_ID;
const SERVER_URL = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL;

export default function Home() {
  const [NFTs, setNFT] = useState({});
  const Web3Api = useMoralisWeb3Api();

  const NFTMetadata = {};

  const fetchAllTokenIds = async () => {
    const options = {
      address: "0xe7348A569c4b9419e2a913b70e12D300aA718CEe",
      chain: "mumbai",
    };
    NFTMetadata = await Web3Api.token.getAllTokenIds(options);
    console.log(NFTMetadata);
    Object.keys(NFTMetadata).forEach((key) => {
      if (key === "result") {
        NFTMetadata = NFTMetadata[key];
        setNFT(NFTMetadata);
      }
    });
    console.log(NFTMetadata);
  };

  useEffect(() => {
    fetchAllTokenIds();
  }, []);

  return (
    <MoralisProvider appId={API_ID} serverUrl={SERVER_URL}>
      <div className="flex flex-col bg-transparent items-center sm:h-[100vh] md:h-[100vh]">
        <div className="flex flex-col items-center items-center">
          {<NFTCard NFTs={NFTs}></NFTCard>}
        </div>
        <div>
          <p className="text-5xl mt-10 font-bold mb-8">
            CREATIVITY + INTERACTION
          </p>
        </div>
      </div>
    </MoralisProvider>
  );
}
