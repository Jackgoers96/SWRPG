import React, { useState, useEffect } from 'react';

function PlanetsPage() {
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    // Fetch data from your API when the component mounts
    fetch('/api/planets')
      .then((response) => response.json())
      .then((data) => setPlanets(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className='navbar'>
      <h1>Planets</h1>
      <ul>
        {planets.map((planet) => (
          <li key={planet._id}>{planet.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default PlanetsPage;