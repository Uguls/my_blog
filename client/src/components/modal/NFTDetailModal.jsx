// NFTDetailModal.js
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import GetNftMetadata from "../web3/GetNFTMetadata";

Modal.setAppElement('#root'); // root 엘리먼트를 설정합니다.

const NFTDetailModal = ({ isOpen, onRequestClose, nft }) => {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (nft) {
			setIsLoading(false);
		} else {
			setIsLoading(true);
		}
	}, [nft]);

	if (!nft) return null; // nft가 없을 때는 모달을 렌더링하지 않습니다.

	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			contentLabel="NFT Detail Modal"
			style={{
				content: {
					top: '50%',
					left: '50%',
					right: 'auto',
					bottom: 'auto',
					marginRight: '-50%',
					transform: 'translate(-50%, -50%)',
					padding: '20px',
					maxWidth: '500px',
					width: '100%',
				},
				overlay: {
					backgroundColor: 'rgba(0, 0, 0, 0.75)',
				},
			}}
		>
			<h2>NFT 상세 정보</h2>
			{isLoading ? (
				<div>Loading...</div>
			) : (
				<>
					<GetNftMetadata tokenID={nft.tokenID} />
					<div><strong>Token ID:</strong> {nft.tokenID}</div>
					<div><strong>Token Name:</strong> {nft.tokenName}</div>
					<div><strong>Token Symbol:</strong> {nft.tokenSymbol}</div>
					<div><strong>Timestamp:</strong> {new Date(nft.timeStamp * 1000).toLocaleString()}</div>
					<div><strong>From:</strong> {nft.from}</div>
					<div><strong>To:</strong> {nft.to}</div>
				</>
			)}
			<button onClick={onRequestClose} style={{ marginTop: '20px', padding: '10px 20px' }}>닫기</button>
		</Modal>
	);
};

export default NFTDetailModal;
