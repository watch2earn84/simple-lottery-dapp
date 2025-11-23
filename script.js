// =========================
// Base Sepolia Lottery DApp
// script.js
// =========================

const CONTRACT_ADDRESS = "0x6c7100b1cfa8cf5e006bd5c1047fa917ddedf56e";

const CONTRACT_ABI = [
    {
        "inputs": [
            {"internalType": "uint256","name": "chosenNumber","type": "uint256"}
        ],
        "name": "buyTicket",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {"inputs":[],"name":"closeRound","outputs":[],"stateMutability":"nonpayable","type":"function"},
    {"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},
    {"inputs":[{"internalType":"uint256","name":"winnerIndex","type":"uint256"},{"internalType":"bool","name":"usePseudoRandom","type":"bool"}],"name":"pickWinner","outputs":[],"stateMutability":"nonpayable","type":"function"},
    {"inputs":[{"internalType":"uint16","name":"_f","type":"uint16"}],"name":"setFeeBps","outputs":[],"stateMutability":"nonpayable","type":"function"},
    {"inputs":[{"internalType":"uint256","name":"_ticketPriceWei","type":"uint256"},{"internalType":"uint256","name":"_maxTickets","type":"uint256"},{"internalType":"uint16","name":"_feeBps","type":"uint16"}],"stateMutability":"nonpayable","type":"constructor"},
    {"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},
    {"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},
    {"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"roundId","type":"uint256"}],"name":"RoundClosed","type":"event"},
    {"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"roundId","type":"uint256"}],"name":"RoundStarted","type":"event"},
    {"inputs":[{"internalType":"uint256","name":"_m","type":"uint256"}],"name":"setMaxTickets","outputs":[],"stateMutability":"nonpayable","type":"function"},
    {"inputs":[{"internalType":"uint256","name":"_p","type":"uint256"}],"name":"setTicketPrice","outputs":[],"stateMutability":"nonpayable","type":"function"},
    {"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"roundId","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"ticketIndex","type":"uint256"},{"indexed":false,"internalType":"address","name":"buyer","type":"address"}],"name":"TicketBought","type":"event"},
    {"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},
    {"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"roundId","type":"uint256"},{"indexed":false,"internalType":"address","name":"winner","type":"address"},{"indexed":false,"internalType":"uint256","name":"payout","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"fee","type":"uint256"}],"name":"WinnerPaid","type":"event"},
    {"stateMutability":"payable","type":"fallback"},
    {"stateMutability":"payable","type":"receive"},
    {"inputs":[],"name":"feeBps","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},
    {"inputs":[],"name":"maxTickets","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
    {"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},
    {"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"paid","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},
    {"inputs":[],"name":"roundId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
    {"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"roundOpen","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},
    {"inputs":[],"name":"ticketPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
    {"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"tickets","outputs":[{"internalType":"address","name":"buyer","type":"address"},{"internalType":"uint256","name":"number","type":"uint256"}],"stateMutability":"view","type":"function"},
    {"inputs":[{"internalType":"uint256","name":"rid","type":"uint256"}],"name":"ticketsCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}
];

let provider, signer, contract, currentAccount;

async function init() {
    if (!window.ethereum) {
        alert("MetaMask not detected. Please install it!");
        return;
    }

    try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        provider = new ethers.providers.Web3Provider(window.ethereum);
        signer = provider.getSigner();
        currentAccount = await signer.getAddress();

        contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
        console.log("Contract loaded:", contract);

        const rid = await contract.roundId();
        document.getElementById("roundIdDisplay")?.textContent = rid.toString();

        const price = await contract.ticketPrice();
        document.getElementById("priceDisplay")?.textContent = ethers.utils.formatEther(price) + " ETH";

    } catch (err) {
        console.error("Init error:", err);
        alert("Error initializing DApp: " + err.message);
    }
}

async function buyTicket() {
    if (!contract) {
        alert("Contract not loaded!");
        return;
    }

    const input = document.getElementById("chosenNumberInput");
    const chosenNumber = input ? Number(input.value) : NaN;

    if (!Number.isInteger(chosenNumber)) {
        alert("Enter a valid number.");
        return;
    }

    try {
        const price = await contract.ticketPrice();
        const tx = await contract.buyTicket(chosenNumber, { value: price });
        console.log("Transaction sent:", tx.hash);
        await tx.wait();
        alert("Ticket purchased successfully!");
    } catch (err) {
        console.error("buyTicket error:", err);
        alert("Error buying ticket: " + (err?.message || err));
    }
}

async function showFirstTicket() {
    if (!contract) return;
    try {
        const rid = await contract.roundId();
        const ticketCount = await contract.ticketsCount(rid);
        if (ticketCount.toNumber() > 0) {
            const ticket = await contract.tickets(rid, 0);
            const buyer = ticket.buyer || ticket[0];
            const number = ticket.number || ticket[1];
            document.getElementById("firstTicketDisplay").textContent =
                `Buyer: ${buyer}, Number: ${number.toString()}`;
        } else {
            document.getElementById("firstTicketDisplay").textContent = "No tickets yet";
        }
    } catch (err) {
        console.error("showFirstTicket error:", err);
    }
}

window.addEventListener("DOMContentLoaded", () => {
    init();

    const buyBtn = document.getElementById("buyBtn");
    if (buyBtn) buyBtn.addEventListener("click", buyTicket);

    const checkBtn = document.getElementById("checkFirstBtn");
    if (checkBtn) checkBtn.addEventListener("click", showFirstTicket);

    const input = document.getElementById("chosenNumberInput");
    if (input) {
        input.addEventListener("keypress", (e) => {
            if (e.key === "Enter") buyTicket();
        });
    }
});
