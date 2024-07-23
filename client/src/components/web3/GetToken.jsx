import React, { useEffect, useState } from 'react';
import { getNFTList } from './Etherscan_API';
import { useAccount } from 'wagmi';
import useNFTTransfer from "./NFTTransfer";
import '../../styles/web3/GetToken.css';

import GetNFTMetadata from "./GetNFTMetadata";
import NFTDetailModal from "../modal/NFTDetailModal";

const GetToken = () => {
	const { address } = useAccount();
	const [nftList, setNftList] = useState([]);
	const [selectedNFT, setSelectedNFT] = useState(null);
	const [transferAddress, setTransferAddress] = useState('');
	const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
	const [error, setError] = useState(null);

	const { transferNFT } = useNFTTransfer();

	useEffect(() => {
		const fetchNFTList = async () => {
			if (address) {
				try {
					const list = await getNFTList(address);
					setNftList(list);
				} catch (e) {
					console.error('Error fetching NFT list', e);
				}
			}
		};

		fetchNFTList();
	}, [address]);

	const handleDetailClick = (nft) => {
		setSelectedNFT(nft);
		setIsDetailModalOpen(true);
	};

	const handleTransferClick = (nft) => {
		setSelectedNFT(nft);
	};

	const handleCancel = () => {
		setSelectedNFT(null);
		setTransferAddress('');
		setIsDetailModalOpen(false);
	};

	const handleTransfer = async () => {
		if (selectedNFT && transferAddress) {
			const result = await transferNFT(selectedNFT.contractAddress, address, transferAddress, selectedNFT.tokenID);
			if (result.success) {
				alert('NFT 전송 요청이 완료되었습니다. Metamask에서 컨펌을 눌러주세요');
				handleCancel();
			} else {
				setError(result.error);
			}
		} else {
			alert('Recipient Address를 입력해주세요.');
		}
	};

	return (
		<div className={"block"}>
			<div className={"title"}>NFT List</div>
			{nftList.length > 0 ? (
				<ul>
					{nftList.map((nft) => (
						<div key={`${nft.tokenID}-${nft.hash}`}>
							<div><strong>Token ID:</strong> {nft.tokenID}</div>
							<div><strong>Token Name:</strong> {nft.tokenName}</div>
							<button className="nft_send" onClick={() => handleDetailClick(nft)}>상세보기</button>
							{selectedNFT && selectedNFT.tokenID === nft.tokenID && selectedNFT.hash === nft.hash ? (
								<div>
									<input
										className="nft_input"
										type="text"
										placeholder="Recipient Address"
										value={transferAddress}
										onChange={(e) => setTransferAddress(e.target.value)}
									/>
									<p>
										<button className="nft_send" onClick={handleTransfer}>전송</button>
									</p>
									<p>
										<button className="nft_send" onClick={handleCancel}>취소</button>
									</p>
								</div>
							) : (
								<button className="nft_send" onClick={() => handleTransferClick(nft)}>NFT 전송</button>
							)}
						</div>
					))}
				</ul>
			) : (
				<p>No NFT transfers found</p>
			)}
			{error && <p className="error">Error: {error.message}</p>}

			<NFTDetailModal
				isOpen={isDetailModalOpen}
				onRequestClose={handleCancel}
				nft={selectedNFT}
			/>
		</div>
	);
};

export default GetToken;
