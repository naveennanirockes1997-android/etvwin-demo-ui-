import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../services/api';
import ContentCard from '../components/cards/ContentCard';
import SkeletonCard from '../components/loaders/SkeletonCard';
import { Search as SearchIcon, Filter, X, Star, Calendar } from 'lucide-react';

const SearchResult = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    rating: '',
    year: '',
    sortBy: 'relevance'
  });

  const observer = useRef();
  const lastElementRef = useCallback(node => {
    if (isLoading || isFetchingMore) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [isLoading, isFetchingMore, hasMore]);

  const performSearch = async (pageNum, isNewSearch = false) => {
    if (!query) {
      setResults([]);
      return;
    }

    if (isNewSearch) {
      setIsLoading(true);
    } else {
      setIsFetchingMore(true);
    }

    try {
      const data = await api.searchContent(query, filters, pageNum, 12);
      if (isNewSearch) {
        setResults(data.items || []);
      } else {
        setResults(prev => [...prev, ...(data.items || [])]);
      }
      setHasMore(data.hasMore);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setIsLoading(false);
      setIsFetchingMore(false);
    }
  };

  useEffect(() => {
    setPage(1);
    setHasMore(true);
    performSearch(1, true);
  }, [query, filters]);

  useEffect(() => {
    if (page > 1) {
      performSearch(page);
    }
  }, [page]);

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => {
    setFilters({ rating: '', year: '', sortBy: 'relevance' });
  };

  return (
    <div className="pt-24 px-4 md:px-12 pb-20 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-xl text-text-muted">
            {query ? (
              <>Results for <span className="text-white font-bold italic">"{query}"</span></>
            ) : (
              "Type to start searching..."
            )}
          </h1>
          {results.length > 0 && (
            <p className="text-sm text-text-muted mt-1">{results.length} items found</p>
          )}
        </div>

        <div className="relative">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full border transition-all ${
              showFilters || Object.values(filters).some(v => v && v !== 'relevance') 
                ? 'bg-primary/10 border-primary text-primary' 
                : 'bg-surface-light border-white/10 hover:bg-zinc-800'
            }`}
          >
            <Filter size={18} />
            <span className="font-bold text-sm">Filters</span>
          </button>

          {showFilters && (
            <div className="absolute right-0 top-full mt-4 w-72 bg-surface-dark border border-white/10 rounded-2xl p-6 z-50 shadow-2xl backdrop-blur-xl">
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
                    {['relevance', 'newest', 'rating'].map((option) => (
                      <button
                        key={option}
                        onClick={() => handleFilterChange('sortBy', option)}
                        className={`px-4 py-2 rounded-lg text-xs font-bold capitalize border transition-all ${
                          filters.sortBy === option 
                            ? 'bg-primary border-primary text-white' 
                            : 'bg-surface-light border-white/5 text-text-muted hover:border-white/20'
                        }`}
                      >
                        {option}
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

      {isLoading ? (
        <div className="content-grid">
          {Array.from({ length: 12 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : results.length > 0 ? (
        <>
          <div className="content-grid">
            {results.map((item, index) => {
              if (results.length === index + 1) {
                return (
                  <div ref={lastElementRef} key={item.id}>
                    <ContentCard item={item} />
                  </div>
                );
              } else {
                return <ContentCard key={item.id} item={item} />;
              }
            })}
          </div>
          {isFetchingMore && (
            <div className="content-grid mt-4">
              {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={`more-${i}`} />)}
            </div>
          )}
        </>
      ) : query ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
            <SearchIcon size={40} className="text-text-muted" />
          </div>
          <h2 className="text-2xl font-bold mb-2">No results found</h2>
          <p className="text-text-muted max-w-md">
            Your search for "{query}" did not have any matches. Try different keywords or browse our categories.
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center opacity-50">
          <SearchIcon size={64} className="text-text-muted mb-6" />
          <h2 className="text-xl font-medium">Start typing to find your favorite films</h2>
        </div>
      )}
    </div>
  );
};

export default SearchResult;
