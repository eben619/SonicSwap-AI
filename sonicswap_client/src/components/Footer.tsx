import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#2f1cc6] py-8 w-full">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center text-[#fab455] w-full">
          <p>&copy; {new Date().getFullYear()} SonicSwap AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;