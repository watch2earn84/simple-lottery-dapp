document.addEventListener("DOMContentLoaded", () => {
    // --- Element references ---
    const connectBtn = document.getElementById("connectWalletBtn");
    const buyBtn = document.getElementById("buyTicketBtn");
    const roundInfo = document.getElementById("roundInfo");
    const ticketPriceInfo = document.getElementById("ticketPriceInfo");
    const ticketsCountInfo = document.getElementById("ticketsCountInfo");
    const chosenNumberInput = document.getElementById("chosenNumberInput");

    if (!connectBtn) return console.error("connectWalletBtn not found!");

    let provider, signer, contract;
    const contractAddress = "0x6c7100b1cfa8cf5e006bd5c1047fa917ddedf56e";
    const contractAbi = [
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

    // --- Connect Wallet ---
    async function connectWallet() {
        try {
            if (!window.ethereum) return alert("MetaMask not installed!");

            provider = new ethers.BrowserProvider(window.ethereum);
            const accounts = await provider.send("eth_requestAccounts", []);
            signer = await provider.getSigner();
            const walletAddress = accounts[0];

            connectBtn.textContent = `Connected: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`;
            connectBtn.disabled = true;

            // Initialize contract
            contract = new ethers.Contract(contractAddress, contractAbi, signer);

            // Load initial round info
            await updateRoundInfo();
        } catch (err) {
            console.error("Wallet connection error:", err);
            alert("Failed to connect wallet");
        }
    }

    // --- Update Round Info ---
    async function updateRoundInfo() {
        try {
            if (!contract) return;

            const roundId = await contract.roundId();
            const ticketPrice = await contract.ticketPrice();
            const totalTickets = await contract.ticketsCount(roundId);

            roundInfo.textContent = `Round ID: ${roundId}`;
            ticketPriceInfo.textContent = `Ticket Price: ${ethers.formatEther(ticketPrice)} ETH`;
            ticketsCountInfo.textContent = `Tickets Sold: ${totalTickets}`;
        } catch (err) {
            console.error("Error updating round info:", err);
        }
    }

    // --- Buy Ticket ---
    async function buyTicket() {
        try {
            if (!contract) return;

            const chosenNumber = parseInt(chosenNumberInput.value);
            if (isNaN(chosenNumber) || chosenNumber < 1) {
                return alert("Enter a valid number for your ticket!");
            }

            const ticketPrice = await contract.ticketPrice();
            const tx = await contract.buyTicket(chosenNumber, { value: ticketPrice });
            await tx.wait();
            console.log("Ticket bought!");

            // Update round info after purchase
            await updateRoundInfo();
            alert("Ticket purchased successfully!");
        } catch (err) {
            console.error("buyTicket error:", err);
            alert("Transaction failed. See console for details.");
        }
    }

    // --- Pick Winner (Chainlink VRF simulation for testnet) ---
    async function pickWinner() {
        try {
            if (!contract) return;
            // For testnet, simulate randomness or call VRF-enabled function
            const totalTickets = await contract.ticketsCount(await contract.roundId());
            if (totalTickets === 0) return alert("No tickets sold yet!");

            const winnerIndex = Math.floor(Math.random() * totalTickets);
            const tx = await contract.pickWinner(winnerIndex, true); // true = use pseudo-random for testing
            await tx.wait();
            alert("Winner picked!");
            await updateRoundInfo();
        } catch (err) {
            console.error("pickWinner error:", err);
        }
    }

    // --- Event Listeners ---
    connectBtn.addEventListener("click", connectWallet);
    if (buyBtn) buyBtn.addEventListener("click", buyTicket);

    // Optional: auto-update round info every 15s
    setInterval(updateRoundInfo, 15000);
});
