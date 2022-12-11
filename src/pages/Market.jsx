import React, { useState, useEffect } from "react";
import CommonSection from "../components/ui/Common-section/CommonSection";
import NftCard from "../components/ui/Nft-card/NftCard";
import MyNftCard from "../components/ui/My-nft-card/MyNftCard";
import { Container, Row, Col } from "reactstrap";
import {utils} from "near-api-js"

import "../styles/market.css";

const Market = () => {
  const [data, setData] = useState([]);

  const handleCategory = () => { };

  const handleItems = () => { };

  useEffect(async () => {
    try {
      let data = await window.contractMarket.get_sales(
        {
          from_index: 0,
          limit: 30
        }
      );
      let mapItemData = data.map(async item => {
        let itemData = await window.contractNFT.nft_token({ token_id: item.token_id });

        return {
          ...item,
          itemData,
        }
      });
      let dataNew = await Promise.all(mapItemData);
      console.log("Data market: ", dataNew);
      setData(dataNew);
    } catch (e) {
      console.log(e);
    }
  }, []);

  // ====== SORTING DATA BY HIGH, MID, LOW RATE =========
  const handleSort = (e) => {
    const filterValue = e.target.value;

    if (filterValue === "high") {
      const filterData = data.filter((item) => parseFloat(utils.format.formatNearAmount(item.use_condition)) >= 5
      );
      setData(filterData);
    }

    if (filterValue === "mid") {
      const filterData = data.filter(
        (item) => parseFloat(utils.format.formatNearAmount(item.use_condition)) >= 3 && parseFloat(utils.format.formatNearAmount(item.use_condition)) < 5
      );
      setData(filterData);
    }

    if (filterValue === "low") {
      const filterData = data.filter(
        (item) => parseFloat(utils.format.formatNearAmount(item.use_condition)) <3
      );
      setData(filterData);
    }
  };

  return (
    <>
      <CommonSection title={"MarketPlace"} />

      <section style={{marginTop: 70, marginBottom: 70}}>
        <Container>
          <Row>
            {data?.map((item) => (
              ((item.owner_id !== window.accountId) ? 
                (
                  <>
                    <Col lg="3" md="4" sm="6" className="mb-4" key={item.token_id}>
                      <NftCard item={item} />
                    </Col>
                  </>
                )
                :
                (
                  <>
                    <Col lg="3" md="4" sm="6" className="mb-4" key={item.token_id}>
                        <MyNftCard
                          item={{
                            title: item.itemData.metadata.title,
                            id: item.token_id,
                            creator: item.owner_id,
                            tags: item.itemData.metadata.extra,
                            desc: item.itemData.metadata.description,
                            is_selling: true,
                            selling_price: item.sale_conditions,
                            imgUrl: item.itemData.metadata.media,
                          }}
                        />
                    </Col> 
                  </>
                )
              )
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Market;
