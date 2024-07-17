import { mainnet, sepolia } from 'wagmi/chains';
import { http, createConfig } from 'wagmi';
import { injected, metaMask, walletConnect } from 'wagmi/connectors';
import '@rainbow-me/rainbowkit/styles.css';

import {getDefaultConfig} from '@rainbow-me/rainbowkit';

const projectId = '2add90493a43a868d7afeed7f50c1860';

export const config = createConfig({
	autoConnect: false,
	chains: [mainnet, sepolia],
	connectors: [
		injected(),
		walletConnect({ projectId }),
		metaMask(),
	],
	transports: {
		[mainnet.id]: http(),
		[sepolia.id]: http(),
	}
});

export const RainbowKitConfig = getDefaultConfig({
	appName: "my web3 react project",
	projectId: projectId,
	chains: [mainnet, sepolia]
})