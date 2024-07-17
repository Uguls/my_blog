import React, { useState, useEffect } from 'react';
import { useConnect } from 'wagmi';

export function WalletOptions() {
	const { connectors, connect } = useConnect();

	// 마지막 3개를 제외한 연결자만 가져오기
	const filteredConnectors = connectors.slice(0, -3);

	return filteredConnectors.map((connector) => (
		<WalletOption
			key={connector.id}
			connector={connector}
			onClick={() => connect({ connector })}
		/>
	));
}

function WalletOption({ connector, onClick }) {
	const [ready, setReady] = useState(false);

	useEffect(() => {
		(async () => {
			const provider = await connector.getProvider();
			setReady(!!provider);
		})();
	}, [connector]);

	return (
		<button className={"connect-button"} disabled={!ready} onClick={onClick}>
			{connector.name}
		</button>
	);
}
