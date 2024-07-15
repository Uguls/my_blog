// import React, { useState } from 'react';
// import Web3 from 'web3';
// import { useWeb3React } from '@web3-react/core';
// import { Button } from "@chakra-ui/react";
// const web3 = new Web3(window.ethereum);
// import {useNavigate} from "react-router-dom";
//
// const SendEther = () => {
// 	const { account, active } = useWeb3React();
// 	const [toAccount, setToAccount] = useState('');
// 	const [amount, setAmount] = useState('');
// 	const [trxHash, setTrxHash] = useState('');
//
// 	const nav = useNavigate()
//
// 	const handleSend = async () => {
//
// 		try {
// 			const transaction = {
// 				to: '0xEA35927d6F8a4A08DA92F4200Dce7a71fB29dda8',
// 				from: account,
// 				value: web3.utils.toWei('0.01', 'ether'),
// 				gas: 21000, // 기본 가스 한도 설정
// 			};
//
// 			await web3.eth.sendTransaction(transaction)
// 				.on('receipt', (receipt) => {
// 					setTrxHash(receipt.transactionHash)
// 					alert('이더 전송이 완료되었습니다.');
// 				})
// 				.on('error', (error) => {
// 					console.error('트랜잭션 전송 중 오류 발생:', error);
// 				});
// 		} catch (error) {
// 			console.error('Error sending transaction:', error);
// 		}
// 	};
//
// 	const handleSendButton = async () => {
// 		try {
// 			const trx = {
// 				to: toAccount,
// 				from: account,
// 				value: web3.utils.toWei(amount, 'ether'),
// 				gas: 21000,
// 			}
//
// 			await web3.eth.sendTransaction(trx)
// 				.on('receipt', (receipt)=>{
// 					setTrxHash(receipt.transactionHash)
// 					setToAccount('');
// 					setAmount('');
// 					alert('이더 전송이 완료되었습니다.')
// 				})
// 				.on('error', (error) => {
// 					console.error('트랜잭션 전송 중 오류 발생:', error);
// 				});
//
// 		} catch (error){
// 			console.error('Error sending transaction:', error);
// 		}
// 	}
//
// 	return (
// 		<div className={"SendEther"}>
// 			{active ? (
// 				<div className="container">
// 					<input
// 						className={"input"}
// 						type="text"
// 						placeholder={"금액"}
// 						value={amount}
// 						onChange={(e) => setAmount(e.target.value)}
// 					/>
// 					<input
// 						className={"input"}
// 						type="text"
// 						placeholder={"보낼계좌"}
// 						value={toAccount}
// 						onChange={(e) => setToAccount(e.target.value)}
// 					/>
// 					<Button className={"button"} onClick={handleSendButton}>이더 전송</Button>
// 					<Button className={"button dev"} onClick={handleSend}>Dev계좌로 0.01 이더 전송</Button>
// 					{trxHash &&
// 						<div className="trx_hash">
// 							<p className={"trx_title"}>Transaction : </p>
// 							{trxHash}
// 							<Button className={"button"} onClick={()=>window.open(`https://sepolia.etherscan.io/tx/${trxHash}`)}>이더스캔에서 확인</Button>
// 						</div>}
//
// 				</div>
// 			) : ''}
// 		</div>
// 	);
// };
//
// export default SendEther;