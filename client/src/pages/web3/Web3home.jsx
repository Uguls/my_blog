import '../../styles/web3/Home.css'; // CSS 파일 임포트
import React, { useEffect, useState } from 'react';
import SendEther from "../../components/web3/SendEther";
import {useAccount} from "wagmi";
import {Account} from "../../components/web3/account";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import GetNFTMetadata from "../../components/web3/GetNFTMetadata";

function ConnectWallet() {
	const { isConnected } = useAccount();
	if (isConnected) return <Account />
}

const Web3home = () => {
	return (
		<div>
			<div className={"title"}>
				<h1>Web3-React</h1>
			</div>
			<div className={"connect-button"}>
				<ConnectButton/>
			</div>
			<div className={"container"}>
				{/*<GetNFTMetadata/>*/}
				<Account/>
				<SendEther/>
			</div>
		</div>
	);
};

export default Web3home;
