import React, { useState, useTransition } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useRecoilState } from "recoil";
import { blockchainSelectionAtom } from "../recoil/atoms/atoms";
import GenerateWallet from "./GenerateWallet";

// Define the type for blockchain selection
type BlockchainType = "Solana" | "Ethereum" | "";

const WalletComponent: React.FC = () => {
  const [blockchain, setBlockChain] = useRecoilState<BlockchainType>(
    blockchainSelectionAtom,
  );
  const [wallets, setWallets] = useState<BlockchainType[]>([]); // array of blockchain types
  const [isPending, startTransition] = useTransition();

  const handleChange = (event: SelectChangeEvent<string>) => {
    setBlockChain(event.target.value as BlockchainType); // Ensure type is correctly set
  };

  const handleGenerate = () => {
    startTransition(() => {
      if (blockchain) {
        setWallets((prevWallets) => [...prevWallets, blockchain]);
      }
    });
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
          <InputLabel id="blockchain-select-label" className="w-full">
            Choose Blockchain
          </InputLabel>
          <Select
            labelId="blockchain-select-label"
            id="blockchain-select"
            label="Choose Blockchain"
            className="w-full"
            value={blockchain}
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>Choose</em>
            </MenuItem>
            <MenuItem value="Solana">Solana</MenuItem>
            <MenuItem value="Ethereum">Ethereum</MenuItem>
          </Select>
        </FormControl>
        <div className="flex text-xs px-2 py-1">
          <Button
            variant="contained"
            sx={{ color: "light-blue" }}
            className="rounded hover:bg-slate-800"
            onClick={handleGenerate}
            disabled={isPending}
          >
            {isPending ? "Generating..." : "Generate"}
          </Button>
        </div>
      </div>
      {isPending && <div>...Loading</div>}
      <div>
        {wallets.map((wallet, index) => (
          <GenerateWallet key={index} blockchain={wallet} />
        ))}
      </div>
    </div>
  );
};

export default WalletComponent;
