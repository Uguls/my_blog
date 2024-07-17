import {
	useSendTransaction,
	useWaitForTransactionReceipt
} from "wagmi";
import {parseEther} from "viem";
import {border, Link} from "@chakra-ui/react";
import {Account} from "./account";
import {useAccount} from "wagmi";
import React from "react";

const SendEther = () => {
	const {status} = useAccount()

	const {
		data: hash,
		error,
		isPending,
		sendTransaction
	} = useSendTransaction()

	async function submit(e) {
		e.preventDefault();
		const formData = new FormData(e.target);
		const to = formData.get('address');
		const value = formData.get('value');
		sendTransaction({to, value: parseEther(value)})
	}

	const {isLoading: isConfirming, isSuccess: isConfirmed} = useWaitForTransactionReceipt({hash,})

	return (
		<div>
			{status === 'connected' && (
				<div className={"container"}>
					<div className={"Account_Info"}>
						<Account/>
					</div>
					<form className={"SendEther"} onSubmit={submit}>
						<input className={"Adress"} name="address" placeholder="Address" required/>
						<input className={"value"} name="value" placeholder="Eth" required/>
						<button className={"send_button"} disabled={isPending} type="submit">
							{isPending ? '트랜잭션 생성중...' : '트랜잭션 전송'}
						</button>
						{hash && <div>Transaction Hash: {hash}</div>}
						{hash && <Link href={`https://sepolia.etherscan.io/tx/{hash}`}>이더스캔에서 보기</Link>}
						{isConfirming && <div>트랜잭션 컨펌중...</div>}
						{isConfirmed && <div>트랜잭션 컨펌됨</div>}
						{error && (
							<div>Error: {error.message}</div>
						)}
					</form>
				</div>
			)}
			{status === 'disconnected' && (
				<div>Not connected</div>
			)}
		</div>
	)
}

export default SendEther