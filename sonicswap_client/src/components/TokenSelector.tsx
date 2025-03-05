import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Token } from '@/lib/types';

interface TokenSelectorProps {
  tokens: Token[];
  selectedToken: Token | null;
  onTokenSelect: (token: Token) => void;
  title: string;
  selectedVariant?: string;
}

const getTokenColor = (symbol: string): string => {
  const hash = symbol.split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);
  
  const colors = [
    "bg-purple-500", "bg-blue-500", "bg-green-500", 
    "bg-yellow-500", "bg-red-500", "bg-pink-500",
    "bg-indigo-500", "bg-teal-500", "bg-orange-500",
    "bg-cyan-500", "bg-lime-500", "bg-fuchsia-500"
  ];
  
  const index = Math.abs(hash) % colors.length;
  return colors[index];
};

const TokenSelector: React.FC<TokenSelectorProps> = ({
  tokens, 
  selectedToken, 
  onTokenSelect, 
  title,
}) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{title}</label>
      <div className="grid grid-cols-3 gap-2">
        {tokens.map(token => {
          const tokenColor = getTokenColor(token.symbol);
          const isSelected = selectedToken?.id === token.id;
          
          return (
            <Button
              key={token.id}
              variant={isSelected ? "default" : "outline"}
              className={cn(
                "h-20 flex flex-col items-center justify-center text-center",
                isSelected 
                  ? "bg-[#FF00FF] hover:bg-[#FF00FF]/90 text-white border-4 border-[#8B008B]" 
                  : "hover:bg-gray-100 border border-gray-400",
                "transition-all duration-200 font-bold tracking-wider"
              )}
              onClick={() => onTokenSelect(token)}
            >
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center mb-1 border-2", 
                isSelected 
                  ? "bg-white/20 border-white/50" 
                  : `${tokenColor} border-white/30`
              )}>
                <span className={cn(
                  "text-xs font-extrabold", 
                  isSelected ? "text-white" : "text-white"
                )}>
                  {token.symbol.substring(0, 1)}
                </span>
              </div>
              <span className="text-xs font-bold">{token.symbol}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default TokenSelector;