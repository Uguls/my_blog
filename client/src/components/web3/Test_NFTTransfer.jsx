import React from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import abi from '../../abi/coolCats.json'

const TestNftTransfer = () => {
	const { address } = useAccount();
	const { writeContract } = useWriteContract();

	return (
		<div>
			<button
				onClick={() =>
					writeContract({
						abi: abi,
						address: '0x5E28ab57D09C589ff5C7a2970d911178E97Eab81', // 스마트컨트랙트 주소
						functionName: 'transferFrom',
						args: [
							'0x8Bf43C30A731aA1acF336c43032338b2aE94719A', // 보내는 주소
							'0xEA35927d6F8a4A08DA92F4200Dce7a71fB29dda8', // 받는 주소
							234n
						],
					})
				}
			>
				NFT 전송 테스트 버튼
			</button>
		</div>
	);
};

export default TestNftTransfer;
