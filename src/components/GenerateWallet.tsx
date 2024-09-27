import React from "react";
import useGenerate from "../hooks/Generate";

interface GenerateWalletProps {
  blockchain: "Solana" | "Ethereum" | null; // Accept blockchain as a prop
}

const GenerateWallet: React.FC<GenerateWalletProps> = ({ blockchain }) => {
  if (!blockchain) return null;
  const { publicKey, generatedWallet } = useGenerate(blockchain);

  if (!blockchain) return null;

  return (
    <div className="m-10 outline outline-2 outline-slate-500">
      <h2 className="flex justify-center p-3 font-bold">{blockchain} Wallet</h2>
      <h3 className="font-bold text-xl ml-5">Public Key</h3>
      <div className="w-[70%] p-3 m-5 mb-5 bg-slate-900">{publicKey}</div>
      <h3 className="font-bold text-xl ml-5">Private Wallet</h3>
      <div className="w-70% p-3 m-5 mb-5 bg-slate-900">
        {generatedWallet || "Loading..."}
      </div>
    </div>
  );
};

export default GenerateWallet;
