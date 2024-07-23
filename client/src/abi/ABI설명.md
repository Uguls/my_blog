# 함수 목록
## balanceOf 특정 주소가 소유한 토큰의 수를 반환
## ownerOf 특정 토큰 ID의 소유자 주소를 반환
## transfer 토큰을 `_to` 주소로 전송
## transferFrom 승인된 주소에서 토큰을 `_to` 주소로 전송
## approve `_approved` 주소에게 `_tokenId` 토큰에 대한 전송 권한을 부여
## getApproved 특정 토큰 ID에 대해 승인된 주소를 반환
## setApprovalForAll `_operator` 주소에게 모든 토큰에 대한 전송 권한을 부여하거나 철회
## isApprovedForAll `_operator` 주소가 `_owner` 주소의 모든 토큰에 대해 승인되었는지 여부를 반환
## totalSupply 총 발행된 토큰의 수를 반환
## tokenByIndex 인덱스를 기반으로 토큰 ID를 반환
## tokenOfOwnerByIndex 소유자 주소와 인덱스를 기반으로 토큰 ID를 반환
## tokenURI 특정 토큰 ID의 메타데이터 URI를 반환
## Transfer 토큰이 전송될 때 발생하는 이벤트
## Approval 토큰에 대한 전송 권한이 부여될 때 발생하는 이벤트
## ApprovalForAll 모든 토큰에 대한 전송 권한이 부여되거나 철회될 때 발생하는 이벤트

### balanceOf 특정 주소가 소유한 토큰의 수를 반환
{
"constant": true,
"inputs": [
{
"name": "_owner",
"type": "address"
}
],
"name": "balanceOf",
"outputs": [
{
"name": "balance",
"type": "uint256"
}
],
"type": "function"
},

### ownerOf 특정 토큰 ID의 소유자 주소를 반환
{
"constant": true,
"inputs": [
{
"name": "_tokenId",
"type": "uint256"
}
],
"name": "ownerOf",
"outputs": [
{
"name": "owner",
"type": "address"
}
],
"type": "function"
},

### transfer 토큰을 `_to` 주소로 전송
{
"constant": false,
"inputs": [
{
"name": "_to",
"type": "address"
},
{
"name": "_tokenId",
"type": "uint256"
}
],
"name": "transfer",
"outputs": [],
"type": "function"
},

### transferFrom 승인된 주소에서 토큰을 `_to` 주소로 전송
{
"constant": false,
"inputs": [
{
"name": "_from",
"type": "address"
},
{
"name": "_to",
"type": "address"
},
{
"name": "_tokenId",
"type": "uint256"
}
],
"name": "transferFrom",
"outputs": [],
"type": "function"
},

### approve `_approved` 주소에게 `_tokenId` 토큰에 대한 전송 권한을 부여
{
"constant": false,
"inputs": [
{
"name": "_approved",
"type": "address"
},
{
"name": "_tokenId",
"type": "uint256"
}
],
"name": "approve",
"outputs": [],
"type": "function"
},

### getApproved 특정 토큰 ID에 대해 승인된 주소를 반환
{
"constant": true,
"inputs": [
{
"name": "_tokenId",
"type": "uint256"
}
],
"name": "getApproved",
"outputs": [
{
"name": "approved",
"type": "address"
}
],
"type": "function"
},

### setApprovalForAll `_operator` 주소에게 모든 토큰에 대한 전송 권한을 부여하거나 철회
{
"constant": false,
"inputs": [
{
"name": "_operator",
"type": "address"
},
{
"name": "_approved",
"type": "bool"
}
],
"name": "setApprovalForAll",
"outputs": [],
"type": "function"
},

### isApprovedForAll `_operator` 주소가 `_owner` 주소의 모든 토큰에 대해 승인되었는지 여부를 반환
{
"constant": true,
"inputs": [
{
"name": "_owner",
"type": "address"
},
{
"name": "_operator",
"type": "address"
}
],
"name": "isApprovedForAll",
"outputs": [
{
"name": "approved",
"type": "bool"
}
],
"type": "function"
},

### totalSupply 총 발행된 토큰의 수를 반환
{
"constant": true,
"inputs": [],
"name": "totalSupply",
"outputs": [
{
"name": "total",
"type": "uint256"
}
],
"type": "function"
},

### tokenByIndex 인덱스를 기반으로 토큰 ID를 반환
{
"constant": true,
"inputs": [
{
"name": "_index",
"type": "uint256"
}
],
"name": "tokenByIndex",
"outputs": [
{
"name": "tokenId",
"type": "uint256"
}
],
"type": "function"
},

### tokenOfOwnerByIndex 소유자 주소와 인덱스를 기반으로 토큰 ID를 반환
{
"constant": true,
"inputs": [
{
"name": "_owner",
"type": "address"
},
{
"name": "_index",
"type": "uint256"
}
],
"name": "tokenOfOwnerByIndex",
"outputs": [
{
"name": "tokenId",
"type": "uint256"
}
],
"type": "function"
},

### tokenURI 특정 토큰 ID의 메타데이터 URI를 반환
{
"constant": true,
"inputs": [
{
"name": "_tokenId",
"type": "uint256"
}
],
"name": "tokenURI",
"outputs": [
{
"name": "uri",
"type": "string"
}
],
"type": "function"
},

### Transfer 토큰이 전송될 때 발생하는 이벤트
{
"inputs": [
{
"indexed": true,
"name": "_from",
"type": "address"
},
{
"indexed": true,
"name": "_to",
"type": "address"
},
{
"indexed": true,
"name": "_tokenId",
"type": "uint256"
}
],
"name": "Transfer",
"type": "event"
},

### Approval 토큰에 대한 전송 권한이 부여될 때 발생하는 이벤트
{
"inputs": [
{
"indexed": true,
"name": "_owner",
"type": "address"
},
{
"indexed": true,
"name": "_approved",
"type": "address"
},
{
"indexed": true,
"name": "_tokenId",
"type": "uint256"
}
],
"name": "Approval",
"type": "event"
},

### ApprovalForAll 모든 토큰에 대한 전송 권한이 부여되거나 철회될 때 발생하는 이벤트
{
"inputs": [
{
"indexed": true,
"name": "_owner",
"type": "address"
},
{
"indexed": true,
"name": "_operator",
"type": "address"
},
{
"indexed": false,
"name": "_approved",
"type": "bool"
}
],
"name": "ApprovalForAll",
"type": "event"
}
