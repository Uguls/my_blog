import React, { useEffect, useState } from 'react';
import { getNFTList } from './Etherscan_API';
import { useAccount, useWriteContract } from 'wagmi';
import { abi } from '../../abi/abi';
import '../../styles/web3/GetToken.css'

const GetToken = () => {
	const { address } = useAccount();
	const [nftList, setNftList] = useState([]);
	const [selectedNFT, setSelectedNFT] = useState(null);
	const [transferAddress, setTransferAddress] = useState('');
	const [error, setError] = useState(null);

	const contractAddress = '0x5E28ab57D09C589ff5C7a2970d911178E97Eab81' // Cool Cats 컨트랙트 주소

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
		setSelectedNFT(nft);
	};

	const handleCancel = () => {
		setSelectedNFT(null);
		setTransferAddress('');
	};

	return (
		<div>
			<h2>NFT Data</h2>
			{nftList.length > 0 ? (
				<ul>
					{nftList.map((nft) => (
						<li key={`${nft.tokenID}-${nft.hash}`}>
							<div><strong>Token ID:</strong> {nft.tokenID}</div>
							<div><strong>Token Name:</strong> {nft.tokenName}</div>
							<div><strong>Token Symbol:</strong> {nft.tokenSymbol}</div>
							<div><strong>Timestamp:</strong> {new Date(nft.timeStamp * 1000).toLocaleString()}</div>
							{selectedNFT && selectedNFT.tokenID === nft.tokenID && selectedNFT.hash === nft.hash ? (
								<div>
									<input
										className={"nft_input"}
										type="text"
										placeholder="Recipient Address"
										value={transferAddress}
										onChange={(e) => setTransferAddress(e.target.value)}
									/>
									<p>
										<button className={"nft_send"}>전송</button>
									</p>
									<p>
									<button className={"nft_send"} onClick={handleCancel}>취소</button>
									</p>
								</div>
							) : (
								<button className={"nft_send"} onClick={() => handleTransferClick(nft)}>NFT 전송</button>
							)}
						</li>
					))}
				</ul>
			) : (
				<p>No NFT transfers found</p>
			)}
		</div>
	);
};

export default GetToken;
