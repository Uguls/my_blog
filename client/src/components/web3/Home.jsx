import React, { useEffect, useState } from 'react';
import { hooks, metaMask } from '../../util/connectors/metaMask';
import Web3 from 'web3';
import '../../styles/web3/Home.css';

const { useChainId, useAccounts, useIsActivating, useIsActive, useProvider, useENSNames } = hooks;

const Home = () => {
	const chainId = useChainId();
	const accounts = useAccounts();
	const isActivating = useIsActivating();
	const isActive = useIsActive();
	const provider = useProvider();
	const ENSNames = useENSNames(provider);
	const [error, setError] = useState(undefined);
	const [balance, setBalance] = useState(null);
	const [networkName, setNetworkName] = useState('');

	useEffect(() => {
		void metaMask.connectEagerly().catch(() => {
			console.debug('Failed to connect eagerly to MetaMask');
		});
	}, []);

	const handleToggleConnect = () => {
		setError(undefined); // clear error state

		if (isActive) {
			metaMask.deactivate ? metaMask.deactivate() : metaMask.resetState();
		} else if (!isActivating) {
			metaMask.activate().catch((e) => {
				metaMask.resetState();
				setError(e);
			});
		}
	};

	// Fetch balance when account changes
	useEffect(() => {
		if (isActive && accounts && accounts.length > 0) {
			const web3 = new Web3(provider);

			web3.eth.getBalance(accounts[0])
				.then(balance => {
					setBalance(web3.utils.fromWei(balance, 'ether'));
				})
				.catch(error => {
					console.error('Error fetching balance:', error);
					setBalance(null);
				});
		} else {
			setBalance(null);
		}
	}, [isActive, accounts, provider]);

	useEffect(() => {
		if (chainId) {
			let name = 'Unknown';
			switch (chainId) {
				case 1:
					name = 'Mainnet';
					break;
				case 3:
					name = 'Ropsten Testnet';
					break;
				case 11155111:
					name = 'Sepolia Testnet';
					break;
				default:
					name = `Chain ID: ${chainId}`;
			}
			setNetworkName(name);
		} else {
			setNetworkName('');
		}
	}, [chainId]);

	return (
		<>
			<div className="title">
				<h1>Web3-React</h1>
			</div>
			<div className="container">
				<div className="info">
					<div className="title">{metaMask.constructor.name.toUpperCase()}</div>
					<div>Status - {error?.message ? `Error: ${error.message}` : isActive ? 'Connected' : 'Disconnected'}</div>
					<div>Address - {accounts?.[0] ?? 'No Account Detected'}</div>
					<div>ChainId - {chainId ?? 'No Chain Connected'}</div>
					<div>Network - {networkName}</div>
					<div>Balance - {balance !== null ? `${balance} ETH` : 'Loading...'}</div>
				</div>
			</div>
			<div className="connect-button">
				<button onClick={handleToggleConnect} disabled={isActivating}>
					{isActive ? 'Disconnect' : 'Connect'}
				</button>
			</div>
		</>
	);
};

export default Home;
