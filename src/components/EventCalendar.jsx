import React, { useState } from 'react';

const MONTHS = [
  'Styczeń', 'Luty', 'Marzec', 'Kwiecień', 
  'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 
  'Wrzesień', 'Październik', 'Listopad', 'Grudzień'
];

// Sample events data - this would typically come from a CMS or API
const SAMPLE_EVENTS = [
  {
    id: 1,
    title: "Wernisaż lokalnych artystów",
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 15, 18, 0),
    description: "Zapraszamy na wernisaż prac lokalnych artystów z regionu wareckiego.",
    category: "art",
    image: "/img/gallery-1.jpg"
  },
  {
    id: 2,
    title: "Wieczór z muzyką na żywo",
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 22, 19, 30),
    description: "Akustyczny koncert lokalnych muzyków przy filiżance aromatycznej kawy.",
    category: "music",
    image: "/img/gallery-3.jpg"
  },
  {
    id: 3,
    title: "Warsztaty ceramiczne",
    date: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 5, 16, 0),
    description: "Nauczymy się podstaw pracy z gliną i stworzymy własne naczynia ceramiczne.",
    category: "workshop",
    image: "/img/gallery-2.jpg"
  },
  {
    id: 4,
    title: "Pokaz baristyczny",
    date: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 12, 15, 0),
    description: "Poznaj tajniki parzenia doskonałej kawy z naszym głównym baristą.",
    category: "coffee",
    image: "/img/gallery-4.jpg"
  }
];

// Categories with their corresponding colors
const CATEGORIES = {
  art: { name: "Sztuka", color: "bg-purple-100 text-purple-800" },
  music: { name: "Muzyka", color: "bg-blue-100 text-blue-800" },
  workshop: { name: "Warsztaty", color: "bg-green-100 text-green-800" },
  coffee: { name: "Kawa", color: "bg-amber-100 text-amber-800" },
  other: { name: "Inne", color: "bg-gray-100 text-gray-800" }
};

