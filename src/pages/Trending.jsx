import React, { useState, useEffect } from 'react';
import api from '../services/api';
import ContentCard from '../components/cards/ContentCard';
import SkeletonCard from '../components/loaders/SkeletonCard';
import { TrendingUp, Filter, X, Star, Calendar } from 'lucide-react';

const Trending = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    rating: '',
    year: '',
    sortBy: '' // Default handled by API
  });

  useEffect(() => {
    const fetchTrending = async () => {
      // If page is 1, we are either loading initial data or resetting due to filter change
      if (page === 1) setIsLoading(true);
      
      try {
        const data = await api.getTrending(page, 12, filters);
        if (data.length < 12) setHasMore(false);
        setMovies(prev => page === 1 ? data : [...prev, ...data]);
      } catch (error) {
        console.error("Failed to fetch trending:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrending();
  }, [page, filters]);

  // Reset pagination when filters change
  useEffect(() => {
    setPage(1);
    setHasMore(true);
  }, [filters]);

  const loadMore = () => {
    if (!isLoading && hasMore) {
      setPage(prev => prev + 1);
    }
  };

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => {
    setFilters({ rating: '', year: '', sortBy: '' });
  };

  return (
    <div className="pt-28 px-4 md:px-12 pb-20 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/20 rounded-2xl text-primary">
            <TrendingUp size={32} />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-black">Trending Now</h1>
            <p className="text-text-muted">The most watched films this week</p>
          </div>
        </div>
        
        <div className="relative self-start md:self-center">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-6 py-3 rounded-full border transition-all ${
              showFilters || Object.values(filters).some(v => v) 
                ? 'bg-primary/10 border-primary text-primary' 
                : 'bg-surface-light hover:bg-zinc-800 border-white/5'
            }`}
          >
            <Filter size={20} />
            <span className="font-bold">Filters</span>
          </button>

          {showFilters && (
            <div className="absolute right-0 top-full mt-4 w-72 bg-surface-dark border border-white/10 rounded-2xl p-6 z-50 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold">Refine Results</h3>
                <button onClick={() => setShowFilters(false)} className="text-text-muted hover:text-white">
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Star size={14} /> Min Rating
                  </label>
                  <select 
                    value={filters.rating}
                    onChange={(e) => handleFilterChange('rating', e.target.value)}
                    className="w-full bg-surface-light border border-white/10 rounded-lg px-4 py-2 outline-none focus:border-primary transition-colors text-sm"
                  >
                    <option value="">Any Rating</option>
                    <option value="90">90% +</option>
                    <option value="80">80% +</option>
                    <option value="70">70% +</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Calendar size={14} /> Release Year
                  </label>
                  <select 
                    value={filters.year}
                    onChange={(e) => handleFilterChange('year', e.target.value)}
                    className="w-full bg-surface-light border border-white/10 rounded-lg px-4 py-2 outline-none focus:border-primary transition-colors text-sm"
                  >
                    <option value="">Any Year</option>
                    <option value="2000">2000 & Later</option>
                    <option value="1990">1990 & Later</option>
                    <option value="1980">1980 & Later</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-3">Sort By</label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { label: 'Default', value: '' },
                      { label: 'Newest', value: 'newest' },
                      { label: 'Review Score', value: 'rating' }
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleFilterChange('sortBy', option.value)}
                        className={`px-4 py-2 rounded-lg text-xs font-bold capitalize border transition-all ${
                          filters.sortBy === option.value 
                            ? 'bg-primary border-primary text-white' 
                            : 'bg-surface-light border-white/5 text-text-muted hover:border-white/20'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={clearFilters}
                  className="w-full py-2.5 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-bold transition-colors border border-white/5"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="content-grid">
        {movies.map((movie) => (
          <ContentCard key={movie.id} item={movie} />
        ))}
        {isLoading && Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={`skeleton-${i}`} />
        ))}
      </div>

      {!isLoading && hasMore && (
        <div className="mt-16 flex justify-center">
          <button 
            onClick={loadMore}
            className="px-12 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full font-bold transition-all hover:scale-105"
          >
            Load More Content
          </button>
        </div>
      )}

      {!hasMore && movies.length > 0 && (
        <p className="text-center text-text-muted mt-12 italic">
          You've reached the end of the trending films.
        </p>
      )}
    </div>
  );
};

export default Trending;
