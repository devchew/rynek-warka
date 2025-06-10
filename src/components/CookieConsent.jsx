import { useState, useEffect } from 'react';

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);
  
  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem('cookieConsent');
    if (!hasConsented) {
      // Show the consent dialog after a slight delay
      const timer = setTimeout(() => {
        setShowConsent(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, []);
  
  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'true');
    setShowConsent(false);
  };
  
  const declineCookies = () => {
    localStorage.setItem('cookieConsent', 'false');
    setShowConsent(false);
  };
  
  if (!showConsent) return null;
  
  return (
    <div className="fixed bottom-0 inset-x-0 z-50 bg-white shadow-lg border-t border-stone-200 px-4 py-6 sm:px-6 lg:px-8 transform transition-transform duration-500 ease-in-out">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-medium text-stone-800">🍪 Używamy ciasteczek</h3>
          <p className="mt-1 text-sm text-stone-600">
            Nasza strona używa plików cookies do poprawy doświadczenia użytkownika.
            Korzystając z tej strony wyrażasz zgodę na używanie przez nas plików cookies zgodnie z polityką prywatności.
          </p>
        </div>
        <div className="flex gap-3 shrink-0">
          <button 
            onClick={declineCookies}
            className="px-4 py-2 text-sm font-medium text-stone-600 hover:text-stone-800 transition-colors"
          >
            Odrzuć
          </button>
          <button 
            onClick={acceptCookies}
            className="px-4 py-2 text-sm font-medium bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors shadow-sm"
          >
            Akceptuję
          </button>
        </div>
      </div>
    </div>
  );
}
