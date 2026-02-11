import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ContentCard from './ContentCard';
import SkeletonCard from '../loaders/SkeletonCard';

const ContentRow = ({ title, items = [], isLoading = false }) => {
  const rowRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const handleScroll = () => {
    if (rowRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  useEffect(() => {
    const row = rowRef.current;
    if (row) {
      row.addEventListener('scroll', handleScroll);
      // Initial check
      handleScroll();
      return () => row.removeEventListener('scroll', handleScroll);
    }
  }, [items]);

  const scroll = (direction) => {
    if (rowRef.current) {
      const { clientWidth } = rowRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth : clientWidth;
      rowRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="mb-8 md:mb-12 relative group">
      <h2 className="px-4 md:px-12 text-lg md:text-2xl font-semibold mb-4 text-white hover:text-primary transition-colors cursor-pointer inline-block">
        {title}
      </h2>

      <div className="relative group/row">
        {showLeftArrow && (
          <button 
            onClick={() => scroll('left')}
            className="absolute left-0 top-0 bottom-0 z-10 w-12 bg-black/50 opacity-0 group-hover/row:opacity-100 transition-opacity flex items-center justify-center text-white"
          >
            <ChevronLeft size={40} />
          </button>
        )}

        <div 
          ref={rowRef}
          className="row-container flex gap-4 overflow-x-auto scroll-smooth hide-scrollbar px-4 md:px-12"
        >
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
          ) : (
            items.map((item, index) => (
              <ContentCard key={item?.id || `content-${index}`} item={item} />
            ))
          )}
        </div>

        {showRightArrow && (
          <button 
            onClick={() => scroll('right')}
            className="absolute right-0 top-0 bottom-0 z-10 w-12 bg-black/50 opacity-0 group-hover/row:opacity-100 transition-opacity flex items-center justify-center text-white"
          >
            <ChevronRight size={40} />
          </button>
        )}
      </div>
    </div>
  );
};

export default React.memo(ContentRow);
