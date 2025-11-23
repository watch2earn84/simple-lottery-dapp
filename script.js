// =========================
// Base Sepolia Lottery DApp
// script.js
// =========================

const CONTRACT_ADDRESS = "0x6c7100b1cfa8cf5e006bd5c1047fa917ddedf56e";

const CONTRACT_ABI = [
  // Paste your full ABI here exactly as provided
];

let provider, signer, contract, currentAccount;

// Initialize DApp
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

        await updateRoundInfo();
    } catch (err) {
        console.error("Init error:", err);
        alert("Error initializing DApp: " + err.message);
    }
}

// Update roundId and ticketPrice display
async function updateRoundInfo() {
    if (!contract) return;
    try {
        const rid = await contract.roundId();
        document.getElementById("roundIdDisplay").textContent = rid.toString();

        const price = await contract.ticketPrice();
        document.getElementById("priceDisplay").textContent = ethers.utils.formatEther(price) + " ETH";
    } catch (err) {
        console.error("updateRoundInfo error:", err);
    }
}

// Buy a ticket
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

        // Refresh ticket info
        showFirstTicket();
        updateRoundInfo();
    } catch (err) {
        console.error("buyTicket error:", err);
        alert("Error buying ticket: " + (err?.message || err));
    }
}

// Show first ticket of the current round
async function showFirstTicket() {
    if (!contract) return;
    try {
        const rid = await contract.roundId();
        const ticketCount = await contract.ticketsCount(rid);

        if (ticketCount.toNumber() > 0) {
            const ticket = await contract.tickets(rid, 0);
            const [buyer, number] = ticket; // Correct destructuring
            document.getElementById("firstTicketDisplay").textContent =
                `Buyer: ${buyer}, Number: ${number.toString()}`;
        } else {
            document.getElementById("firstTicketDisplay").textContent = "No tickets yet";
        }
    } catch (err) {
        console.error("showFirstTicket error:", err);
    }
}

// Event listeners
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
