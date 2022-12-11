import React from "react";
import HeroSection from "../components/ui/HeroSection";
import NftCard from "../components/ui/Nft-card/NftCard";
import LiveAuction from "../components/ui/Live-auction/LiveAuction";

const Home = () => {
  return (
    <>
      <HeroSection />
      {/* <NftCard 
          title={"Title"}
          id={'token id'}
          creator={'Creator'}
          tags={'NEAR'}
          desc={'description'}
          is_selling={true}
          selling_price={'100'}
          imgUrl={'https://bafkreichchmzgjudgugeuryjuhk3gnkckzmlxekq4jaz42uysfwsdp5mlq.ipfs.nftstorage.link/'}
      /> */}
      <LiveAuction />
    </>
  );
};

export default Home;
