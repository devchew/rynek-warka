import { useState, useEffect } from 'react';

export default function PageTransition() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    // Handle navigation events
    const handleNavigation = () => {
      setIsLoaded(false);
      setTimeout(() => {
        setIsLoaded(true);
      }, 50);
    };
    
    window.addEventListener('beforeunload', handleNavigation);
    
    return () => {
      window.removeEventListener('beforeunload', handleNavigation);
    };
  }, []);

  return (
    <>
      <div
        className={`fixed inset-0 bg-amber-600 z-50 transition-transform duration-500 ease-in-out ${
          isLoaded ? 'transform -translate-y-full' : 'transform translate-y-0'
        }`}
      >
        <div className="flex items-center justify-center h-full">
          <div className="flex flex-col items-center">
            <img src="/logo.png" alt="Rynek Kawiarnia Galeria" className="h-24 mb-4 animate-pulse" />
            <div className="flex space-x-2">
              <div className="w-2 h-2 rounded-full bg-white animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 rounded-full bg-white animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 rounded-full bg-white animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      >
        {/* Children are rendered inside Layout */}
      </div>
    </>
  );
}
