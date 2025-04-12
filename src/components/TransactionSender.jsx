import { useState } from "react";

function TransactionSender({ senderWallet }) {
  const [receiver, setReceiver] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState(""); // ✅ To show backend message

  const sendTransaction = async () => {
    const transaction = {
      sender: senderWallet.address,
      receiver,
      amount: Number(amount),
      public_key: senderWallet.public_key,
      private_key: senderWallet.private_key,  // Ensure this is a string
    };
  
    try {
      const res = await fetch("http://localhost:5000/transaction/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transaction),
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        setMessage(`❌ Error: ${data.message}`);
      } else {
        setMessage(`✅ Success: ${data.message}`);
        setReceiver("");
        setAmount("");
      }
    } catch (err) {
      setMessage("❌ Network error. Try again.");
    }
  };
  

  return (
    <div>
      <h2>Send Transaction</h2>
      <input
        type="text"
        placeholder="Receiver address"
        value={receiver}
        onChange={(e) => setReceiver(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={sendTransaction}>Send</button>

      {/* ✅ Message from backend */}
      {message && <p>{message}</p>}
    </div>
  );
}

export default TransactionSender;
