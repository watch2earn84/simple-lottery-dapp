// =========================
// Base Sepolia Lottery DApp
// =========================

const CONTRACT_ADDRESS = "0x6c7100b1cfa8cf5e006bd5c1047fa917ddedf56e";

// Paste your full ABI here exactly as valid JSON
const CONTRACT_ABI = [
  {
    "inputs":[{"internalType":"uint256","name":"chosenNumber","type":"uint256"}],
    "name":"buyTicket",
    "outputs":[],
    "stateMutability":"payable",
    "type":"function"
  },
  {
    "inputs":[],
    "name":"closeRound",
    "outputs":[],
    "stateMutability":"nonpayable",
    "type":"function"
  },
  {
    "inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],
    "name":"emergencyWithdraw",
    "outputs":[],
    "stateMutability":"nonpayable",
    "type":"function"
  },
  {
    "inputs":[{"internalType":"uint256","name":"winnerIndex","type":"uint256"},{"internalType":"bool","name":"usePseudoRandom","type":"bool"}],
    "name":"pickWinner",
    "outputs":[],
    "stateMutability":"nonpayable",
    "type":"function"
  },
  {
    "inputs":[{"internalType":"uint16","name":"_f","type":"uint16"}],
    "name":"setFeeBps",
    "outputs":[],
    "stateMutability":"nonpayable",
    "type":"function"
  },
  {
    "inputs":[{"internalType":"uint256","name":"_ticketPriceWei","type":"uint256"},{"internalType":"uint256","name":"_maxTickets","type":"uint256"},{"internalType":"uint16","name":"_feeBps","type":"uint16"}],
    "stateMutability":"nonpayable",
    "type":"constructor"
  },
  {
    "inputs":[],
    "name":"roundId",
    "outputs":[{"internalType":"uint256","name":"","type":"uint256"}],
    "stateMutability":"view",
    "type":"function"
  },
  {
    "inputs":[],
    "name":"ticketPrice",
    "outputs":[{"internalType":"uint256","name":"","type":"uint256"}],
    "stateMutability":"view",
    "type":"function"
  },
  {
    "inputs":[{"internalType":"uint256","name":"rid","type":"uint256"}],
    "name":"ticketsCount",
    "outputs":[{"internalType":"uint256","name":"","type":"uint256"}],
    "stateMutability":"view",
    "type":"function"
  },
  {
    "inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],
    "name":"tickets",
    "outputs":[{"internalType":"address","name":"buyer","type":"address"},{"internalType":"uint256","name":"number","type":"uint256"}],
    "stateMutability":"view",
    "type":"function"
  }
  // Add remaining ABI objects if needed
];

let provider, signer, contract;

// Initialize DApp
async function init() {
    if (!window.ethereum) return alert("MetaMask not detected!");

    provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();
    contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

    await updateRoundInfo();
    await showFirstTicket();
}

// Update round info
async function updateRoundInfo() {
    try {
        const rid = await contract.roundId();
        const price = await contract.ticketPrice();

        document.getElementById("roundIdDisplay").textContent = rid.toString();
        document.getElementById("priceDisplay").textContent = ethers.utils.formatEther(price) + " ETH";
    } catch (err) {
        console.error("updateRoundInfo error:", err);
    }
}

// Show first ticket
async function showFirstTicket() {
    try {
        const rid = await contract.roundId();
        const count = await contract.ticketsCount(rid);

        if (count.toNumber() === 0) {
            document.getElementById("firstTicketDisplay").textContent = "No tickets yet";
            return;
        }

        const ticket = await contract.tickets(rid, 0);
        const buyer = ticket.buyer;
        const number = ticket.number;

        document.getElementById("firstTicketDisplay").textContent =
            `Buyer: ${buyer}, Number: ${number.toString()}`;
    } catch (err) {
        console.error("showFirstTicket error:", err);
    }
}

// Buy ticket
async function buyTicket() {
    try {
        const input = document.getElementById("chosenNumberInput").value;
        const chosenNumber = Number(input);
        if (!Number.isInteger(chosenNumber)) return alert("Enter a valid number!");

        const price = await contract.ticketPrice();
        const tx = await contract.buyTicket(chosenNumber, { value: price });
        await tx.wait();
        alert("Ticket bought successfully!");

        updateRoundInfo();
        showFirstTicket();
    } catch (err) {
        console.error("buyTicket error:", err);
        alert("Error buying ticket: " + (err?.message || err));
    }
}

// Event listeners
window.addEventListener("DOMContentLoaded", () => {
    init();

    document.getElementById("buyBtn").addEventListener("click", buyTicket);
    document.getElementById("checkFirstBtn").addEventListener("click", showFirstTicket);
});
