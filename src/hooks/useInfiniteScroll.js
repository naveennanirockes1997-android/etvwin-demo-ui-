import { useEffect, useCallback } from 'react';

export const useInfiniteScroll = (callback, hasMore, isLoading) => {
  const handleScroll = useCallback(() => {
    if (window.innerHeight + document.documentElement.scrollTop + 50 < document.documentElement.offsetHeight || isLoading || !hasMore) {
      return;
    }
    callback();
  }, [callback, hasMore, isLoading]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);
};
