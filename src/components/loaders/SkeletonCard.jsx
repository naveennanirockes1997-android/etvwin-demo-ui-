import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="flex-shrink-0 w-[160px] sm:w-[200px] md:w-[240px] flex flex-col gap-2">
      <div className="w-full aspect-poster rounded-xl bg-surface-light border border-white/5 overflow-hidden relative">
        <div className="absolute inset-0 shimmer" />
      </div>
      <div className="h-4 w-3/4 bg-surface-light rounded relative overflow-hidden">
        <div className="absolute inset-0 shimmer" />
      </div>
      <div className="h-3 w-1/2 bg-surface-light rounded relative overflow-hidden">
        <div className="absolute inset-0 shimmer" />
      </div>
    </div>
  );
};

export default SkeletonCard;
