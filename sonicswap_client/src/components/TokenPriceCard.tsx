"use client"
import React from 'react';
import { TokenPair } from '@/lib/types';
import { CustomCard, CustomCardContent } from './ui/CustomCard';
import { cn } from '@/lib/utils';
import { ArrowDownIcon, ArrowUpIcon, BarChart2Icon } from 'lucide-react';

interface TokenPriceCardProps {
  tokenPair: TokenPair;
  className?: string;
  styleProps?: React.CSSProperties;
}

// Function to generate deterministic color based on token symbol
const getTokenColor = (symbol: string): string => {
  // A simple hash function to get a number from a string
  const hash = symbol.split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);
  
  // Generate colors based on the hash
  const colors = [
    "bg-purple-500", "bg-blue-500", "bg-green-500", 
    "bg-yellow-500", "bg-red-500", "bg-pink-500",
    "bg-indigo-500", "bg-teal-500", "bg-orange-500",
    "bg-cyan-500", "bg-lime-500", "bg-fuchsia-500"
  ];
  
  // Use hash to select a color
  const index = Math.abs(hash) % colors.length;
  return colors[index];
};

const TokenPriceCard: React.FC<TokenPriceCardProps> = ({ tokenPair, className, styleProps }) => {
  const { baseToken, quoteToken, price, priceChange24h } = tokenPair;
  const isPriceUp = priceChange24h >= 0;
  
  // Get color classes for the tokens
  const baseTokenColor = getTokenColor(baseToken.symbol);

  return (
    <CustomCard 
      gradient 
      hover
      className={cn(
        "overflow-hidden animate-scale-in border-amber border-2 h-full", 
        className
      )}
      style={styleProps}
    >
      <CustomCardContent className="p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <div className={cn("w-6 h-6 rounded-full flex items-center justify-center mr-1.5", baseTokenColor)}>
              <span className="text-xs font-semibold text-white">{baseToken.symbol.substring(0, 1)}</span>
            </div>
            <div>
              <h3 className="font-medium text-xs">{baseToken.symbol}/{quoteToken.symbol}</h3>
              <p className="text-xs text-muted-foreground truncate max-w-[80px]">{baseToken.name}</p>
            </div>
          </div>
          <BarChart2Icon size={14} className="text-muted-foreground" />
        </div>
        
        <div className="flex justify-between items-end">
          <div>
            <p className="text-base font-display font-semibold">${price.toFixed(4)}</p>
            <div className={cn(
              "flex items-center text-xs font-medium",
              isPriceUp ? "text-green-500" : "text-red-500"
            )}>
              {isPriceUp ? (
                <ArrowUpIcon size={10} className="mr-0.5" />
              ) : (
                <ArrowDownIcon size={10} className="mr-0.5" />
              )}
              <span>{Math.abs(priceChange24h).toFixed(2)}%</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Vol 24h</p>
            <p className="text-xs font-medium">${(tokenPair.volume24h / 1000000).toFixed(1)}M</p>
          </div>
        </div>
      </CustomCardContent>
    </CustomCard>
  );
};

export default TokenPriceCard;