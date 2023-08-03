
import React, { useEffect, useState } from 'react';

function HomePage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // API req part
    const API_URL = '/';

    fetch(API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network error');
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    // LOADING PAGE
    return <div>Loading...</div>;
  }

  if (error) {
    // ERROR PAGE
    return <div>Error: {error.message}</div>;
  }

  // UI part for homepage
  return (
    <div>
      <h1>Welcome to Our Team and Project Introduction</h1>
      {data && (
        <div>
          <h2>Team Introduction</h2>
          <p>{data.teamIntroduction}</p>
          <h2>Project Introduction</h2>
          <p>{data.projectIntroduction}</p>
        </div>
      )}
    </div>
  );
}

export default HomePage;

