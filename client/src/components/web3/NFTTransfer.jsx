import { useWriteContract } from 'wagmi';
import abi from '../../abi/ERC721_ABI.json';

const useNFTTransfer = () => {
	const { writeContract } = useWriteContract();

	const transferNFT = async (contractAddress, fromAddress, toAddress, tokenId) => {
		try {
			await writeContract({
				abi: abi,
				address: contractAddress,
				functionName: 'transferFrom',
				args: [fromAddress, toAddress, tokenId],
			});
			return { success: true };
		} catch (error) {
			console.error('Error transferring NFT:', error);
			return { success: false, error };
		}
	};

	return { transferNFT };
};

export default useNFTTransfer;
