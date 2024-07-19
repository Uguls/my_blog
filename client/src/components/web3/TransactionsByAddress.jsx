import React, {useEffect, useState} from 'react';
import {getNormalTransactionList} from "./Etherscan_API";
import "../../styles/web3/TransactionsByAddress.css"

const TransactionsByAddress = ({address}) => {
	const [normalTransactions, setNormalTransactions] = useState([])

	useEffect(() => {
		// getNormalTransactionList가 promise객체를 반환하기 때문에 async await으로 결과값을 기다린 후 받아온 객체를 list에 저장
		// list로 받아온 객체를 normalTransactions에 저장
		// address가 바뀔때 마다 실행
		const fetchTransactionList = async () => {
			const list = await getNormalTransactionList(address);
			setNormalTransactions(list);
		}

		fetchTransactionList();
	}, [address]);

	console.log(normalTransactions)

	return (
		<div className={"transactions"}>
			{/*삼항연산자를 이용하여 normalTransactions.length가 1이상이 아닐 경우 즉 아무것도 없을경우*/}
			{/*No normal transactions found를 표시한다*/}
			{/***
			 이더스캔 API의 경우 getTransactionsList의 종류가 2가지로 나뉜다
			 1. Normal Transaction
				  NormalTransaction이란 계정에서 계정으로 이더를 옮기거나 하는 직접 사용자에 의해 생성된 Transaction
			 2. Internal Transaction
			    InternalTransaction이란 스마트컨트랙트등에 의해 만들어진 Transaction을 의미한다.
			 ***/}
			{normalTransactions.length > 0 ? (
				<ul>
					{/*normalTransactions를 map을 사용하여 tx에 하나 하나 할당하고*/}
					{/*Hash, Block, From, To, Value, GasUsed, timestamp를 표시*/}
					{/*TimeStamp의 경우 Date를 사용하여 한국시간으로 변경한다.*/}
					{normalTransactions.map((tx) => (
						<li className={"transactions_each"} key={tx.hash}>
							<div>Hash: {tx.hash}</div>
							<div>Block: {tx.blockNumber}</div>
							<div>From: {tx.from}</div>
							<div>To: {tx.to}</div>
							<div>Value: {tx.value} WEI</div>
							<div>Gas Used: {tx.gasUsed}</div>
							<div>Timestamp: {new Date(tx.timeStamp * 1000).toLocaleString()}</div>
						</li>
					))}
				</ul>
			) : (
				<div>No normal transactions found</div>
			)}
		</div>
	);
};

export default TransactionsByAddress;