// =========================
// Base Sepolia Lottery DApp
// =========================

const CONTRACT_ADDRESS = "0x6c7100b1cfa8cf5e006bd5c1047fa917ddedf56e";
const CONTRACT_ABI = [
    {
        "inputs":[{"internalType":"uint256","name":"chosenNumber","type":"uint256"}],
        "name":"buyTicket",
        "outputs":[],
        "stateMutability":"payable",
        "type":"function"
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
    {"inputs":[{"internalType":"uint256","name":"_p","type":"uint256"}],"name":"setTicketPrice","outputs":[],"stateMuta_]()
