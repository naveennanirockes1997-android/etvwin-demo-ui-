import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import ContentCard from '../components/cards/ContentCard';
import SkeletonCard from '../components/loaders/SkeletonCard';
import { Filter, X, Star, Calendar } from 'lucide-react';

const Category = () => {
  const { categoryId } = useParams();
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    rating: '',
    year: '',
    sortBy: ''
  });

  const observer = useRef();
  const lastElementRef = useCallback(node => {
    if (isLoading || isFetchingMore) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prev => prev + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [isLoading, isFetchingMore, hasMore]);



  // 1. Reset on Category Change
  useEffect(() => {
    setItems([]);
    setPage(1);
    setHasMore(true);
    setFilters({ rating: '', year: '', sortBy: '' });
  }, [categoryId]);

  // 2. Reset Pagination on Filter Change
  useEffect(() => {
    setPage(1);
    setHasMore(true);
  }, [filters]);

  // 3. Main Fetch Effect
  useEffect(() => {
    const fetchCategoryContent = async () => {
      // Avoid fetching if just reset (handled by dependencies, but we want to ensure we don't fetch with stale state)
      // Actually, relying on dependencies is the React way.
      
      if (page === 1) setIsLoading(true);
      else setIsFetchingMore(true);

      try {
        const data = await api.getContentByCategory(categoryId, page, 12, filters);
        
        if (page === 1) {
          setItems(data || []);
        } else {
          setItems(prev => [...prev, ...(data || [])]);
        }
        
        setHasMore(data.length === 12);
      } catch (error) {
        console.error("Failed to fetch category items:", error);
      } finally {
        setIsLoading(false);
        setIsFetchingMore(false);
      }
    };

    fetchCategoryContent();
  }, [page, filters, categoryId]);

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => {
    setFilters({ rating: '', year: '', sortBy: '' });
  };

  return (
    <div className="pt-28 px-4 md:px-12 pb-20 min-h-screen">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl md:text-4xl font-black capitalize tracking-tight">
          {categoryId?.replace('-', ' ')}
        </h1>
        
        <div className="relative">
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
        {items.map((item, idx) => {
          if (items.length === idx + 1) {
            return (
              <div ref={lastElementRef} key={`${item.id}-${idx}`}>
                <ContentCard item={item} />
              </div>
            );
          }
          return <ContentCard key={`${item.id}-${idx}`} item={item} />;
        })}
        
        {isLoading && Array.from({ length: 12 }).map((_, i) => (
          <SkeletonCard key={`skel-${i}`} />
        ))}
      </div>

      {isFetchingMore && (
        <div className="content-grid mt-4">
          {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={`more-${i}`} />)}
        </div>
      )}

      {!hasMore && items.length > 0 && (
        <p className="text-center text-text-muted mt-16 italic font-medium">
          You've explored all content in this category.
        </p>
      )}
    </div>
  );
};

export default Category;
