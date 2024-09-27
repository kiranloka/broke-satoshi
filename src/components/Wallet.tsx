import React, { useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { blockchainSelectionAtom } from "../recoil/atoms/atoms";
import { useRecoilState } from "recoil";
import GenerateWallet from "./GenerateWallet";

const WalletComponent: React.FC = () => {
  const [blockchain, setBlockChain] = useRecoilState(blockchainSelectionAtom); // Recoil for blockchain selection
  const [showWallet, setShowWallet] = useState(false); // State to control when to show the wallet

  const handleChange = (event: SelectChangeEvent<string>) => {
    setBlockChain(event.target.value as "Solana" | "Ethereum");
  };

  const handleGenerate = () => {
    if (blockchain) {
      setShowWallet(true);
    }
  };

  return (
    <div>
      <div className="flex justify-center">
        <FormControl
          color="secondary"
          variant="outlined"
          sx={{
            m: 1,
            minWidth: 190,
            minHeight: 50,
            backgroundColor: "white",
            opacity: "inherit",
          }}
        >
          <InputLabel id="demo-simple-select-standard-label" className="w-full">
            Choose Blockchain
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            label="Choose blockchain"
            className="w-full"
            value={blockchain}
            onChange={handleChange}
          >
            <MenuItem value="Solana">Solana</MenuItem>
            <MenuItem value="Ethereum">Ethereum</MenuItem>
          </Select>
        </FormControl>
        <div className="flex text-xs px-2 py-1">
          <Button
            variant="text"
            sx={{ color: "light-blue" }}
            className="rounded hover:bg-slate-800"
            onClick={handleGenerate}
          >
            Generate
          </Button>
        </div>
      </div>

      {showWallet && <GenerateWallet blockchain={blockchain} />}
    </div>
  );
};

export default WalletComponent;
