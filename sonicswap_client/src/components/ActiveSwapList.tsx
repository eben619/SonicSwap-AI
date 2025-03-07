import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { AlertTriangleIcon, ChevronDown, ChevronUp } from "lucide-react";
import { SwapConfig } from "@/lib/types";
import SendToken from "./SendToken";

interface ActiveSwapsListProps {
  swaps: SwapConfig[];
  onToggleSwap: (id: string) => void;
  onRemoveSwap: (id: string) => void;
  getTokenColor: (symbol: string) => string;
}

const ActiveSwapsList: React.FC<ActiveSwapsListProps> = ({
  swaps,
  onToggleSwap,
  onRemoveSwap,
  getTokenColor,
}) => {
  const [openTab, setOpenTab] = useState<"swaps" | "send" | null>("swaps");

  const toggleTab = (tab: "swaps" | "send") => {
    setOpenTab((prev) => (prev === tab ? null : tab));
  };

  return (
    <div className="border border-gray-300 rounded-lg">
      {/* Active Swaps Header */}
      <button
        onClick={() => toggleTab("swaps")}
        className="flex justify-between items-center w-full p-3 bg-gray-100 rounded-lg text-sm font-semibold"
      >
        Active Swaps & Send Token
        {openTab === "swaps" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {/* Active Swaps Content */}
      {openTab === "swaps" && (
        <div className="space-y-3 max-h-[280px] overflow-y-auto p-3">
          {swaps.length === 0 ? (
            <div className="flex flex-col items-center text-center py-4">
              <AlertTriangleIcon size={24} className="text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">No active swaps configured</p>
            </div>
          ) : (
            swaps.map((swap) => {
              const sourceTokenColor = getTokenColor(swap.sourceToken.symbol);
              const targetTokenColor = getTokenColor(swap.targetToken.symbol);

              return (
                <div
                  key={swap.id}
                  className="p-3 rounded-md border bg-white shadow-sm flex flex-col space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex -space-x-2">
                        <div className={cn("w-6 h-6 rounded-full flex items-center justify-center border", sourceTokenColor)}>
                          <span className="text-xs text-white">{swap.sourceToken.symbol[0]}</span>
                        </div>
                        <div className={cn("w-6 h-6 rounded-full flex items-center justify-center border", targetTokenColor)}>
                          <span className="text-xs text-white">{swap.targetToken.symbol[0]}</span>
                        </div>
                      </div>
                      <span className="text-sm font-medium ml-2">
                        {swap.sourceToken.symbol} → {swap.targetToken.symbol}
                      </span>
                    </div>

                    <Switch
                      checked={swap.isActive}
                      onCheckedChange={() => onToggleSwap(swap.id)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs bg-gray-100 text-gray-700 rounded-full px-2 py-0.5">
                      {swap.volatilityThreshold}% threshold
                    </span>

                    <button
                      className="text-xs text-red-500 hover:text-red-700 transition-colors"
                      onClick={() => onRemoveSwap(swap.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Send Tokens Header */}
      <button
        onClick={() => toggleTab("send")}
        className="flex justify-between items-center w-full p-3 bg-gray-100 rounded-lg text-sm font-semibold mt-2"
      >
        Send Tokens
        {openTab === "send" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {/* Send Token Content */}
      {openTab === "send" && (
        <div className="p-4">
          <SendToken />
        </div>
      )}
    </div>
  );
};

export default ActiveSwapsList;
