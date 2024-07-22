import React, { useEffect, useState } from 'react';
import { getNFTList } from './Etherscan_API';
import { useAccount } from 'wagmi';

const GetToken = () => {
	const { address } = useAccount();
	const [nftList, setNftList] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchNFTList = async () => {
			if (address) {
				try {
					const list = await getNFTList(address);
					setNftList(list);
				} catch (e) {
					setError('Error fetching NFT list');
				}
			}
		};

		fetchNFTList();
	}, [address]);

	console.log(nftList);

	return (
		<div>
			<h2>NFT Data</h2>
			{error && <p>{error}</p>}
			{nftList.length > 0 ? (
				<ul>
					{nftList.map((nft) => (
						<li key={nft.hash}>
							<div><strong>Token ID:</strong> {nft.tokenID}</div>
							<div><strong>Token Name:</strong> {nft.tokenName}</div>
							<div><strong>Token Symbol:</strong> {nft.tokenSymbol}</div>
							<div><strong>Timestamp:</strong> {new Date(nft.timeStamp * 1000).toLocaleString()}</div>
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
