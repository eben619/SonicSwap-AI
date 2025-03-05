"use client"
import React from 'react';


interface HeaderProps {
  onPrivateKeyClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onPrivateKeyClick }) => {
  return (
    <nav className="fixed w-full bg-[#2f1cc6] backdrop-blur-sm z-50">
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex justify-between items-center">
        <div className="text-[#fab455] text-xl font-bold">SonicSwap AI</div>
        <button className="bg-[#fab455] hover:bg-[#d256c1] text-white px-4 py-2 rounded-md transition-colors">
          {"Enter Private Key"}
        </button>
      </div>
    </div>
  </nav>
  );
};

export default Header;