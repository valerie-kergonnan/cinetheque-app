import axios from 'axios';


const API_KEY = '5ca454da8fc969685639286ba5d20442';
const BASE_URL = 'https://api.themoviedb.org/3';

const api = axios.create({
    baseURL : BASE_URL,
    params: {
        api_key: API_KEY,
        language: 'fr-FR',
    },
});

export const getSimilarMovies = async (movieId) => {
    const response = await api.get(`/movie/${movieId}/similar?language=fr-FR&page=1`);
   return response.data.results;
};

export const getSeries = async (page = 1) => {
    const response = await api.get('/tv/popular', {
        params: { page: page}
    });
    return response.data;
};

export const getMovies = async (page = 1) => {
    const response = await api.get('/movie/popular', { 
        params: { page: page}
    });
    return response.data;
}
export const getTrendingMovies = async () => {
    const response = await api.get('/trending/movie/day');
    return response.data.results;
};

export const getTrendingSeries = async () => {
    const response = await api.get('/trending/tv/week');
    return response.data.results;
};

export const getMovieDetails = async (id) => {
    const response = await api.get(`/movie/${id}`);
    return response.data;
};

export const searchMovies = async (query) => {
    const response = await api.get('/search/movie', {
        params: { query: query }
    });
    return response.data.results;
};
// Fonction pour filtrer les FILMS
export const getFilteredMovies = async (filters = {}) => {
    const response = await api.get('/discover/movie', {
        params: {
            with_genres: filters.genre,           // ID du genre
            primary_release_year: filters.year,   // Année
            certification_country: 'FR',          // On base le public sur la France
            certification: filters.certification, // ex: '12' ou '16'
            page: filters.page || 1
        }
    });
    return response.data;
};

// Fonction pour filtrer les SÉRIES
export const getFilteredSeries = async (filters = {}) => {
    const response = await api.get('/discover/tv', {
        params: {
            with_genres: filters.genre,
            first_air_date_year: filters.year,
            page: filters.page || 1
        }
    });
    return response.data;
};

// Pour l'autocomplétion (recherche globale)
export const searchMulti = async (query) => {
    const response = await api.get('/search/multi', {
        params: { query: query }
    });
    return response.data.results;
};

export default api;