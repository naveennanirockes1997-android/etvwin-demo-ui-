export const API_BASE_URL = 'https://ghibliapi.vercel.app';

export const API_KEYS = {
  AUTH_TOKEN: 'q5u8JMWTd2698ncg7q4Q',
  ACCESS_TOKEN: 'Ay6KCkajdBzztJ4bptpW',
  SECRET_KEY: '2fd66b173c16e012e90e',
  EXTERNAL_TOKEN: 'VJ8WEaqygbpYSMzBtsGz',
};

export const CATEGORIES = [
  { id: 'trending', name: 'Trending' },
  { id: 'popular', name: 'Popular' },
  { id: 'top_rated', name: 'Top Rated' },
  { id: 'action', name: 'Action' },
  { id: 'comedy', name: 'Comedy' },
  { id: 'drama', name: 'Drama' },
];

export const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Trending', path: '/trending' },
  { name: 'TV Shows', path: '/category/tv' },
  { name: 'Movies', path: '/category/movie' },
  { name: 'New & Popular', path: '/category/popular' },
];

export const PLAYER_CONFIG = {
  AUTO_PLAY: true,
  MUTE: false,
};
