import React, { useEffect, useState } from 'react';
import { getNFTList } from './Etherscan_API';
import { useAccount } from 'wagmi';
import useNFTTransfer from "./NFTTransfer";
import '../../styles/web3/GetToken.css';

import GetNFTMetadata from "./GetNFTMetadata";
import NFTTransferModal from "../modal/NFTTransferModal";

const GetToken = () => {
	const { address } = useAccount();
	const [nftList, setNftList] = useState([]);
	const [selectedNFT, setSelectedNFT] = useState(null);
	const [transferAddress, setTransferAddress] = useState('');
	const [error, setError] = useState(null);

	// const contractAddress = '0x5E28ab57D09C589ff5C7a2970d911178E97Eab81'; // Cool Cats 컨트랙트 주소
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

	const handleTransferClick = (nft) => {
		// NFT 전송버튼에서 인자로 전달받은 nft객체를 selectedNFT에 할당
		setSelectedNFT(nft);
	};

	const handleCancel = () => {
		setSelectedNFT(null);
		setTransferAddress('');
	};

	// 전송버튼을 누르면 handleTransferClick에서 selectedNFT에 할당한 객체를 사용하여
	// transferNFT에 인수로 전달
	const handleTransfer = async () => {
		if (selectedNFT && transferAddress) {
			// console.log("selectedNFT : ", selectedNFT)
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

	// console.log("nftList : ", nftList)

	return (
		<div className={"block"}>
			<div className={"title"}>NFT List</div>
			{nftList.length > 0 ? (
				<ul>
					{nftList.map((nft) => (
						// nft.tokenId-nft.hash는 고유
						<div key={`${nft.tokenID}-${nft.hash}`}>
							<div><strong>Token ID:</strong> {nft.tokenID}</div>
							<div><strong>Token Name:</strong> {nft.tokenName}</div>
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
								// handleTransferClick에 nft를 인수로 전달
								<button className="nft_send" onClick={() => handleTransferClick(nft)}>NFT 전송</button>
							)}
						</div>
					))}
				</ul>
			) : (
				<p>No NFT transfers found</p>
			)}
			{error && <p className="error">Error: {error.message}</p>}
		</div>
	);
};

export default GetToken;
