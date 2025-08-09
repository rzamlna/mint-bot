require("dotenv").config();
const { ethers } = require("ethers");

const RPC_URL = process.env.RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = 
process.env.CONTRACT_ADDRESS;
const MINT_PRICE = process.env.MINT_PRICE;
const MINT_AMOUNT = process.env.MINT_AMOUNT;

const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY,provider);

// ABI MINIMAL HANYA UNTUK MINT()
const abi = [
  "function mint(uint256 _count) public payable"
];

const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, wallet);

async function mint() {
  try {
    const tx = await contract.mint(MINT_AMOUNT, {
      value: ethers.utils.parseEther((MINT_PRICE * MINT_AMOUNT).toString()),
      gasLimit: 30000, // sesuaikan jika perlu
    });

    console.log("Tx sent! Hash:", tx.hash);
    const receipt = await tx.wait();
    console.log("Mint success! Block:",receipt.blockNumber);
  } catch (err) {
    console.error("✖️ Mint failed:", err);
  }
}

mint();