const EventCalendar = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Function to navigate to previous month
  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  // Function to navigate to next month
  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Function to calculate days in month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Function to get day of week (0-6) for the first day of the month
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  // Filter events for the current month
  const filteredEvents = SAMPLE_EVENTS.filter(event => {
    const eventMonth = event.date.getMonth();
    const eventYear = event.date.getFullYear();
    
    return (
      eventMonth === currentMonth && 
      eventYear === currentYear && 
      (selectedCategory === 'all' || event.category === selectedCategory)
    );
  });

  // Generate calendar days
  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-10 bg-stone-100/50 rounded-md"></div>);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      // Check if there's an event on this day
      const eventsOnThisDay = SAMPLE_EVENTS.filter(event => {
        const eventDate = event.date;
        return (
          eventDate.getDate() === day && 
          eventDate.getMonth() === currentMonth && 
          eventDate.getFullYear() === currentYear &&
          (selectedCategory === 'all' || event.category === selectedCategory)
        );
      });

      const isToday = day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
      
      days.push(
        <div 
          key={`day-${day}`} 
          className={`h-10 flex items-center justify-center rounded-md ${
            isToday 
              ? 'bg-amber-500 text-white font-medium' 
              : eventsOnThisDay.length > 0 
                ? 'bg-amber-100 text-amber-800 hover:bg-amber-200 cursor-pointer' 
                : 'bg-stone-100/50'
          }`}
          onClick={() => eventsOnThisDay.length > 0 && setSelectedEvent(eventsOnThisDay[0])}
        >
          {day}
          {eventsOnThisDay.length > 0 && (
            <span className="ml-1 h-2 w-2 rounded-full bg-amber-500"></span>
          )}
        </div>
      );
    }

    return days;
  };

  // Format time (HH:MM)
  const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  // Format date (DD Month YYYY)
  const formatDate = (date) => {
    const day = date.getDate();
    const month = MONTHS[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 sm:p-6 flex flex-col">
        {/* Header with navigation */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-stone-800">
            Wydarzenia w Rynek Kawiarnia
          </h3>
          <div className="flex items-center space-x-1">
            <button 
              onClick={prevMonth}
              className="p-2 rounded-full hover:bg-stone-100"
              aria-label="Poprzedni miesiąc"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            <span className="font-medium text-stone-700">
              {MONTHS[currentMonth]} {currentYear}
            </span>
            <button 
              onClick={nextMonth}
              className="p-2 rounded-full hover:bg-stone-100"
              aria-label="Następny miesiąc"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1 text-sm rounded-full ${
              selectedCategory === 'all' 
                ? 'bg-amber-500 text-white' 
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            Wszystkie
          </button>
          {Object.entries(CATEGORIES).map(([key, { name, color }]) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={`px-3 py-1 text-sm rounded-full ${
                selectedCategory === key 
                  ? 'bg-amber-500 text-white' 
                  : color.replace('bg-', 'bg-opacity-70 hover:bg-opacity-100 bg-')
              }`}
            >
              {name}
            </button>
          ))}
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Calendar */}
          <div className="w-full md:w-1/2">
            {/* Days of week */}
            <div className="grid grid-cols-7 gap-1 mb-1">
              {['Nd', 'Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'Sb'].map((day, index) => (
                <div key={day} className="text-center text-sm font-medium text-stone-600">
                  {day}
                </div>
              ))}
            </div>
            
            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1">
              {generateCalendarDays()}
            </div>
          </div>
          
          {/* Events list */}
          <div className="w-full md:w-1/2">
            {selectedEvent ? (
              <div className="bg-stone-50 rounded-lg p-4">
                <div className="relative mb-4 rounded-lg overflow-hidden h-40">
                  <img 
                    src={selectedEvent.image} 
                    alt={selectedEvent.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-lg font-semibold">{selectedEvent.title}</h4>
                  <button 
                    onClick={() => setSelectedEvent(null)} 
                    className="text-stone-500 hover:text-stone-700"
                    aria-label="Zamknij szczegóły wydarzenia"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                <div className="mb-3 flex items-center text-sm text-stone-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {formatDate(selectedEvent.date)}
                  <span className="mx-2">•</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {formatTime(selectedEvent.date)}
                </div>
                <span className={`inline-block px-2 py-1 text-xs rounded-full mb-3 ${CATEGORIES[selectedEvent.category].color}`}>
                  {CATEGORIES[selectedEvent.category].name}
                </span>
                <p className="text-stone-600">{selectedEvent.description}</p>
              </div>
            ) : filteredEvents.length > 0 ? (
              <div className="space-y-3">
                <h4 className="text-lg font-medium mb-3">
                  Nadchodzące wydarzenia ({filteredEvents.length})
                </h4>
                {filteredEvents.map(event => (
                  <div 
                    key={event.id} 
                    className="flex gap-3 p-3 bg-stone-50 rounded-lg cursor-pointer hover:bg-stone-100 transition-colors"
                    onClick={() => setSelectedEvent(event)}
                  >
                    <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                      <img 
                        src={event.image} 
                        alt={event.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h5 className="font-medium text-stone-900">{event.title}</h5>
                      <div className="text-xs text-stone-600 mt-1 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {event.date.getDate()} {MONTHS[event.date.getMonth()]} • {formatTime(event.date)}
                      </div>
                      <span className={`inline-block px-2 py-0.5 text-xs rounded-full mt-2 ${CATEGORIES[event.category].color}`}>
                        {CATEGORIES[event.category].name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-6 text-center bg-stone-50 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-stone-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h4 className="text-lg font-medium text-stone-700">Brak wydarzeń</h4>
                <p className="text-stone-500 mt-1">
                  {selectedCategory !== 'all' 
                    ? 'Nie znaleziono wydarzeń dla wybranej kategorii. Wybierz inną kategorię lub sprawdź inny miesiąc.'
                    : 'W tym miesiącu nie ma zaplanowanych wydarzeń. Sprawdź kolejny miesiąc.'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCalendar;
