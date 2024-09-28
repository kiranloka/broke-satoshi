import { Button, IconButton } from "@mui/material";
import { generateMnemonic } from "bip39";
import { useState, useTransition } from "react";
import Typical from "react-typical";
import { FaCopy } from "react-icons/fa6";
import { useRecoilState } from "recoil";
import { mnemonicAtom } from "../recoil/atoms/atoms";
const GenerateSeed: React.FC = () => {
  const [secretPhrase, setSecretPhrase] = useRecoilState(mnemonicAtom);
  const [copied, setCopied] = useState(false);
  const [isPending, startTransition] = useTransition();
  const handleCopy = () => {
    navigator.clipboard.writeText(secretPhrase);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const handleGenerate = () => {
    startTransition(() => {
      const mnemonic = generateMnemonic();
      setSecretPhrase(mnemonic);
    });
  };
  return (
    <div className="m-10 outline outline-2 outline-slate-500 p-4">
      <div className="text-2xl m-1 font-bold flex justify-center">
        Generate Your Secret Phrase
      </div>
      <div className="flex justify-center mt-2">
        <Button
          variant="contained"
          onClick={handleGenerate}
          disabled={isPending} // Disable the button during the transition
        >
          {isPending ? "Generating..." : "Generate"}
        </Button>
      </div>
      {secretPhrase && (
        <div className="flex justify-center mt-4 text-xl font-mono">
          <Typical steps={[secretPhrase, 2000]} wrapper="span" />

          <IconButton onClick={handleCopy} color="primary" aria-label="copy">
            <FaCopy />
          </IconButton>

          {copied && <span className="text-green-500">Copied!</span>}
        </div>
      )}
    </div>
  );
};

export default GenerateSeed;
