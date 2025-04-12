import { useEffect, useState } from 'react';
import axios from 'axios';

const BlockchainViewer = () => {
  const [chain, setChain] = useState([]);

  const fetchChain = async () => {
    const res = await axios.get('http://127.0.0.1:5000/chain');
    setChain(res.data);
  };

  return (
    <div>
      <h2>Blockchain</h2>
      <button onClick={fetchChain}>Refresh Chain</button>
      <pre>{JSON.stringify(chain, null, 2)}</pre>
    </div>
  );
};

export default BlockchainViewer;
