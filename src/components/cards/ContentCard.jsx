import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Plus, ChevronDown, Check } from 'lucide-react';

const ContentCard = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative flex-shrink-0 w-[160px] sm:w-[200px] md:w-[240px] aspect-poster group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/movie/${item.id}`} className="block w-full h-full">
        <img 
          src={item.thumbnail || item.image || item.poster || item.cover_image || `/src/assets/images/vertical${(String(item.id).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 9) + 1}.png`} 
          alt={item.title || item.name}
          className="w-full h-full object-cover rounded-md transition-transform duration-300 group-hover:scale-105 group-hover:brightness-50"
          loading="lazy"
        />
      </Link>

      {/* Hover Preview Overlay (Simplified for performance, usually this would be a portal or larger card) */}
      <div className={`absolute inset-0 p-4 flex flex-col justify-end opacity-0 transition-opacity duration-300 pointer-events-none ${isHovered ? 'opacity-100' : ''}`}>
        <h3 className="text-sm font-bold truncate mb-2">{item.title || item.name}</h3>
        <div className="flex items-center gap-2 mb-3">
          <Link 
            to={`/watch/${item.id}`} 
            className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black hover:bg-zinc-200 pointer-events-auto transition-colors focus:outline-none"
          >
            <Play size={16} fill="currentColor" />
          </Link>
          <button className="w-8 h-8 rounded-full bg-surface-light border border-white/20 flex items-center justify-center text-white hover:bg-zinc-800 pointer-events-auto transition-colors">
            <Plus size={16} />
          </button>
          <button className="w-8 h-8 rounded-full bg-surface-light border border-white/20 flex items-center justify-center text-white ml-auto hover:bg-zinc-800 pointer-events-auto transition-colors">
            <ChevronDown size={16} />
          </button>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-text-muted">
          <span className="text-green-500 font-bold">{Math.floor(Math.random() * 20 + 80)}% Match</span>
          <span className="border border-white/30 px-1 rounded-sm">{item.releaseDate || item.release_date}</span>
          <span className="border border-white/30 px-1 rounded-sm">HD</span>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ContentCard);
