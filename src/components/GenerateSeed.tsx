import { Button, IconButton } from "@mui/material";
import { generateMnemonic } from "bip39";
import { useState } from "react";
import Typical from "react-typical";
import { FaCopy } from "react-icons/fa6";
import { useRecoilState } from "recoil";
import { mnemonicAtom } from "../recoil/atoms/atoms";
const GenerateSeed: React.FC = () => {
  const [secretPhrase, setSecretPhrase] = useRecoilState(mnemonicAtom);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(secretPhrase);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="m-10 outline outline-2 outline-slate-500 p-4 ">
      <div className="text-2xl m-1 font-bold flex justify-center">
        Generate Your Secret Phrase
      </div>
      <div className="flex justify-center mt-2">
        <Button
          variant="contained"
          onClick={() => {
            const pnemonic = generateMnemonic();
            setSecretPhrase(pnemonic);
          }}
        >
          Generate
        </Button>
      </div>
      {secretPhrase && (
        <div className="flex justify-center mt-4 text-xl font-mono">
          <Typical steps={[secretPhrase, 1000]} wrapper="span" />

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
