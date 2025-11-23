// script.js — UI + contract integration hooks

// ---------- CONFIG (replace with your own) ----------
const CONTRACT_ADDRESS = "0x6c7100b1cfa8cf5e006bd5c1047fa917ddedf56e";
// PASTE your ABI array below (or leave empty to use UI-only demo)
const CONTRACT_ABI = [
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

// ---------- DOM ----------
const connectWalletBtn = document.getElementById('connectWalletBtn');
const walletAddrEl = document.getElementById('walletAddr');

const roundIdEl = document.getElementById('roundId');
const ticketPriceEl = document.getElementById('ticketPrice');
const ticketsSoldEl = document.getElementById('ticketsSold');
const maxTicketsEl = document.getElementById('maxTickets');
const progressFillEl = document.getElementById('progressFill');

const numberInput = document.getElementById('numberInput');
const decBtn = document.getElementById('decBtn');
const incBtn = document.getElementById('incBtn');
const keypad = document.getElementById('keypad');

const buyBtn = document.getElementById('buyBtn');
const pickWinnerBtn = document.getElementById('pickWinnerBtn');

const ticketsList = document.getElementById('ticketsList');
const lastWinnerEl = document.getElementById('lastWinner');
const lastPayoutEl = document.getElementById('lastPayout');

// ---------- State ----------
let provider = null;
let signer = null;
let contract = null;

let uiState = {
  roundId: 1,
  ticketPriceWei: "0", // BigInt-like or string
  ticketsSold: 0,
  maxTickets: 1000,
  tickets: [], // { index, buyer, number }
  lastWinner: null
};

// ---------- Helpers ----------
function clamp(v, a, b){ return Math.max(a, Math.min(b, v)); }
function pad4(n){ return String(n).padStart(4,'0'); }
function toPercent(part, total){ return total === 0 ? 0 : Math.round((part/total)*100); }

// ---------- UI: render pool progress & tickets ----------
function renderPool(){
  roundIdEl.textContent = `#${uiState.roundId}`;
  ticketPriceEl.textContent = uiState.ticketPriceWei === "0" ? "—" : `${uiState.ticketPriceWei} ETH`;
  ticketsSoldEl.textContent = uiState.ticketsSold;
  maxTicketsEl.textContent = `/ ${uiState.maxTickets} tickets`;
  const pct = toPercent(uiState.ticketsSold, uiState.maxTickets);
  progressFillEl.style.width = `${pct}%`;
  // tickets list
  ticketsList.innerHTML = "";
  uiState.tickets.slice().reverse().slice(0,50).forEach(t=>{
    const li = document.createElement('li');
    li.className = 'ticket-item';
    li.innerHTML = `<span>#${t.index} • ${pad4(t.number)}</span><span class="muted">${t.buyer}</span>`;
    ticketsList.appendChild(li);
  });
  // last winner
  if(uiState.lastWinner){
    lastWinnerEl.textContent = `${uiState.lastWinner.address} (round ${uiState.lastWinner.round})`;
    lastPayoutEl.textContent = `${uiState.lastWinner.payout} ETH`;
  } else {
    lastWinnerEl.textContent = '—';
    lastPayoutEl.textContent = '—';
  }
}

// ---------- Demo initialization (simulated data) ----------
function initDemo(){
  uiState.roundId = 7;
  uiState.ticketPriceWei = "0.01";
  uiState.maxTickets = 1000;
  uiState.ticketsSold = 320;
  // sample tickets
  uiState.tickets = [];
  for(let i=0;i<uiState.ticketsSold;i++){
    uiState.tickets.push({ index: i, buyer: `0x${(Math.random().toString(16)+'000000').slice(2,10)}`, number: Math.floor(Math.random()*10000) });
  }
  uiState.lastWinner = { address: "0xAbc...1234", payout: "3.2", round: 6 };
  renderPool();
}

// ---------- Wallet & Contract integration ----------
async function connectWallet(){
  if(!window.ethereum){ alert("Please install MetaMask"); return; }
  try{
    provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = await provider.getSigner();
    const addr = await signer.getAddress();
    walletAddrEl.textContent = `${addr.slice(0,6)}...${addr.slice(-4)}`;
    connectWalletBtn.textContent = "Connected";
    connectWalletBtn.disabled = true;

    // If ABI provided, init contract
    if(Array.isArray(CONTRACT_ABI) && CONTRACT_ABI.length>0 && CONTRACT_ADDRESS && CONTRACT_ADDRESS.startsWith('0x')){
      contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      // fetch live state if possible
      try{
        const rid = await contract.roundId();
        const price = await contract.ticketPrice();
        const maxTickets = await contract.maxTickets();
        const sold = await contract.ticketsCount(rid);
        const ridNum = Number(rid);
        uiState.roundId = ridNum;
        uiState.ticketPriceWei = ethers.formatEther(price);
        uiState.maxTickets = Number(maxTickets);
        uiState.ticketsSold = Number(sold);
        // optionally fetch latest tickets (first N)
        // NOTE: fetching tickets one by one can be expensive — optimize server-side if needed
        renderPool();
        // listen to events
        listenToContractEvents();
      }catch(e){
        console.warn("Failed to pull live contract state:", e);
      }
    }

  }catch(e){
    console.error(e);
    alert("Connection error: " + (e?.message || e));
  }
}

// ---------- Buy ticket (UI wired to contract or demo) ----------
async function buyTicket(){
  const chosen = clamp(Number(numberInput.value), 0, 9999);
  if(isNaN(chosen)) return alert("Enter a number 0–9999");
  // If contract connected call buyTicket
  if(contract){
    try{
      // ticketPrice from contract
      const price = await contract.ticketPrice();
      const tx = await contract.buyTicket(chosen, { value: price });
      await tx.wait();
      // update UI: increment sold and add ticket (client-side)
      const idx = uiState.ticketsSold;
      uiState.ticketsSold += 1;
      uiState.tickets.push({ index: idx, buyer: (await signer.getAddress()), number: chosen });
      renderPool();
      alert("Ticket purchased on-chain. TX mined.");
      return;
    }catch(err){
      console.error("buy error", err);
      alert("Buy failed: " + (err?.message || err));
      return;
    }
  }
  // Demo fallback: simulate buy
  const idx = uiState.ticketsSold;
  uiState.ticketsSold += 1;
  uiState.tickets.push({ index: idx, buyer: `0xDemo${Math.random().toString(16).slice(2,8)}`, number: chosen });
  renderPool();
  alert(`Demo: bought ticket #${idx} for ${pad4(chosen)}`);
}

// ---------- Event listeners on contract (real-time UI) ----------
function listenToContractEvents(){
  if(!contract) return;
  // TicketBought(roundId, ticketIndex, buyer)
  try{
    contract.on('TicketBought', (rid, ticketIndex, buyer, event) => {
      // only update if same round
      if(Number(rid) === uiState.roundId){
        uiState.ticketsSold = Number(uiState.ticketsSold) + 1;
        uiState.tickets.push({ index: Number(ticketIndex), buyer, number: 0 /* number not in event — update if event includes it*/});
        renderPool();
      }
    });
    // WinnerPaid(roundId, winner, payout, fee)
    contract.on('WinnerPaid', (rid, winner, payout, fee) => {
      uiState.lastWinner = { address: winner, payout: ethers.formatEther(payout), round: Number(rid) };
      // start new round: increment roundId and reset tickets
      uiState.roundId = uiState.roundId + 1;
      uiState.ticketsSold = 0;
      uiState.tickets = [];
      renderPool();
      // nice visual celebration
      celebrateWinner();
    });
    // RoundStarted / RoundClosed can be handled similarly
  }catch(e){
    console.warn('event attach failed', e);
  }
}

// ---------- small celebration ----------
function celebrateWinner(){
  // simple visual; you can integrate confetti library
  const orig = document.body.style.background;
  document.body.style.transition = "background 0.8s";
  document.body.style.background = "linear-gradient(180deg,#07324f,#052033)";
  setTimeout(()=> document.body.style.background = orig, 1200);
}

// ---------- number picker handlers ----------
decBtn.addEventListener('click', ()=>{
  numberInput.value = clamp(Number(numberInput.value) - 1, 0, 9999);
});
incBtn.addEventListener('click', ()=>{
  numberInput.value = clamp(Number(numberInput.value) + 1, 0, 9999);
});
// keypad quick set
keypad.addEventListener('click', (e)=>{
  if(e.target && e.target.matches('.key')){
    numberInput.value = clamp(Number(e.target.textContent.trim()), 0, 9999);
  }
});

// buy button
buyBtn.addEventListener('click', buyTicket);

// connect wallet btn
connectWalletBtn.addEventListener('click', connectWallet);

// pick winner button is intentionally disabled/hidden for transparency
pickWinnerBtn.addEventListener('click', ()=>{
  alert("Pick winner is disabled in UI. Winner is selected automatically via VRF or operator.");
});

// ---------- init ----------
initDemo();
