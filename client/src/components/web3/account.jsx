import React, { useEffect, useState } from 'react';
import { useAccount, useDisconnect, useBalance } from 'wagmi';
import { getTransactionCount } from "./Etherscan_API";
import TransactionsByAddress from "./TransactionsByAddress";
import GetToken from "./GetToken";

export function Account() {
	const {address, addresses, chain, status} = useAccount();
	const {disconnect} = useDisconnect();
	const [transactionCount, setTransactionCount] = useState(null);
	const [showTransactions, setShowTransactions] = useState(false);

	/*
	 * status와 address가 변경될 때 마다 지갑이 연결되어 있는지, address가 존재하는지를 판단한 후
	 * getTransactionCount를 사용하여 Transaction의 갯수를 불러온다.
	 * getTransactionCount는 promise객체를 반환하기 때문에 async와 await을 사용하여 비동기적으로 처리
	 */
	useEffect(() => {
		if (status === 'connected' && address) {
			const fetchTransactionCount = async () => {
				const count = await getTransactionCount(address);
				setTransactionCount(count);
			};

			fetchTransactionCount();
		}
	}, [status, address]);
	
	// 트랜잭션 버튼 토글 함수
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
									<AccountBalance key={index} address={addr}/>
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
									<TransactionsByAddress address={address}/>
								</div>
							)}
						</div>
						<GetToken/>
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
