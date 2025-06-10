import { useState } from 'react';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <div className="md:hidden">
      <button 
        onClick={toggleMenu}
        className="text-stone-700 hover:text-amber-700 focus:outline-none"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {!isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        )}
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-md py-4 px-4 z-50">
          <ul className="flex flex-col space-y-4">
            <li><a href="/" className="block text-stone-700 hover:text-amber-700 font-medium transition-colors">Start</a></li>
            <li><a href="/o-nas" className="block text-stone-700 hover:text-amber-700 font-medium transition-colors">O nas</a></li>
            <li><a href="/kawiarnia" className="block text-stone-700 hover:text-amber-700 font-medium transition-colors">Kawiarnia</a></li>
            <li><a href="/galeria" className="block text-stone-700 hover:text-amber-700 font-medium transition-colors">Galeria</a></li>
            <li><a href="/kontakt" className="block text-stone-700 hover:text-amber-700 font-medium transition-colors">Gdzie jesteśmy</a></li>
          </ul>
        </div>
      )}
    </div>
  );
}
