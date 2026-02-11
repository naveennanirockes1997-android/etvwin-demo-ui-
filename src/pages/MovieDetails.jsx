import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Play, Plus, Share2, Star, Calendar, Clock, ArrowLeft } from 'lucide-react';
import api from '../services/api';
import ContentRow from '../components/cards/ContentRow';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [movieData, allMovies] = await Promise.all([
          api.getContentDetails(id),
          api.getHomeData()
        ]);
        
        setMovie(movieData);
        
        // Mock similar movies
        const similar = allMovies
          .filter(m => m.id !== id)
          .sort(() => 0.5 - Math.random())
          .slice(0, 10);
        setSimilarMovies(similar);
      } catch (err) {
        console.error("Failed to fetch movie details:", err);
        setError("Failed to load movie details. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
    window.scrollTo(0, 0);
  }, [id]);

  if (isLoading) {
    return (
      <div className="pt-24 px-4 md:px-12 pb-20 min-h-screen animate-pulse">
        <div className="h-[60vh] bg-white/5 rounded-3xl mb-8" />
        <div className="h-8 w-1/3 bg-white/5 rounded mb-4" />
        <div className="h-4 w-2/3 bg-white/5 rounded mb-8" />
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="h-screen flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Error</h2>
        <p className="text-text-muted mb-8">{error || "Movie not found"}</p>
        <button onClick={() => navigate(-1)} className="btn-primary">Go Back</button>
      </div>
    );
  }

  return (
    <div className="pb-20">
      {/* Hero Section */}
      <div className="relative h-[70vh] md:h-[90vh] w-full">
        <div className="absolute inset-0">
          <img 
            src={movie.movie_banner || movie.image} 
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        <div className="absolute inset-0 flex flex-col justify-center px-4 md:px-12 pt-20">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-text-muted hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft size={20} /> Back
          </button>

          <h1 className="text-4xl md:text-7xl font-black mb-4 max-w-3xl leading-tight">
            {movie.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 mb-6 text-sm md:text-base font-medium">
            <div className="flex items-center gap-1 text-yellow-500">
              <Star size={18} fill="currentColor" />
              <span>{movie.rt_score}% Score</span>
            </div>
            <div className="flex items-center gap-1 text-text-muted">
              <Calendar size={18} />
              <span>{movie.release_date}</span>
            </div>
            <div className="flex items-center gap-1 text-text-muted">
              <Clock size={18} />
              <span>{movie.running_time} min</span>
            </div>
            <span className="px-2 py-0.5 border border-white/20 rounded text-xs uppercase tracking-wider">
              Studio Ghibli
            </span>
          </div>

          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mb-8 line-clamp-4 md:line-clamp-none leading-relaxed">
            {movie.description}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link 
              to={`/watch/${movie.id}`}
              className="btn-primary py-4 px-10 rounded-full flex items-center gap-3 text-lg font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
            >
              <Play size={24} fill="currentColor" /> Play Now
            </Link>
            <button className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors">
              <Plus size={24} />
            </button>
            <button className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors">
              <Share2 size={24} />
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-12 -mt-20 relative z-10 space-y-12">
        {/* Detailed Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 bg-surface-light/50 backdrop-blur-xl rounded-3xl border border-white/5">
          <div>
            <h3 className="text-text-muted text-sm font-bold uppercase tracking-wider mb-2">Director</h3>
            <p className="text-lg font-medium">{movie.director}</p>
          </div>
          <div>
            <h3 className="text-text-muted text-sm font-bold uppercase tracking-wider mb-2">Producer</h3>
            <p className="text-lg font-medium">{movie.producer}</p>
          </div>
          <div>
            <h3 className="text-text-muted text-sm font-bold uppercase tracking-wider mb-2">Original Title</h3>
            <p className="text-lg font-medium">{movie.original_title} ({movie.original_title_romanised})</p>
          </div>
        </div>

        {/* Similar Content */}
        <ContentRow title="More Like This" items={similarMovies} isLoading={false} />
      </div>
    </div>
  );
};

export default MovieDetails;
