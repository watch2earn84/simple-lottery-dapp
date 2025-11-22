# Query: script.js
# ContextLines: 1

No Results
// 
const contractAddress = "0x6c7100b1cfa8cf5e006bd5c1047fa917ddedf56e";
const contractABI = [ /* [
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
] */ ];
// ================================================

let provider, signer, contract;
let currentRound;

async function init() {
    if(!window.ethereum){ alert("MetaMask not installed"); return; }
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
    contract = new ethers.Contract(contractAddress, contractABI, signer);

    await connectWallet();
    await updateRoundInfo();
    setupEventListeners();
}

async function connectWallet() {
    const accounts = await provider.send("eth_requestAccounts", []);
    document.getElementById("walletStatus").innerText = "Connected: " + accounts[0];
}

async function updateRoundInfo() {
    currentRound = (await contract.roundId()).toNumber();
    document.getElementById("roundId").innerText = currentRound;

    const open = await contract.roundOpen(currentRound);
    document.getElementById("roundOpen").innerText = open;
    document.getElementById("pickWinnerBtn").disabled = open;
    document.getElementById("closeRoundBtn").disabled = !open;

    const count = (await contract.ticketsCount(currentRound)).toNumber();
    document.getElementById("ticketsCount").innerText = count;

    await updateTicketsList();
}

async function updateTicketsList() {
    const listDiv = document.getElementById("ticketsList");
    listDiv.innerHTML = "";
    const count = (await contract.ticketsCount(currentRound)).toNumber();
    for(let i=0;i<count;i++){
        const ticket = await contract.tickets(currentRound, i);
        const div = document.createElement("div");
        div.className = "ticket";
        div.innerHTML = `<span>${ticket.buyer}</span><span>${ticket.number}</span>`;
        listDiv.appendChild(div);
    }
}

// ===== Buy Ticket =====
document.getElementById("buyBtn").onclick = async () => {
    const num = parseInt(document.getElementById("ticketNumber").value);
    if(isNaN(num)){ alert("Enter a valid number"); return; }

    try {
        const price = await contract.ticketPrice();
        const tx = await contract.buyTicket(num, { value: price });
        document.getElementById("buyStatus").innerText = "Buying ticket...";
        await tx.wait();
        document.getElementById("buyStatus").innerText = "Ticket bought!";
        await updateRoundInfo();
    } catch(e){ console.error(e); document.getElementById("buyStatus").innerText = "Error: " + e.message; }
};

// ===== Close Round =====
document.getElementById("closeRoundBtn").onclick = async () => {
    try{ const tx = await contract.closeRound(); await tx.wait(); await updateRoundInfo(); }
    catch(e){ console.error(e); alert(e.message); }
};

// ===== Pick Winner =====
document.getElementById("pickWinnerBtn").onclick = async () => {
    try{
        const tx = await contract.pickWinner(0, true);
        const receipt = await tx.wait();

        const event = receipt.events.find(e => e.event === "WinnerPaid");
        const [rid, winner, payout, fee] = event.args;

        document.getElementById("winnerAddr").innerText = winner;
        document.getElementById("payout").innerText = ethers.utils.formatEther(payout);

        const count = (await contract.ticketsCount(rid)).toNumber();
        let winningNumber = "-";
        for(let i=0;i<count;i++){
            const ticket = await contract.tickets(rid, i);
            if(ticket.buyer.toLowerCase() === winner.toLowerCase()){ winningNumber = ticket.number; break; }
        }
        document.getElementById("winningTicket").innerText = winningNumber;

        await updateRoundInfo();
    } catch(e){ console.error(e); alert(e.message); }
};

// ===== Events =====
function setupEventListeners() {
    contract.on("TicketBought", async (rid, idx, buyer)=>{ if(rid.toNumber()===currentRound) await updateTicketsList(); });
    contract.on("RoundClosed", async (rid)=>{ if(rid.toNumber()===currentRound) await updateRoundInfo(); });
    contract.on("WinnerPaid", async (rid,winner,payout,fee)=>{ if(rid.toNumber()===currentRound) await updateRoundInfo(); });
}

init();

