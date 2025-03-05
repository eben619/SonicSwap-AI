
import React from 'react';
import Header from '@/components/Header';
import PriceFeed from '@/components/PriceFeed';
import SwapPanel from '@/components/SwapPanel';
import TransactionHistory from '@/components/TransactionHistory';

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      
      <main className="flex-1 container mx-auto py-6 px-4 sm:px-6 space-y-8">
        <SwapPanel />
        <PriceFeed />
        <TransactionHistory />
      </main>
    </div>
  );
};

export default Dashboard;