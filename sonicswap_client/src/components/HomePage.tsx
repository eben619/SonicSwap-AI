"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const HomePage = () => {
    const [privateKey, setPrivateKey] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
  
    const isValidKey = (key: string): boolean => {
      return key.startsWith("0x") && key.length >= 10;
    };
  
    const handlePrivateKeySubmit = () => {
      if (isValidKey(privateKey)) {
        localStorage.setItem('authToken', privateKey);
        router.push('/dashboard');
      } else {
        setError('Private key must start with "0x" and be at least 10 characters long.');
      }
    };
  
    return (
        <main className="pt-32 pb-16 bg-[#ffffff]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#fab455] mb-6">
                SonicSwap AI
              </h1>
              <p className="text-[#fab455] text-lg md:text-xl max-w-2xl mx-auto">
                Protect your assets using artificial intelligence models for predicting and analyzing token volatility patterns. Real-time token swaps and monitoring.
              </p>
            </div>
  
            <div className="max-w-xl mx-auto mb-16">
              <div className="flex flex-col gap-4">
                <div className="flex">
                  <button
                    onClick={handlePrivateKeySubmit}
                    className="bg-[#fab455] hover:bg-[#d256c1] text-white px-6 py-3 
                             rounded-md transition-colors whitespace-nowrap"
                  >
                    Enter
                  </button>
                  <input
                    type="text"
                    value={privateKey}
                    onChange={(e) => {
                      setPrivateKey(e.target.value);
                      setError('');
                    }}
                    placeholder="Input your private key here (e.g., 0x12345678)"
                    className="flex-1 bg-[#fab455]/50 border border-blue-900/30 rounded-md px-4 py-3 
                             text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                {error && (
                  <p className="text-red-500 text-sm mt-2">{error}</p>
                )}
                <p className="text-[#fab455] text-l mt-2">
                  For testing, use any key starting with 0x and at least 10 characters (e.g., 0x12345678).
                </p>
              </div>
            </div>
          </div>
        </main>
    );
}

export default HomePage;
