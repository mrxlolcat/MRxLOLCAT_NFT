import { createThirdwebClient, getContract } from "thirdweb";
import { base } from "thirdweb/chains";

export const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || "af0d9fbd62c11a62bb15ff81e089858e",
});

export const nftContract = getContract({
  client,
  chain: base,
  address: "0x3525fDbC54DC01121C8e12C3948187E6153Cdf25",
});

export const tokenContract = getContract({
  client,
  chain: base,
  address: "0x0000000000000000000000000000000000000000",
});
