import { useState } from "react";
import BlockchainViewer from "./BlockchainViewer";
import TransactionSender from "./TransactionSender";
import WalletCreator from "./WalletCreator";

const AllBlockChain = () => {
  const [wallet, setWallet] = useState(null);
  return (
    <>
      <h1>🧱 Blockchain Frontend</h1>
      <WalletCreator onWalletGenerated={setWallet} />
      {wallet && <TransactionSender senderWallet={wallet} />}
      <BlockchainViewer />
    </>
  );
};
export default AllBlockChain;