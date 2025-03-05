"use client";
import React, { useState } from "react";
import { tokenPairs } from "@/lib/mockData";
import TokenPriceCard from "./TokenPriceCard";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

const PriceFeed: React.FC = () => {
  // Group token pairs by quote token (stablecoin)
  const groupedPairs = tokenPairs.reduce((acc, pair) => {
    const quoteToken = pair.quoteToken.id;
    if (!acc[quoteToken]) {
      acc[quoteToken] = [];
    }
    acc[quoteToken].push(pair);
    return acc;
  }, {} as Record<string, typeof tokenPairs>);

  // State to track which sections are expanded
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(() => {
    return Object.keys(groupedPairs).reduce((acc, key) => {
      acc[key] = true; // Start with all sections expanded
      return acc;
    }, {} as Record<string, boolean>);
  });

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-3 md:space-y-0">
        <h2 className="text-xl font-semibold text-[#2f1cc6]">Price Feed</h2>
      </div>

      <div className="space-y-6">
        {Object.entries(groupedPairs).map(([quoteTokenId, pairs]) => (
          <div key={quoteTokenId} className="space-y-3 border border-[#d256c1] rounded-lg p-3">
            <div
              onClick={() => toggleSection(quoteTokenId)}
              className="flex justify-between items-center cursor-pointer hover:bg-[#fab455] rounded-md p-2 transition-colors"
            >
              <h3 className="text-lg font-medium text-[#2f1cc6]">{pairs[0].quoteToken.name} Pairs</h3>
              {expandedSections[quoteTokenId] ? (
                <ChevronUpIcon size={20} className="text-[#d256c1]" />
              ) : (
                <ChevronDownIcon size={20} className="text-[#d256c1]" />
              )}
            </div>

            {expandedSections[quoteTokenId] && (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                {pairs.map((pair) => (
                  <TokenPriceCard 
                    key={pair.id} 
                    tokenPair={pair} 
                    className="opacity-100 transition-opacity duration-500"
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PriceFeed;
