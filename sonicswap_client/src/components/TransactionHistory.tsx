"use client"
import React from 'react';
import { 
  CustomCard, 
  CustomCardHeader, 
  CustomCardTitle, 
  CustomCardContent 
} from './ui/CustomCard';
import { swapTransactions } from '@/lib/mockData';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { ArrowDownIcon, ArrowRightIcon, ArrowUpIcon, CheckIcon, ExternalLinkIcon, XIcon } from 'lucide-react';

const TransactionHistory: React.FC = () => {
  return (
    <div className="space-y-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
      <h2 className="text-xl font-display font-semibold">Transaction History</h2>
      
      <CustomCard>
        <CustomCardHeader>
          <CustomCardTitle>Recent Swaps</CustomCardTitle>
        </CustomCardHeader>
        
        <CustomCardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Swap</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Amount</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Value</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Date</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Status</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">TxHash</th>
                </tr>
              </thead>
              <tbody>
                {swapTransactions.map((tx, index) => {
                  const txDate = new Date(tx.date);
                  
                  return (
                    <tr 
                      key={tx.id}
                      className={cn(
                        "border-b border-border last:border-0 transition-colors hover:bg-muted/20 animate-slide-in",
                      )}
                      style={{ 
                        animationDelay: `${index * 0.05}s`,
                        animationFillMode: 'forwards'
                      }}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <div className="flex -space-x-2 mr-2">
                            <div className="w-6 h-6 rounded-full bg-amber/10 flex items-center justify-center z-10 border border-border">
                              <span className="text-[10px] font-medium">{tx.sourceToken?.symbol}</span>
                            </div>
                            <div className="w-6 h-6 rounded-full bg-navy/10 flex items-center justify-center border border-border">
                              <span className="text-[10px] font-medium">{tx.targetToken?.symbol}</span>
                            </div>
                          </div>
                          <div className="flex items-center text-sm">
                            <span className="font-medium">{tx.sourceToken?.symbol}</span>
                            <ArrowRightIcon size={12} className="mx-1 text-muted-foreground" />
                            <span className="font-medium">{tx.targetToken?.symbol}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm">
                          {tx.sourceAmount?.toLocaleString()} {tx.sourceToken?.symbol}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm">
                          {tx.targetAmount?.toLocaleString()} {tx.targetToken?.symbol}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm">
                          {format(txDate, 'MMM dd, yyyy')}
                        </span>
                        <div className="text-xs text-muted-foreground">
                          {format(txDate, 'HH:mm:ss')}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className={cn(
                          "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
                          tx.status === 'completed' ? "bg-green-100 text-green-800" :
                          tx.status === 'pending' ? "bg-amber/10 text-amber" :
                          "bg-red-100 text-red-800"
                        )}>
                          {tx.status === 'completed' ? (
                            <CheckIcon size={12} className="mr-1" />
                          ) : tx.status === 'pending' ? (
                            <span className="w-2 h-2 rounded-full bg-amber mr-1 animate-pulse-soft" />
                          ) : (
                            <XIcon size={12} className="mr-1" />
                          )}
                          <span>{tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        {tx.txHash ? (
                          <div className="flex items-center">
                            <span className="text-sm font-mono text-muted-foreground">
                              {tx.txHash.substring(0, 8)}...{tx.txHash.substring(tx.txHash.length - 8)}
                            </span>
                            <button className="ml-2 text-navy hover:text-navy/80 transition-colors">
                              <ExternalLinkIcon size={14} />
                            </button>
                          </div>
                        ) : (
                          <span className="text-sm text-muted-foreground">-</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CustomCardContent>
      </CustomCard>
    </div>
  );
};

export default TransactionHistory;