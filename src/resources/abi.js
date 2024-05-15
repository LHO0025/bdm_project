
export const ABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_projectIndex",
				"type": "uint256"
			}
		],
		"name": "contributeToProject",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_nickname",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_description",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_title",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_expirationDate",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_targetAmount",
				"type": "uint256"
			}
		],
		"name": "createProject",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllProjects",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "index",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "creator",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "nickname",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "title",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "creationDate",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "expirationDate",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "targetAmount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "currentAmount",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "withdrawn",
						"type": "bool"
					}
				],
				"internalType": "struct Crowdfunding.Project[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "projects",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "creator",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "nickname",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "creationDate",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "expirationDate",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "targetAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "currentAmount",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "withdrawn",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_projectIndex",
				"type": "uint256"
			}
		],
		"name": "reclaimMoney",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "validate",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_projectIndex",
				"type": "uint256"
			}
		],
		"name": "withdrawMoney",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	}
]