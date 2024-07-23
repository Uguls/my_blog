import React, { useEffect, useState } from 'react';
import { useReadContract } from 'wagmi';
import axios from 'axios';
import abi from '../../abi/ERC721_ABI.json';

const GetNftMetadata = ({tokenID}) => {
	const [metadata, setMetadata] = useState(null);
	const [isMetadataLoading, setIsMetadataLoading] = useState(false);
	const [metadataError, setMetadataError] = useState(null);

	const contractAddress = '0x5E28ab57D09C589ff5C7a2970d911178E97Eab81'; // Cool Cats 컨트랙트 주소
	const tokenId = 234;

	const { data: tokenURI, isLoading: isTokenURILoading, isError: isTokenURIError } = useReadContract({
		abi,
		address: contractAddress,
		functionName: 'tokenURI',
		args: [tokenID]
	});

	useEffect(() => {
		if (tokenURI) {
			const fetchMetadata = async () => {
				setIsMetadataLoading(true);
				try {
					const response = await axios.get(tokenURI);
					setMetadata(response.data);
				} catch (error) {
					setMetadataError(error);
				} finally {
					setIsMetadataLoading(false);
				}
			};

			fetchMetadata();
		}
	}, [tokenURI]);

	// console.log(metadata)

	if (isTokenURILoading || isMetadataLoading) return <p>Loading...</p>;
	if (isTokenURIError) return <p>Error loading token URI</p>;
	if (metadataError) return <p>Error loading metadata</p>;

	return (
		<div>
			<h1>{metadata?.name}</h1>
			{metadata?.image && <img src={metadata.image} alt={metadata.name} />}
			<p>{metadata?.description}</p>
		</div>
	);
};

export default GetNftMetadata;
