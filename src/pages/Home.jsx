import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import HeroBanner from '../components/common/HeroBanner';
import ContentRow from '../components/cards/ContentRow';

const Home = () => {
  const [data, setData] = useState({
    trending: [],
    popular: [],
    latest: [],
    recommended: [],
    hero: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHomeData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const films = await api.getHomeData(); // Returns array of films directly now
        
        if (Array.isArray(films) && films.length > 0) {
          // Sort by release date for "Latest"
          const sortedByDate = [...films].sort((a, b) => parseInt(b.release_date) - parseInt(a.release_date));
          
          // Sort by score for "Popular" / "Trending"
          const sortedByScore = [...films].sort((a, b) => parseInt(b.rt_score) - parseInt(a.rt_score));

          setData({
            hero: films[Math.floor(Math.random() * films.length)], // Random hero
            trending: sortedByScore.slice(0, 10),
            popular: sortedByScore.slice(10, 20),
            latest: sortedByDate.slice(0, 10),
            recommended: films.slice(5, 15), // Arbitrary slice
          });
        }
      } catch (error) {
        console.error("Failed to fetch Ghibli home data:", error);
        setError("Failed to load content. Please check your connection.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  if (error) {
    return (
      <div className="h-screen flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-bold mb-4 text-primary">Connection Error</h2>
        <p className="text-text-muted mb-8 max-w-md">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="btn-primary"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="pb-20">
      <HeroBanner item={data.hero} isLoading={isLoading} />
      
      <div className="-mt-16 md:-mt-32 relative z-10 space-y-8">
        <Link to="/trending" className="block transition-transform hover:scale-[1.01] active:scale-100">
          <ContentRow title="Trending Now" items={data.trending} isLoading={isLoading} />
        </Link>
        <ContentRow title="Top Rated Classics" items={data.popular} isLoading={isLoading} />
        <ContentRow title="Latest Releases" items={data.latest} isLoading={isLoading} />
        <ContentRow title="Recommended for You" items={data.recommended} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default Home;
