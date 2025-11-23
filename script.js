// Ensure DOM is loaded
window.addEventListener("DOMContentLoaded", () => {

    let provider;
    let signer;
    let userAddress;

const btn = document.getElementById("connectWalletBtn");
    const walletStatus = document.getElementById("walletStatus"); // optional display

    if (!connectBtn) {
        console.error("Connect Wallet button not found!");
        return;
    }

    connectBtn.addEventListener("click", async () => {
        try {
            if (!window.ethereum) {
                alert("MetaMask not detected. Please install MetaMask.");
                return;
            }

            provider = new ethers.BrowserProvider(window.ethereum);
            const accounts = await provider.send("eth_requestAccounts", []);
            signer = await provider.getSigner();

            if (!accounts || accounts.length === 0) {
                console.error("No accounts found");
                return;
            }

            userAddress = accounts[0];

            // Shorten address like 0x1234...abcd
            const shortAddress = userAddress.slice(0, 6) + "..." + userAddress.slice(-4);

            connectBtn.textContent = "Connected: " + shortAddress;

            if (walletStatus) {
                walletStatus.textContent = "Wallet: " + userAddress;
            }

            console.log("Wallet connected:", userAddress);

        } catch (err) {
            console.error("Wallet connection error:", err);
            alert("Failed to connect wallet: " + (err.message || err));
        }
    });
});
const contractAddress = "0x6c7100b1cfa8cf5e006bd5c1047fa917ddedf56e"; 
const abi = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "chosenNumber",
				"type": "uint256"
			}
		],
		"name": "buyTicket",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "closeRound",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "emergencyWithdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "winnerIndex",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "usePseudoRandom",
				"type": "bool"
			}
		],
		"name": "pickWinner",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint16",
				"name": "_f",
				"type": "uint16"
			}
		],
		"name": "setFeeBps",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_ticketPriceWei",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_maxTickets",
				"type": "uint256"
			},
			{
				"internalType": "uint16",
				"name": "_feeBps",
				"type": "uint16"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "roundId",
				"type": "uint256"
			}
		],
		"name": "RoundClosed",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "roundId",
				"type": "uint256"
			}
		],
		"name": "RoundStarted",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_m",
				"type": "uint256"
			}
		],
		"name": "setMaxTickets",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_p",
				"type": "uint256"
			}
		],
		"name": "setTicketPrice",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "roundId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "ticketIndex",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "buyer",
				"type": "address"
			}
		],
		"name": "TicketBought",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "roundId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "winner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "payout",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "fee",
				"type": "uint256"
			}
		],
		"name": "WinnerPaid",
		"type": "event"
	},
	{
		"stateMutability": "payable",
		"type": "fallback"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	},
	{
		"inputs": [],
		"name": "feeBps",
		"outputs": [
			{
				"internalType": "uint16",
				"name": "",
				"type": "uint16"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "maxTickets",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
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
		"name": "paid",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "roundId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
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
		"name": "roundOpen",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "ticketPrice",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
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
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "tickets",
		"outputs": [
			{
				"internalType": "address",
				"name": "buyer",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "number",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "rid",
				"type": "uint256"
			}
		],
		"name": "ticketsCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

let provider;
let signer;
let contract;

const connectWalletBtn = document.getElementById('connectWalletBtn');
const walletStatus = document.querySelector('.wallet-status');
const walletAddress = document.querySelector('.wallet-address');
const roundIdSpan = document.getElementById('roundId');
const ticketPriceSpan = document.getElementById('ticketPrice');
const ticketsCountSpan = document.getElementById('ticketsCount');
const firstTicketBuyerSpan = document.getElementById('firstTicketBuyer');
const firstTicketNumberSpan = document.getElementById('firstTicketNumber');
const buyTicketBtn = document.getElementById('buyTicketBtn');
const checkFirstTicketBtn = document.getElementById('checkFirstTicketBtn');
const chosenNumberInput = document.getElementById('chosenNumber');

// Connect wallet
async function connectWallet() {
    try {
        if (!window.ethereum) {
            alert("MetaMask is required!");
            return;
        }
        provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        signer = await provider.getSigner();
        walletStatus.textContent = "Connected";
        walletAddress.textContent = accounts[0];
        contract = new ethers.Contract(contractAddress, abi, signer);
        updateRoundInfo();
    } catch (err) {
        console.error("Wallet connection error:", err);
    }
}

// Update round info
async function updateRoundInfo() {
    try {
        const roundId = await contract.roundId();
        const ticketPrice = await contract.ticketPrice();
        const ticketsCount = await contract.ticketsCount(roundId);

        roundIdSpan.textContent = roundId.toString();
        ticketPriceSpan.textContent = ethers.formatEther(ticketPrice);
        ticketsCountSpan.textContent = ticketsCount.toString();
    } catch (err) {
        console.error("Error updating round info:", err);
    }
}

// Buy ticket
async function buyTicket() {
    try {
        const chosenNumber = chosenNumberInput.value;
        const price = await contract.ticketPrice();
        const tx = await contract.buyTicket(chosenNumber, { value: price });
        await tx.wait();
        alert("Ticket bought successfully!");
        updateRoundInfo();
    } catch (err) {
        console.error("buyTicket error:", err);
    }
}

// Check first ticket
async function checkFirstTicket() {
    try {
        const buyer = await contract.tickets(0, 0);
        firstTicketBuyerSpan.textContent = buyer.buyer;
        firstTicketNumberSpan.textContent = buyer.number.toString();
    } catch (err) {
        console.error("Error checking first ticket:", err);
    }
}

connectWalletBtn.onclick = connectWallet;
buyTicketBtn.onclick = buyTicket;
checkFirstTicketBtn.onclick = checkFirstTicket;
