import { useState, useEffect } from 'react';

export default function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      author: "Anna",
      text: "Najlepsza kawa w mieście! Uwielbiam spędzać tu czas z książką i delektować się szarlotką na ciepło z lodami.",
      rating: 5
    },
    {
      id: 2,
      author: "Michał",
      text: "Wyjątkowe miejsce z niepowtarzalnym klimatem. Świetne miejsce na spotkania biznesowe jak i dla rodzin.",
      rating: 5
    },
    {
      id: 3,
      author: "Katarzyna",
      text: "Przepiękne rękodzieło i smaczna kawa. Pracownicy są bardzo przyjaźni i pomocni.",
      rating: 5
    },
    {
      id: 4,
      author: "Piotr",
      text: "Świetna lokalizacja z widokiem na Rynek. Polecam spróbować piwa rzemieślniczego Browarka!",
      rating: 4
    }
  ];
  
  const [activeIndex, setActiveIndex] = useState(0);
  
  useEffect(() => {
    // Auto advance testimonials
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [testimonials.length]);
  
  return (
    <section className="py-16 bg-amber-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-stone-800 mb-4">Co mówią nasi goście</h2>
          <div className="w-24 h-1 bg-amber-500 mx-auto mb-6"></div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="relative overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {testimonials.map((testimonial) => (
                  <div 
                    key={testimonial.id} 
                    className="w-full flex-shrink-0 px-4"
                  >
                    <div className="bg-white rounded-lg shadow-md p-8 md:p-10">
                      <div className="flex justify-center mb-6">
                        {[...Array(5)].map((_, i) => (
                          <svg 
                            key={i} 
                            xmlns="http://www.w3.org/2000/svg" 
                            className={`h-6 w-6 ${i < testimonial.rating ? 'text-amber-500' : 'text-stone-300'}`}
                            fill="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        ))}
                      </div>
                      <p className="italic text-stone-600 text-lg mb-6 text-center">
                        "{testimonial.text}"
                      </p>
                      <p className="font-medium text-center text-amber-700">— {testimonial.author}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button 
                  key={index} 
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                    activeIndex === index ? 'bg-amber-600' : 'bg-stone-300 hover:bg-amber-400'
                  }`}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
