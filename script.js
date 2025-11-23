/* script.js - ethers.js based, drop into your page (make sure ethers is loaded) */

/* == INCLUDE ethers in your HTML (if not using bundler):
<script src="https://cdn.jsdelivr.net/npm/ethers@5.7.2/dist/ethers.min.js"></script>
*/

/* ====== PASTE YOUR ABI ARRAY BELOW (make sure it's an actual JS array, not a quoted JSON string) ====== */
const ABI = /* [
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
] */;
/* Example: const ABI = [ { "inputs": [...], "name": "buyTicket", ... }, ... ]; */


const ADDRESS = "0x6c7100b1cfa8cf5e006bd5c1047fa917ddedf56e";

let provider, signer, contract, currentAccount;

function isAbiValid(a) {
  return Array.isArray(a) && a.length > 0 && typeof a[0] === "object";
}

/* quick BOM/stray-checker for ABI string edge-cases (only needed if you load ABI as string) */
function stripLeadingBOMIfString(x) {
  if (typeof x === "string") {
    return x.replace(/^\uFEFF/, "");
  }
  return x;
}

async function init() {
  try {
    // Basic sanity checks for ABI/ADDRESS
    if (!isAbiValid(ABI)) {
      console.error("ABI is not a valid JS array. Make sure you pasted the ABI as a JavaScript array (not a JSON string) and there are no stray BOM chars.");
      console.log("ABI type:", typeof ABI, "isArray:", Array.isArray(ABI));
      return;
    }
    if (!ADDRESS || ADDRESS === "0xYourContractAddressHere") {
      console.error("Please set ADDRESS to your deployed contract address.");
      return;
    }

    // Provider
    if (!window.ethereum) {
      console.error("No wallet provider found. Install MetaMask or another web3 provider.");
      return;
    }

    await window.ethereum.request({ method: "eth_requestAccounts" });
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
    currentAccount = await signer.getAddress();

    // Instantiate contract
    contract = new ethers.Contract(ADDRESS, ABI, signer);

    // Diagnostics: show what's on the contract object
    console.log("Contract instantiated:", contract);
    console.log("Contract keys:", Object.keys(contract || {}));
    if (contract.functions) console.log("Contract.functions keys:", Object.keys(contract.functions));
    if (contract.interface) console.log("Contract interface functions:", Object.keys(contract.interface.functions));

    // Quick existence tests for common getters
    const hasRoundId = (typeof contract.roundId === "function") || (contract.functions && contract.functions.roundId);
    const hasTicketPrice = (typeof contract.ticketPrice === "function") || (contract.functions && contract.functions.ticketPrice);
    console.log("has roundId getter?", !!hasRoundId);
    console.log("has ticketPrice getter?", !!hasTicketPrice);

    // Try reading values (wrapped in try/catch to show informative errors)
    try {
      if (hasRoundId) {
        const ridBn = await contract.roundId();
        console.log("roundId:", ridBn.toString());
        document.getElementById("roundIdDisplay")?.textContent = ridBn.toString();
      } else {
        console.warn("roundId() getter not detected on contract. Check ABI/address/instantiation.");
      }
    } catch (err) {
      console.error("Error reading roundId():", err);
    }

    try {
      if (hasTicketPrice) {
        const priceBn = await contract.ticketPrice();
        console.log("ticketPrice (wei):", priceBn.toString(), "ETH:", ethers.utils.formatEther(priceBn));
        document.getElementById("priceDisplay")?.textContent = ethers.utils.formatEther(priceBn);
      } else {
        console.warn("ticketPrice() getter not detected on contract. Check ABI/address/instantiation.");
      }
    } catch (err) {
      console.error("Error reading ticketPrice():", err);
    }

  } catch (err) {
    console.error("init error:", err);
  }
}

/* ====== Example safe buy button handler (assumes an input with id 'chosenNumberInput' and button id 'buyBtn') ====== */
async function handleBuyBtnClick() {
  if (!contract) {
    console.error("contract not initialized");
    return;
  }
  const input = document.getElementById("chosenNumberInput");
  const chosenNumber = input ? Number(input.value) : NaN;
  if (!Number.isFinite(chosenNumber)) {
    alert("Please enter a valid number");
    return;
  }

  try {
    // read ticket price
    const priceBn = await contract.ticketPrice();
    console.log("buyTicket will send value (wei):", priceBn.toString());

    // send transaction
    const tx = await contract.buyTicket(chosenNumber, { value: priceBn });
    console.log("Transaction submitted:", tx.hash);
    // Optionally update UI to show pending state
    await tx.wait();
    console.log("Transaction mined");
    alert("Ticket purchased!");
  } catch (err) {
    console.error("buyTicket failed:", err);
    alert("buyTicket error: " + (err && err.message ? err.message : err));
  }
}

/* ====== Example: show first ticket for current round (useful sanity check) ====== */
async function showFirstTicket() {
  if (!contract) return;
  try {
    const ridBn = await contract.roundId();
    const rid = ridBn.toString();
    const cntBn = await contract.ticketsCount(ridBn);
    const cnt = cntBn.toNumber();
    console.log("Round", rid, "ticketsCount:", cnt);
    if (cnt > 0) {
      const ticket = await contract.tickets(ridBn, 0);
      // ticket may be returned as an object with properties buyer and number
      console.log("first ticket:", ticket);
      const buyer = ticket.buyer || ticket[0];
      const number = (ticket.number || ticket[1]).toString();
      document.getElementById("firstTicketDisplay")?.textContent = `buyer: ${buyer}, number: ${number}`;
    } else {
      document.getElementById("firstTicketDisplay")?.textContent = "No tickets yet";
    }
  } catch (err) {
    console.error("showFirstTicket err:", err);
  }
}

/* ====== attach event handlers after DOM ready ====== */
window.addEventListener("DOMContentLoaded", () => {
  // init contract and UI
  init();

  // wire buttons - change IDs to match your HTML
  const buyBtn = document.getElementById("buyBtn");
  if (buyBtn) buyBtn.addEventListener("click", () => { handleBuyBtnClick(); });

  const checkFirstBtn = document.getElementById("checkFirstBtn");
  if (checkFirstBtn) checkFirstBtn.addEventListener("click", () => { showFirstTicket(); });

  // small convenience: allow pressing Enter on input to buy
  const chosenInput = document.getElementById("chosenNumberInput");
  if (chosenInput) {
    chosenInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") handleBuyBtnClick();
    });
  }
});
