import React, { useEffect, useState } from 'react';
import { useAccount, useDisconnect, useBalance } from 'wagmi';
import { getTransactionCount } from "./Etherscan_API";
import TransactionsByAddress from "./TransactionsByAddress";

export function Account() {
	const { address, addresses, chain, status } = useAccount();
	const { disconnect } = useDisconnect();
	const [transactionCount, setTransactionCount] = useState(null);
	const [showTransactions, setShowTransactions] = useState(false);

	useEffect(() => {
		if (status === 'connected' && address) {
			const fetchTransactionCount = async () => {
				const count = await getTransactionCount(address);
				setTransactionCount(count);
			};

			fetchTransactionCount();
		}
	}, [status, address]);

	const handleToggleTransactions = () => {
		setShowTransactions(prevState => !prevState);
	};

	return (
		<div className={"Account_Info"}>
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
								<div>TransactionCount: {transactionCount}</div>
							</div>
						</div>
						<div className={"block"}>
							<div className={"title"}>
								Addressess
							</div>
							<div className={"addresses"}>
								{addresses?.map((addr, index) => (
									<AccountBalance key={index} address={addr} />
								))}
							</div>
						</div>
						<div className={"block"}>
							<div className={"title"}>
								Transactions
							</div>
							<button className={"showButton"} onClick={handleToggleTransactions}>
								{showTransactions ? "Hide Transactions" : "Show Transactions"}
							</button>
							{showTransactions && (
								<div className={"transactions"}>
									<TransactionsByAddress address={address} />
								</div>
							)}
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

function AccountBalance({ address }) {
	const { data: balanceData, isError, isLoading } = useBalance({
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
