"use client"
import React, { useEffect, useState } from 'react';
import { 
  CustomCard, 
  CustomCardHeader, 
  CustomCardTitle, 
  CustomCardContent, 
  CustomCardFooter 
} from './ui/CustomCard';
import { Button } from '@/components/ui/button';
import { PlusIcon, Settings2Icon } from 'lucide-react';
import { toast } from 'sonner';
import { tokens, swapConfigs } from '@/lib/mockData';
import { Token, SwapConfig } from '@/lib/types';

import TokenSelector from './TokenSelector';
import VolatilityThresholdSlider from './VolatilitySlider';
import ActiveSwapsList from './ActiveSwapList';
import { Get_server_Status } from '@/constant/agent_endpoint';
import { List_agents,Start_Agent,Stop_Agent,Load_agent,Agent_Action,List_Actions,fetch_token_price } from '@/constant/agent_endpoint';
// "use client";
// import React, { useState } from "react";
// import {
//   CustomCard,
//   CustomCardHeader,
//   CustomCardTitle,
//   CustomCardContent,
//   CustomCardFooter,
// } from "./ui/CustomCard";
// import { Button } from "@/components/ui/button";
// import { PlusIcon, Settings2Icon } from "lucide-react";
// import { toast } from "sonner";
// import { tokens, swapConfigs } from "@/lib/mockData";
// import { Token, SwapConfig } from "@/lib/types";

// import TokenSelector from "./TokenSelector";
// import VolatilityThresholdSlider from "./VolatilitySlider";
// import ActiveSwapsList from "./ActiveSwapList";

const getTokenColor = (symbol: string): string => {
  const hash = symbol.split("").reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);

  const colors = [
    "bg-purple-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-red-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-teal-500",
    "bg-orange-500",
    "bg-cyan-500",
    "bg-lime-500",
    "bg-fuchsia-500",
  ];

  const index = Math.abs(hash) % colors.length;
  return colors[index];
};

