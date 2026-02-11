import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

// Centralized Axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Error Handler helper
const handleError = (error) => {
  console.error('API Error:', error.response?.data || error.message);
  throw error;
};

const api = {
  /**
   * Fetch All Films (Used for Home Data)
   */
  getHomeData: async () => {
    try {
      const response = await apiClient.get('/films');
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  /**
   * Fetch Trending Films (Sorted by Score)
   */
  /**
   * Fetch Trending Films (Sorted by Score)
   */
  getTrending: async (page = 1, limit = 20, filters = {}) => {
    try {
      const response = await apiClient.get('/films');
      let result = response.data;

      // Apply Filters
      if (filters.rating) {
        result = result.filter(film => parseInt(film.rt_score) >= parseInt(filters.rating));
      }
      if (filters.year) {
        result = result.filter(film => film.release_date >= filters.year);
      }

      // Default Sort (Trending = Score) or Custom Sort
      if (filters.sortBy === 'newest') {
        result.sort((a, b) => parseInt(b.release_date) - parseInt(a.release_date));
      } else if (filters.sortBy === 'rating' || !filters.sortBy) {
         result.sort((a, b) => parseInt(b.rt_score) - parseInt(a.rt_score));
      } else if (filters.sortBy === 'relevance') {
         // Keep default API order or specific logic
      }

      return result.slice((page - 1) * limit, page * limit);
    } catch (error) {
      return handleError(error);
    }
  },

  /**
   * Fetch Top Rated Films
   */
  getTopRated: async (page = 1, limit = 20) => {
    try {
      const response = await apiClient.get('/films');
      const sorted = response.data.sort((a, b) => parseInt(b.rt_score) - parseInt(a.rt_score));
      return sorted.slice((page - 1) * limit, page * limit);
    } catch (error) {
      return handleError(error);
    }
  },

  /**
   * Fetch Recent Films
   */
  getRecent: async (page = 1, limit = 20) => {
    try {
      const response = await apiClient.get('/films');
      const sorted = response.data.sort((a, b) => parseInt(b.release_date) - parseInt(a.release_date));
      return sorted.slice((page - 1) * limit, page * limit);
    } catch (error) {
      return handleError(error);
    }
  },

  /**
   * Fetch Content by Category/Genre
   */
  getContentByCategory: async (category, page = 1, limit = 20, filters = {}) => {
    try {
      const response = await apiClient.get('/films');
      let result = response.data;
      
      // Apply Filters
      if (filters.rating) {
        result = result.filter(film => parseInt(film.rt_score) >= parseInt(filters.rating));
      }
      if (filters.year) {
        result = result.filter(film => film.release_date >= filters.year);
      }

      // Category specific logic + Sorting
      if (category === 'movie') {
        // Ghibli API films are all movies
      } else if (category === 'popular' || category === 'trending') {
        result.sort((a, b) => parseInt(b.rt_score) - parseInt(a.rt_score));
      }
      
      // Override sort if user selected one
      if (filters.sortBy === 'newest') {
        result.sort((a, b) => parseInt(b.release_date) - parseInt(a.release_date));
      } else if (filters.sortBy === 'rating') {
        result.sort((a, b) => parseInt(b.rt_score) - parseInt(a.rt_score));
      }

      return result.slice((page - 1) * limit, page * limit);
    } catch (error) {
      return handleError(error);
    }
  },

  /**
   * Search Content with Filters
   */
  searchContent: async (query, filters = {}, page = 1, limit = 20) => {
    try {
      const response = await apiClient.get('/films');
      let results = response.data.filter(film => 
        film.title.toLowerCase().includes(query.toLowerCase()) || 
        film.original_title.toLowerCase().includes(query.toLowerCase()) ||
        film.description.toLowerCase().includes(query.toLowerCase())
      );

      // Apply Filters
      if (filters.rating) {
        results = results.filter(film => parseInt(film.rt_score) >= parseInt(filters.rating));
      }
      if (filters.year) {
        results = results.filter(film => film.release_date >= filters.year);
      }

      // Sort
      if (filters.sortBy === 'newest') {
        results.sort((a, b) => parseInt(b.release_date) - parseInt(a.release_date));
      } else if (filters.sortBy === 'rating') {
        results.sort((a, b) => parseInt(b.rt_score) - parseInt(a.rt_score));
      }

      return {
        items: results.slice((page - 1) * limit, page * limit),
        total: results.length,
        hasMore: results.length > page * limit
      };
    } catch (error) {
      return handleError(error);
    }
  },

  /**
   * Get Specific Content Details
   */
  getContentDetails: async (id) => {
    try {
      const response = await apiClient.get(`/films/${id}`);
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  /**
   * Get Video Playback Data (Mocked)
   */
  getPlaybackData: async (contentId) => {
    return {
      playback_url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
      title: 'Sample Playback'
    };
  }
};

export default api;
