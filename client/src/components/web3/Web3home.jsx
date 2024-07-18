import '../../styles/web3/Home.css'; // CSS 파일 임포트
import React, { useEffect, useState } from 'react';
import SendEther from "./SendEther";
import {useAccount} from "wagmi";
import {Account} from "./account";
import {WalletOptions} from "./wallet-options";
import { ConnectButton } from "@rainbow-me/rainbowkit";

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
				<Account/>
				<SendEther/>
			</div>
		</div>
	);
};

export default Web3home;