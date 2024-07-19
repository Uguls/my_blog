import {
	useSendTransaction,
	useWaitForTransactionReceipt
} from "wagmi";
import {parseEther} from "viem";
import {border, Link} from "@chakra-ui/react";
import {useAccount} from "wagmi";
import React from "react";

const SendEther = () => {
	const {status} = useAccount()

	// 비구조화 할당을 사용하여 data로 받아온 프로퍼티를 hash라는 이름의 프로퍼티이름으로 변환
	// wagmi라이브러리의 useSendTransaction훅 사용
	const {
		data: hash,
		error,
		isPending,
		sendTransaction
	} = useSendTransaction()

	// form에서 받은 formData, to, value를 사용하여 sendTransaction사용
	// sendTransaction은 useSendTransaction훅에서 받아온 프로퍼티
	// sendTransaction으로 보낼때 value는 parseEther를 사용하여 변환 후 전송
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
				<div></div>
			)}
		</div>
	)
}

export default SendEther