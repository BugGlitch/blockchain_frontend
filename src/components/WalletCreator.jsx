import { useState } from 'react';
import axios from 'axios';

const WalletCreator = ({ onWalletGenerated }) => {
  const [wallet, setWallet] = useState(null);

  const createWallet = async () => {
    const res = await axios.get('http://127.0.0.1:5000/wallet/new');
    setWallet(res.data);
    onWalletGenerated(res.data); // send wallet to parent
  };

  return (
    <div>
      <h2>Create Wallet</h2>
      <button onClick={createWallet}>Generate Wallet</button>
      {wallet && (
        <pre>{JSON.stringify(wallet, null, 2)}</pre>
      )}
    </div>
  );
};

export default WalletCreator;
