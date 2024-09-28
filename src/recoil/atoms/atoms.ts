import { atom } from "recoil";

export const currentIndexAtom = atom<number>({
  key: "currentIndexAtom",
  default: 0,
});

export const mnemonicAtom = atom<string>({
  key: "mnemonicAtom",
  default: "",
});

export const publicKeyAtom = atom<string[]>({
  key: "publicKeyAtom",
  default: [],
});

export const privateKeyAtom = atom<string[]>({
  key: "privateKeyAtom",
  default: [],
});

export const blockchainSelectionAtom = atom<"Solana" | "Ethereum" | "">({
  key: "blockchainSelectionAtom",
  default: "",
});