const SwapPanel: React.FC = () => {
  const [sourceToken, setSourceToken] = useState<Token | null>(null);
  const [targetToken, setTargetToken] = useState<Token | null>(null);
  const [volatilityThreshold, setVolatilityThreshold] = useState<number>(10);
  const [isActiveSwaps, setIsActiveSwaps] = useState<SwapConfig[]>(swapConfigs.filter(s => s.isActive));
  const [serverStatus,setServerstatus]= useState<number | null |string>()
  
  // const volatileTokens = tokens.filter(t => t.type === 'volatile');
  // const stableTokens = tokens.filter(t => t.type === 'stable');
  // const swaptokensIn = []
  // const [isActiveSwaps, setIsActiveSwaps] = useState<SwapConfig[]>(
  //   swapConfigs.filter((s) => s.isActive)
  // );

  const volatileTokens = tokens.filter((t) => t.type === "volatile");
  const stableTokens = tokens.filter((t) => t.type === "stable");

  const handleCreateSwap = () => {
    if (!sourceToken || !targetToken) {
      toast.error("Please select both source and target tokens");
      return;
    }

    const newSwap: SwapConfig = {
      id: `new-${Date.now()}`,
      sourceToken,
      targetToken,
      volatilityThreshold,
      isActive: true,
      createdAt: new Date().toISOString(),
    };

    setIsActiveSwaps((prev) => [...prev, newSwap]);
    toast.success("New swap configuration added");

    // Reset form
    setSourceToken(null);
    setTargetToken(null);
    setVolatilityThreshold(10);
  };

  const handleToggleSwap = (id: string) => {
    setIsActiveSwaps((prev) =>
      prev.map((swap) =>
        swap.id === id ? { ...swap, isActive: !swap.isActive } : swap
      )
    );
  };

  const handleRemoveSwap = (id: string) => {
    setIsActiveSwaps((prev) => prev.filter((swap) => swap.id !== id));
    toast.success("Swap configuration removed");
  };

  const resetForm = () => {
    setSourceToken(null);
    setTargetToken(null);
    setVolatilityThreshold(10);
  };

  useEffect(()=>{
    const fetchServerStatus = async () => {
      try {
        
        // const result = await Get_server_Status()
        //  console.log("the server status is",result)
        // console.log("results",result)
        // const agents = await List_agents()
        // console.log("agents",agents.agents)

        // const loaded_Agent = await Load_agent("sonic-swap")
        // console.log("loaded agent",loaded_Agent?.agent)
        // const List_Agent_Actions = await List_Actions("sonic")
        // console.log("list agent actions",List_Agent_Actions)
      //  const resultForAction = await Agent_Action({action:"get-balance",connection:"sonic",params:["0x00A1A59A636858BD18b577Bb3f9Ee368Db9fcE66"]})
      //  console.log("result for action",resultForAction.result)
      //  const resultForAction2 = await Agent_Action({action:"transfer",connection:"sonic",params:["0x65E28C9C4Ef1a756d8df1c507b7A84eFcF606fd4","1.00"]})
      //  console.log("result for action 22",resultForAction2.result)
      // const resultForActionSwap = await Agent_Action({action:"swap",connection:"sonic",params:["0x65E28C9C4Ef1a756d8df1c507b7A84eFcF606fd4","1.00"]})
      // console.log("result for action swap",resultForActionSwap.result)

        
          //setServerstatus(result)
          const result = await fetch_token_price("sonic-3")
          //console.log("token price",result.market_data.current_price.usd)
          console.log("token Prices",result)
       
      }catch (error){
        console.error(error)


      }}
      fetchServerStatus()

  })
  
  return (
    <div className="space-y-4 animate-fade-in pt-19" style={{ animationDelay: "0.1s" }}>
      <h2 className="text-xl font-display font-semibold">Swap Configuration</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Swap Configuration Section */}
        <CustomCard className="lg:col-span-2">
          <CustomCardHeader>
            <CustomCardTitle>Configure New Swap</CustomCardTitle>
          </CustomCardHeader>

          <CustomCardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TokenSelector
                tokens={volatileTokens}
                selectedToken={sourceToken}
                onTokenSelect={setSourceToken}
                title="Volatile Token (Source)"
                selectedVariant="bg-amber"
              />

              <TokenSelector
                tokens={stableTokens}
                selectedToken={targetToken}
                onTokenSelect={setTargetToken}
                title="Stablecoin (Target)"
                selectedVariant="bg-navy"
              />
            </div>

            <VolatilityThresholdSlider value={volatilityThreshold} onValueChange={setVolatilityThreshold} />
          </CustomCardContent>

          <CustomCardFooter className="justify-end">
            <Button variant="outline" size="sm" className="mr-2" onClick={resetForm}>
              Reset
            </Button>
            <Button
              onClick={handleCreateSwap}
              className="bg-purple-500 hover:bg-purple-600 text-white font-bold shadow-md hover:shadow-lg transition-all duration-300"
            >
              <PlusIcon size={16} className="mr-1" />
              Create Swap
            </Button>
          </CustomCardFooter>
        </CustomCard>

        {/* Active Swaps & Send Tokens Section */}
        <div className="space-y-4">
          <CustomCard className="h-full">
            <CustomCardHeader>
              <CustomCardTitle className="flex items-center justify-between">
                <span>Active Swaps & Send Token</span>
                <Settings2Icon size={16} className="text-muted-foreground" />
              </CustomCardTitle>
            </CustomCardHeader>

            <CustomCardContent>
              {/* Active Swaps & Send Tokens are inside this component now */}
              <ActiveSwapsList
                swaps={isActiveSwaps}
                onToggleSwap={handleToggleSwap}
                onRemoveSwap={handleRemoveSwap}
                getTokenColor={getTokenColor}
              />
            </CustomCardContent>
          </CustomCard>
        </div>
      </div>
    </div>
  );
};

export default SwapPanel;
