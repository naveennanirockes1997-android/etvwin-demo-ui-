import React from 'react';
import { Play, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroBanner = ({ item, isLoading }) => {
  if (isLoading || !item) {
    return (
      <div className="relative h-[60vh] md:h-[85vh] w-full shimmer" />
    );
  }

  return (
    <div className="relative h-[60vh] md:h-[85vh] w-full overflow-hidden mb-8">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={item.movie_banner || item.backdrop || item.banner || item.cover_image || "/src/assets/images/banner.png"} 
          alt={item.title || item.name}
          className="w-full h-full object-cover"
        />
        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-black/30" />
      </div>

      {/* Content */}
      <div className="absolute bottom-[10%] md:bottom-[20%] left-4 md:left-12 max-w-2xl">
        <h1 className="text-3xl md:text-6xl font-black mb-4 drop-shadow-lg uppercase tracking-tight">
          {item.title || item.name}
        </h1>
        <p className="text-sm md:text-lg text-gray-200 mb-6 line-clamp-3 drop-shadow-md font-medium">
          {item.description || item.summary || item.synopsis}
        </p>
        
        <div className="flex items-center gap-4">
          <Link to={`/watch/${item.id}`} className="btn-primary py-3 px-8 text-lg font-bold">
            <Play fill="currentColor" size={24} /> Play
          </Link>
          <Link to={`/movie/${item.id}`} className="btn-secondary py-3 px-8 text-lg font-bold">
            <Info size={24} /> More Info
          </Link>
        </div>
      </div>
    </div>
  );
};

export default React.memo(HeroBanner);
