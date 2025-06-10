import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState('idle');
  const [errorMsg, setErrorMsg] = useState(null);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setState('loading');
    
    // Email validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setState('error');
      setErrorMsg('Proszę wprowadzić prawidłowy adres e-mail.');
      return;
    }
    
    // This is a simulation since we don't have a real endpoint
    // In a production app, you would send the form data to your server
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate successful subscription
      setState('success');
      setEmail('');
    } catch (error) {
      setState('error');
      setErrorMsg('Coś poszło nie tak. Spróbuj ponownie później.');
    }
  };
  
  return (
    <div className="bg-amber-50 py-12 px-4 sm:px-6 lg:px-8 border-y border-amber-200">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-serif text-3xl font-bold tracking-tight text-amber-800 sm:text-4xl">
          Bądź na bieżąco
        </h2>
        <p className="mt-3 text-lg text-stone-600">
          Zapisz się do naszego newslettera, aby otrzymywać informacje o wydarzeniach, promocjach i nowościach.
        </p>
        
        {state === 'success' ? (
          <div className="mt-8 p-4 bg-green-100 rounded-md">
            <p className="text-green-700 font-medium">
              Dziękujemy za zapisanie się do naszego newslettera!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 sm:flex justify-center">
            <label htmlFor="email" className="sr-only">
              Adres e-mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-3 border border-stone-300 shadow-sm placeholder-stone-400 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 sm:max-w-xs rounded-md"
              placeholder="Twój adres e-mail"
              disabled={state === 'loading'}
            />
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
              <button
                type="submit"
                className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={state === 'loading'}
              >
                {state === 'loading' ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Zapisywanie...
                  </>
                ) : 'Zapisz się'}
              </button>
            </div>
          </form>
        )}
        
        {state === 'error' && (
          <p className="mt-2 text-red-600">{errorMsg}</p>
        )}
        
        <p className="mt-3 text-sm text-stone-500">
          Dbamy o Twoją prywatność. Możesz wypisać się w każdej chwili.
        </p>
      </div>
    </div>
  );
}
