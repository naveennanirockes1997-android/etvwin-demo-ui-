import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import api from '../services/api';
import VideoPlayer from '../components/player/VideoPlayer';

const Watch = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      setIsLoading(true);
      try {
        const data = await api.getContentDetails(id);
        const playback = await api.getPlaybackData(id);
        setContent({ ...data, ...playback });
      } catch (error) {
        console.error("Failed to fetch content details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, [id]);

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-black">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!content) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-black">
        <h1 className="text-2xl font-bold mb-4">Content not found</h1>
        <button onClick={() => navigate(-1)} className="btn-primary">Back</button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black z-[100] flex flex-col">
      {/* Back Button Overlay */}
      <button 
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 z-[110] text-white hover:text-primary transition-colors flex items-center gap-2 font-medium"
      >
        <ArrowLeft size={32} />
        <span className="text-lg hidden md:inline">Back to browsing</span>
      </button>

      {/* Video Player Component */}
      <VideoPlayer 
        src={content.playback_url || content.videoUrl} 
        title={content.title}
        thumbnail={content.movie_banner || content.backdrop}
      />
    </div>
  );
};

export default Watch;
