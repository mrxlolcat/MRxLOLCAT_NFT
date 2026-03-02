import { createThirdwebClient, getContract } from "thirdweb";
import { base } from "thirdweb/chains";

const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || "af0d9fbd62c11a62bb15ff81e089858e";
const contractAddress = process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS || "0xba968fA5d5255d6D95bD23D69bA63De13ceFF731";

export const client = createThirdwebClient({
  clientId: clientId,
});

export const nftContract = getContract({
  client,
  chain: base,
  address: contractAddress,
});
