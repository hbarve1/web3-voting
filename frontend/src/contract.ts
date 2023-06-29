import * as ethers from "ethers";

const address = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9";
const abi: string[] = [
  "event MemberJoined(address indexed member, uint256 joinedAt)",
  "event VoteCreated(address indexed owner, uint256 indexed voteId, uint256 indexed createdAt, uint256 endTime)",
  "event Voted(address indexed voter, uint256 indexed voteId, uint256 indexed option, uint256 createdAt)",
  "function createVote(string uri, uint256 endTime, uint256 options)",
  "function didVote(address member, uint256 voteId) view returns (bool)",
  "function getVote(uint256 voteId) view returns (string, address, uint256[], uint256)",
  "function join()",
  "function members(address) view returns (bool)",
  "function vote(uint256 voteId, uint256 option)",
];

const provider = new ethers.providers.Web3Provider(window.ethereum);

export const getContract = async (): Promise<{
  signer: ethers.ethers.providers.JsonRpcSigner;
  contract: ethers.ethers.Contract;
}> => {
  const signer = provider.getSigner();
  const contract = new ethers.Contract(address, abi, signer);

  return {
    signer,
    contract,
  };
};

export const connect = async (): Promise<{
  signer: ethers.ethers.providers.JsonRpcSigner;
  contract: ethers.ethers.Contract;
}> => {
  await provider.send("eth_requestAccounts", []);
  return getContract();
};
