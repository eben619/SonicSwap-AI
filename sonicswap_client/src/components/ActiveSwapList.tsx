import React from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { AlertTriangleIcon } from 'lucide-react';
import { SwapConfig } from '@/lib/types';

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
  getTokenColor 
}) => {
  if (swaps.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-8">
        <AlertTriangleIcon size={24} className="text-muted-foreground mb-2" />
        <p className="text-sm text-muted-foreground">No active swaps configured</p>
        <p className="text-xs text-muted-foreground mt-1">
          Configure a new swap to get started
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3 max-h-[280px] overflow-y-auto no-scrollbar">
      {swaps.map(swap => {
        const sourceTokenColor = getTokenColor(swap.sourceToken.symbol);
        const targetTokenColor = getTokenColor(swap.targetToken.symbol);
        
        return (
          <div 
            key={swap.id} 
            className="p-3 rounded-md border border-border bg-background/50 flex flex-col space-y-2 animate-slide-in"
            style={{ 
              animationDelay: `${swaps.indexOf(swap) * 0.1}s`,
              animationFillMode: 'forwards' 
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex -space-x-2">
                  <div className={cn("w-6 h-6 rounded-full flex items-center justify-center z-10 border border-border", sourceTokenColor)}>
                    <span className="text-[10px] font-medium text-white">{swap.sourceToken.symbol.substring(0, 1)}</span>
                  </div>
                  <div className={cn("w-6 h-6 rounded-full flex items-center justify-center border border-border", targetTokenColor)}>
                    <span className="text-[10px] font-medium text-white">{swap.targetToken.symbol.substring(0, 1)}</span>
                  </div>
                </div>
                <span className="text-sm font-medium ml-1">
                  {swap.sourceToken.symbol} → {swap.targetToken.symbol}
                </span>
              </div>
              
              <Switch
                checked={swap.isActive}
                onCheckedChange={() => onToggleSwap(swap.id)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-xs bg-navy/10 text-navy rounded-full px-2 py-0.5">
                  {swap.volatilityThreshold}% threshold
                </span>
              </div>
              
              <button 
                className="text-xs text-red-500 hover:text-red-700 transition-colors"
                onClick={() => onRemoveSwap(swap.id)}
              >
                Remove
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ActiveSwapsList;