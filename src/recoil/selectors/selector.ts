import { selector } from "recoil";
import { currentIndexAtom, mnemonicAtom } from "../atoms/atoms";
import { mnemonicToSeed, validateMnemonic } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import { HDNodeWallet, Wallet } from "ethers";
import nacl from "tweetnacl";
import { Mnemonic } from "ethers";

interface SolanaWallet {
  publicKey: string;
  privateKey: string;
}

interface EthereumWallet {
  address: string;
  privateKey: string;
}

export const solanaWalletSelector = selector<SolanaWallet>({
  key: "solanaWalletSelector",
  get: async ({ get }) => {
    const mnemonic = get(mnemonicAtom);
    const currentIndex = get(currentIndexAtom);
    if (!validateMnemonic(mnemonic)) {
      throw new Error("Invalid mnemonic");
    }
    const seed = await mnemonicToSeed(mnemonic);
    const path = `m/44'/501'/${currentIndex}'/0'`;
    const derivedSeed = derivePath(path, seed.toString("hex")).key;

    const keypair = nacl.sign.keyPair.fromSeed(derivedSeed);

    const solanaKeypair = Keypair.fromSecretKey(keypair.secretKey);
    return {
      publicKey: solanaKeypair.publicKey.toString(),
      privateKey: Buffer.from(solanaKeypair.secretKey).toString("hex"),
    };
  },
  set: ({ set }) => {
    set(currentIndexAtom, (prevIndex) => prevIndex + 1);
  },
});

export const ethereumWalletSelector = selector<EthereumWallet>({
  key: "ethereumWalletSelector",
  get: async ({ get }) => {
    const mnemonicPhrase: string = get(mnemonicAtom);
    const currentIndex: number = get(currentIndexAtom);

    const mnemonic = Mnemonic.fromPhrase(mnemonicPhrase);
    const seed = mnemonic.computeSeed();

    const derivationPath = `m/44'/60'/${currentIndex}'/0'`;

    const hdNode = HDNodeWallet.fromSeed(seed);
    const child = hdNode.derivePath(derivationPath);
    const wallet = new Wallet(child.privateKey);
    return {
      address: wallet.address,
      privateKey: wallet.privateKey, // Hex-encoded private key
    };
  },
  set: ({ set }) => {
    set(currentIndexAtom, (prevIndex) => prevIndex + 1);
  },
});
