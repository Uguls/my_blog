// NFTTransferModal.js
import React from 'react';
import Modal from 'react-modal';

const NFTTransferModal = ({ isOpen, onRequestClose, nft, transferAddress, setTransferAddress, handleTransfer, handleCancel }) => {
	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			contentLabel="NFT Transfer Modal"
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
			<h2>NFT 전송</h2>
			{nft && (
				<>
					<div><strong>Token ID:</strong> {nft.tokenID}</div>
					<div><strong>Token Name:</strong> {nft.tokenName}</div>
				</>
			)}
			<input
				className="nft_input"
				type="text"
				placeholder="Recipient Address"
				value={transferAddress}
				onChange={(e) => setTransferAddress(e.target.value)}
				style={{ width: '100%', padding: '10px', margin: '10px 0' }}
			/>
			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<button className="nft_send" onClick={handleTransfer} style={{ padding: '10px 20px' }}>전송</button>
				<button className="nft_send" onClick={handleCancel} style={{ padding: '10px 20px' }}>취소</button>
			</div>
		</Modal>
	);
};

export default NFTTransferModal;
