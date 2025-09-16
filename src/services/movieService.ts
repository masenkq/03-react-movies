import axios from 'axios';
import type{ MoviesResponse } from '../types/movie';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

if (!API_TOKEN) {
    throw new Error('TMDB API token is not defined');
}

export const fetchMovies = async (query: string, page: number = 1): Promise<MoviesResponse> => {
    try {
        const response = await axios.get(`${BASE_URL}/search/movie`, {
            params: {
                query,
                page,
                include_adult: false,
            },
            headers: {
                Authorization: `Bearer ${API_TOKEN}`,
            },
        });
        
        return response.data;
    } catch (error) {
        // Можна використати error для більш детального повідомлення
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        throw new Error(`Failed to fetch movies: ${errorMessage}`);
    }
};