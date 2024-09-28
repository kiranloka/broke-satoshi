import React, { useState } from "react";
import useGenerate from "../hooks/Generate";
import { IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface GenerateWalletProps {
  blockchain: "Solana" | "Ethereum" | ""; // Accept blockchain as a prop
}

const GenerateWallet: React.FC<GenerateWalletProps> = ({ blockchain }) => {
  const { publicKey, generatedWallet } = useGenerate(blockchain);
  const [showPrivateKey, setShowPrivateKey] = useState(false); // State for toggling private key visibility

  if (!blockchain) return null; // Handle empty blockchain case

  return (
    <div className="m-10 outline outline-2 outline-slate-500 mb-5">
      <h2 className="flex justify-center p-3 font-bold">{blockchain} Wallet</h2>
      <h3 className="font-bold text-xl ml-5">Public Key</h3>
      <div className="w-[80%] p-3 m-5 mb-5 bg-slate-900">{publicKey}</div>

      <h3 className="font-bold text-xl ml-5">Private Wallet</h3>
      <div className="flex items-center">
        <div className="w-[80%] p-3 m-5 mb-5 bg-slate-900">
          {showPrivateKey ? generatedWallet : "●●●●●●●●●●●●●●●●●●"}{" "}
          {/* Hide private key */}
        </div>
        <IconButton
          onClick={() => setShowPrivateKey(!showPrivateKey)}
          color="primary"
          aria-label={showPrivateKey ? "Hide private key" : "Show private key"}
        >
          {showPrivateKey ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </div>
      <br />
    </div>
  );
};

export default GenerateWallet;
