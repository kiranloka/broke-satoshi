import { useRecoilValue } from "recoil";
import {
  ethereumWalletSelector,
  solanaWalletSelector,
} from "../recoil/selectors/selector";

interface SolanaWallet {
  publicKey: string;
  privateKey: string;
}

interface EthereumWallet {
  address: string;
  privateKey: string;
}

type WalletData = SolanaWallet | EthereumWallet;

const useGenerate = (blockchain: "Solana" | "Ethereum" | null) => {
  if (!blockchain) {
    return {
      blockchain,
      publicKey: "",
      generatedWallet: "",
    };
  }

  let walletData: WalletData;
  if (blockchain === "Solana") {
    walletData = useRecoilValue(solanaWalletSelector);
  } else if (blockchain === "Ethereum") {
    walletData = useRecoilValue(ethereumWalletSelector);
  } else {
    throw new Error("Unsupported Blockchain!");
  }

  return {
    blockchain,
    publicKey:
      "publicKey" in walletData ? walletData.publicKey : walletData.address,
    generatedWallet: walletData.privateKey,
  };
};

export default useGenerate;
