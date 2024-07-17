import { useAccount, useDisconnect, useBalance } from 'wagmi';
import React from 'react';

export function Account() {
	const { address, addresses, chain, status } = useAccount();
	const { disconnect } = useDisconnect();

	return (
		<div>
			<div className={"Info"}>
				{status === 'connected' && (
					<>
						<div className={"block"}>
							<div className={"title"}>
								Account Info
							</div>
							<div className={"network"}>
								<div>ChainId: {chain?.id}</div>
								<div>Network: {chain?.name}</div>
								<div>현재 Address: {address}</div>
							</div>
						</div>
						<div className={"block"}>
							<div className={"title"}>
								Addressess
							</div>
							<div className={"addresses"}>
								{addresses?.map((addr, index) => (
									<AccountBalance key={index} address={addr}/>
								))}
							</div>
						</div>
					</>
				)}
				{status === 'disconnected' && (
					<div>Not connected</div>
				)}
			</div>
		</div>
	);
}

function AccountBalance({address}) {
	const {data: balanceData, isError, isLoading} = useBalance({
		address,
	});

	return (
		<div className={"address-info"}>
			<div className={"address"}>Address: {address}</div>
			{isLoading && <div>Loading balance...</div>}
			{isError && <div>Error fetching balance</div>}
			{balanceData && (
				<div className={"balance"}>
					Balance: {balanceData.formatted} {balanceData.symbol}
				</div>
			)}
		</div>
	);
}
