import { useRef, useEffect } from 'react';

export default function FadeInSection({ children, threshold = 0.1, delay = 0, direction = 'up' }) {
  const ref = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );
    
    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);
  
  // Different starting positions based on direction
  const getDirectionClass = () => {
    switch (direction) {
      case 'up':
        return 'translate-y-10';
      case 'down':
        return '-translate-y-10';
      case 'left':
        return 'translate-x-10';
      case 'right':
        return '-translate-x-10';
      default:
        return 'translate-y-10';
    }
  };
  
  const getDelayClass = () => {
    return `delay-${delay}`;
  };
  
  return (
    <div
      ref={ref}
      className={`opacity-0 transition-all duration-700 ease-out ${getDirectionClass()} ${getDelayClass()}`}
      style={{ 
        transitionDelay: `${delay * 100}ms`,
        willChange: 'opacity, transform'
      }}
    >
      {children}
    </div>
  );
}
