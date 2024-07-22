import axios from "axios";

const apiKey = import.meta.env.VITE_ETHERSCANE_API

/*
transactionCount와 getNormalTransactionList의 수가 다른데 이는
transactionCount는 특정 주소가 발생시킨 트랜잭션(보낸 트랜잭션)의 수를 반환하고
txlist는 해당 주소와 관련된 모든 트랜잭션의 상세 목록을 제공하기 떄문에 두 값이 일치하지 않는다.
txlist는 주소가 보낸 트랜잭션뿐만 아니라, 주소가 받은 트랜잭션도 포함할 수 있다.
 */

/*
이더스캔 api를 사용하여 address를 인자로 받은 후 해당 주소의 TransactionCount를 반환하는 코드 작성
비동기로 처리 한후 promise객체를 반환하여 account컴포넌트에서 비동기로 처리
16진수로 받아오기 때문에 parseInt를 사용하여 10진수로 변환
 */
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

/*
이더스캔 api를 사용하여 address를 인자로 받은 후 해당 주소의 NormalTransactionList를 반환하는 코드 작성
비동기로 처리 한후 promise객체를 반환하여 TransactionByAddress컴포넌트에서 비동기로 처리
 */
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

export async function getNFTList(address) {
	const url =``

	try{

	} catch(e) {

	}
}