"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { tokens } from "@/lib/mockData";
import { Token } from "@/lib/types";
import { List_agents,Start_Agent,Stop_Agent,Load_agent,Agent_Action,List_Actions,fetch_token_price } from '@/constant/agent_endpoint';

const SendToken: React.FC = () => {
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");

  const handleSend = async() => {
    if (!selectedToken || !recipient || !amount) {
      alert("Please fill in all fields");
      return;
    }
    alert(`Sending ${amount} ${selectedToken.symbol} to ${recipient}`);
    const res = await Agent_Action({action:"transfer",connection:"sonic",params:[recipient,amount]})
    console.log("result is sending",res.result)
    if (res?.status == "success"){
      alert(`Transaction successful${res.result}`)
    }else{
      alert(`Transaction failed ${res.result}`)
    }
  };

  return (
    <div className="space-y-3">
      {/* Token Selector */}
      <select
        value={selectedToken?.symbol || ""}
        onChange={(e) => {
          const token = tokens.find((t) => t.symbol === e.target.value) || null;
          setSelectedToken(token);
        }}
        className="w-full border border-gray-300 rounded-lg p-2"
      >
        <option value="">Select Token</option>
        {tokens.map((token) => (
          <option key={token.symbol} value={token.symbol}>
            {token.name} ({token.symbol})
          </option>
        ))}
      </select>

      {/* Balance Placeholder */}
      <p className="text-sm text-gray-500">
        Balance: <span className="font-semibold">0.00</span> {selectedToken?.symbol || ""}
      </p>

      {/* Recipient Address Input */}
      <Input
        type="text"
        placeholder="Recipient Address"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        className="w-full"
      />

      {/* Amount Input */}
      <Input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full"
      />

      {/* Send Button */}
      <Button onClick={handleSend} className="w-full bg-blue-500 hover:bg-blue-600 text-white">
        Send
      </Button>
    </div>
  );
};

export default SendToken;
