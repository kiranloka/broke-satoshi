import "./App.css";
import { FaGoogleWallet } from "react-icons/fa6";
import GenerateSeed from "./components/GenerateSeed";
import { RecoilRoot } from "recoil";
import WalletComponent from "./components/Wallet";

function App() {
  return (
    <RecoilRoot>
      <>
        <div className="ml-7">
          <div className="text-3xl font-bold  mt-7">
            <FaGoogleWallet />
          </div>

          <h1 className="text-5xl font-bold mt-10 ">Broke Sathoshi Wallet</h1>
          <p>Generate your own solana and ethereum wallets</p>
        </div>

        <div>
          <GenerateSeed />
        </div>
        <div>
          <WalletComponent />
        </div>
      </>
    </RecoilRoot>
  );
}
export default App;
