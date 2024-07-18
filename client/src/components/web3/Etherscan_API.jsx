import axios from "axios";

const apiKey = import.meta.env.VITE_ETHERSCANE_API

export async function getTransactionCount (address) {
	const url = `https://api-sepolia.etherscan.io/api?module=proxy&action=eth_getTransactionCount&address=${address}&tag=latest&apikey=${apiKey}`;

	try {
		const res = await axios.get(url);
		const transactionCount = res.data.result;
		const parseCount = parseInt(transactionCount, 16);

		return parseCount
	} catch (e) {
		console.error(e);
		return null;
	}
}

export async function getNormalTransactionList(address, startBlock = 0, endBlock = 99999999, page = 0, offset = 10, sort = 'asc') {
	const url = `https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=${startBlock}&endblock=${endBlock}&page=${page}&offset=${offset}&sort=${sort}&apikey=${apiKey}`;

	try {
		const res = await axios.get(url);
		const txlist = res.data.result;

		return txlist
	} catch (e) {
		console.error(e);
		return null
	}
}