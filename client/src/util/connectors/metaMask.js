import { initializeConnector } from '@web3-react/core';
import { MetaMask } from '@web3-react/metamask';

const [metaMask, hooks] = initializeConnector((actions) => new MetaMask({ actions }));

export { metaMask, hooks };