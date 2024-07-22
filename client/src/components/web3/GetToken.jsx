import React, {useEffect, useState} from 'react';
import {useAccount, useReadContracts} from "wagmi";
import CoolCatsABI from '../../abi/coolCats.json'

const contractAddress = '0x5E28ab57D09C589ff5C7a2970d911178E97Eab81'

const GetToken = () => {
	const {address} = useAccount();
	const [metadata, setMetadata] = useState(null)

	const contact = {
		address: contractAddress,
		abi: CoolCatsABI,
	};

	const {data, isError, isLoading} = useReadContracts({
		contracts: [
			{
				...contact,
				functionName: 'balanceOf',
				args: [address]
			},
			{
				...contact,
				functionName: 'tokenURI',
				args: [1]
			}
		]
	});

	useEffect(() => {
		if (data && data[1].result) {
			fetch(data[1].result)
				.then(response => response.json())
				.then(json => setMetadata(json))
				.catch(error => console.error('Error: ', error))
		}
	}, [data]);

	if (isLoading || !metadata) return <div>Loading...</div>;
	if (isError) return <div>Error occurred!!!</div>

	// console.log("data", data)

	return (
		<div>
			NFT DATA
			<div>NFT 보유량 : {data[0].result.toString()} 개</div>
			NFT METADATA
			<img src={metadata.google_image} alt={metadata.name} />
			<p>Name: {metadata.name}</p>
			<p>Description: {metadata.description}></p>
		</div>
	);
};

export default GetToken;