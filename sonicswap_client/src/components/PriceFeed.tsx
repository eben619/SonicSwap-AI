"use client";
import React, { useEffect, useState, useMemo } from "react";
import { tokens } from "@/lib/mockData";
import TokenPriceCard from "./TokenPriceCard";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { TokenPair } from "@/lib/types";
import { fetch_token_price } from '@/constant/agent_endpoint';

const PriceFeed: React.FC = () => {
  const [tokens_with_Price, setToken_with_Price] = useState<TokenPair[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  // Fetch token price data
  useEffect(() => {
    const fetch_token_price_feed = async () => {
      setIsLoading(true);
      try {
        const response = await fetch_token_price("sonic-3");
        console.log("Token price response:", response);

        if (!response || !response.market_data) {
          throw new Error("Invalid response data");
        }

        const baseToken = tokens.find((t) => t.id === "sonic");
        const quoteToken = tokens.find((t) => t.id === "usdt");

        if (!baseToken || !quoteToken) {
          throw new Error("Token not found");
        }

        setToken_with_Price([
          {
            id: response.id || "default-id",
            price: response.market_data.current_price?.usd || 0,
            volume24h: 10,
            priceChange24h: response.price_change_percentage_24h || 0,
            baseToken,
            quoteToken,
          },
        ]);
      } catch (error) {
        console.error("Error fetching token price:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetch_token_price_feed();
  }, []);

  // Group token pairs by quote token (stablecoin)
  const groupedPairs = useMemo(() => {
    return tokens_with_Price.reduce((acc, pair) => {
      const quoteToken = pair.quoteToken.id;
      if (!acc[quoteToken]) {
        acc[quoteToken] = [];
      }
      acc[quoteToken].push(pair);
      return acc;
    }, {} as Record<string, TokenPair[]>);
  }, [tokens_with_Price]);

  // Initialize expanded sections
  useEffect(() => {
    if (Object.keys(groupedPairs).length > 0) {
      setExpandedSections(
        Object.keys(groupedPairs).reduce((acc, key) => {
          acc[key] = true;
          return acc;
        }, {} as Record<string, boolean>)
      );
    }
  }, [groupedPairs, tokens_with_Price]);

  // Toggle expanded sections
  const toggleSection = (quoteTokenId: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [quoteTokenId]: !prev[quoteTokenId],
    }));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-3 md:space-y-0">
        <h2 className="text-xl font-semibold text-[#2f1cc6]">Price Feed</h2>
      </div>

      {isLoading ? (
        <div>Loading...</div>
      ) : Object.keys(groupedPairs).length === 0 ? (
        <div>No token pairs available.</div>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedPairs).map(([quoteTokenId, pairs]) => (
            <div key={quoteTokenId} className="space-y-3 border border-[#d256c1] rounded-lg p-3">
              <div
                onClick={() => toggleSection(quoteTokenId)}
                className="flex justify-between items-center cursor-pointer hover:bg-[#fab455] rounded-md p-2 transition-colors"
                role="button"
                aria-expanded={expandedSections[quoteTokenId]}
                aria-label={`Toggle ${pairs[0]?.quoteToken.name || "token"} pairs`}
              >
                <h3 className="text-lg font-medium text-[#2f1cc6]">
                  {pairs.length > 0 ? `${pairs[0].quoteToken.name} Pairs` : "No Pairs Available"}
                </h3>
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
      )}
    </div>
  );
};

export default PriceFeed;