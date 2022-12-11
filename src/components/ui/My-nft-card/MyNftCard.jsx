import React, { useState } from "react";
import { Link } from "react-router-dom";
import { utils } from "near-api-js";
import "./my-nft-card.css";
import ModalListNft from "../Modal-list-nft/ModalListNFT";
import getConfig from "../../../config";
import { Row, Col } from "reactstrap";
import { EyeTwoTone, HeartTwoTone} from "@ant-design/icons";

const nearConfig = getConfig("development");
const nft_contract_id = nearConfig.nftContractName;
console.log("contract: ", nft_contract_id);

const MyNftCard = (props) => {
	const {
		title,
		id,
		imgUrl,
		creator,
		desc,
		is_selling,
		selling_price,
	} = props.item;

	const [showListModal, setShowListModal] = useState(false);

	async function removeSale(nft_contract_id, token_id) {
		try {
			await window.contractMarket.remove_sale(
				{
					nft_contract_id: nft_contract_id,
					token_id: token_id,
				},
				30000000000000,
				1
			);
		} catch (e) {
			console.log("Error: ", e);
		}
	}

	function handelCancel() {
		removeSale(nft_contract_id, id);
	}

	return (
		<div className="single__nft__card">
			<div className="nft__content ">
				<Row>
					<Col>
						<h5 className="nft__title" style={{ marginBottom: 7 }}>
							<Link
								style={{ color: "white", fontSize: 20 }}
								to={`/market/${id}`}
							>
								{title}
							</Link>
						</h5>
					</Col>
				</Row>
			</div>

			<img
				src={imgUrl}
				alt="nft thumbnail"
				className="d-inline-flex tw-rounded-full image-shadow tw-w-14 tw-h-14 "
				style={{
					width: 250,
					height: 250,
				}}
			/>

			<div
				className="contract_des"
				style={{
					height: 50,
					border: "0.3px solid #ffa500",
					padding: "5px 10px",
					marginTop: 10,
					borderRadius: 15,
				}}
			>
				<p
					style={{
						height: 50,
						color: "#c7bfbf",
						fontSize: 13,
						textOverflow: "ellipsis",
						overflow: "auto",
						maxHeight: "40ch",
						maxWidth: "40ch",
					}}
				>
					{desc}
				</p>
			</div>

			<div className=" d-flex align-items-center gap-2 single__nft-seen">
				<EyeTwoTone twoToneColor="#ffa500"/> <span>53</span>
				<HeartTwoTone twoToneColor="#eb2f96" /> <span>34</span>
			</div>

			{is_selling && (
				<div
					className="creator__info-wrapper d-flex gap-3"
					style={{ marginTop: 10 }}
				>
					<div className="creator__info w-100 d-flex align-items-center justify-content-between">
						<div>
							<h6>price</h6>
							<p style={{color: 'orange'}}>
								{utils.format.formatNearAmount(selling_price)}
								<span style={{color:'#b1b3b1'}}> NEAR</span>
							</p>
						</div>
					</div>
				</div>
			)}

			{is_selling ? (
				<div
					className=" d-inline-flex align-items-center justify-content-between"
					style={{ marginLeft: 75 }}
				>
					<button
						className="bid__btn d-flex align-items-center gap-1"
						style={{ background: "#e250e5", border: "none" }}
						onClick={handelCancel}
					>
						<i className="ri-close-circle-line"></i> Delist
					</button>
				</div>
			) : (
				<div className=" mt-3 d-inline-flex align-items-center ">
					<button
						className="bid__btn d-flex align-items-center gap-1"
						onClick={() => setShowListModal(true)}
					>
						List
					</button>
					{showListModal && (
						<ModalListNft
							setShowListModal={setShowListModal}
							token_id={id}
						/>
					)}
				</div>
			)}
		</div>
	);
};

export default MyNftCard;
