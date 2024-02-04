import React, { useState, useEffect } from 'react';
import SearchBox from './components/SearchBox';
import FlightList from './components/FlightList';

function App() {
  const [allFlights, setAllFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);

  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    departureDate: '',
    returnDate: '',
  });

  useEffect(() => {
    fetch('http://localhost:3001/flights')
      .then((response) => response.json())
      .then((data) => {
        setAllFlights(data);
        setFilteredFlights(data); // Initially, all flights are shown
      })
      .catch((error) => console.error('Error fetching flights:', error));
  }, []);

  const handleSearch = (newSearchParams) => {
    setSearchParams(newSearchParams);
    const filtered = allFlights.filter((flight) => {
      return flight.from === newSearchParams.from && flight.to === newSearchParams.to; // Simplified example
    });
    setFilteredFlights(filtered);
  };

  return (
    <div>
      <SearchBox onSearch={handleSearch} />
      <FlightList flights={filteredFlights} />
    </div>
  );
}

export default App;
