"use client";
import { useRouter } from 'next/navigation';

const HomePage = () => {
    const router = useRouter();

    const handleGetStarted = () => {
        router.push('/dashboard');
    };

    return (
        <main className="pt-32 pb-16 bg-[#ffffff] flex justify-center items-center min-h-screen">
            <div className="text-center">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#fab455] mb-6">
                    SonicSwap AI
                </h1>
                <p className="text-[#fab455] text-lg md:text-xl max-w-2xl mx-auto mb-8">
                    Protect your assets using artificial intelligence models for predicting and analyzing token volatility patterns. 
                    Real-time token swaps and monitoring.
                </p>
                <button
                    onClick={handleGetStarted}
                    className="bg-[#fab455] hover:bg-[#d256c1] text-white px-6 py-3 rounded-md 
                               transition-colors text-lg"
                >
                    Get Started
                </button>
            </div>
        </main>
    );
};

export default HomePage;
