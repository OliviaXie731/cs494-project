const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env')});
const db = require('../models/dbModel');
const axios = require('axios');
const movieController = {};

const apiKey = process.env.API_KEY;

const popularURL = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;
const topRatedURL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`;

movieController.getPopularMovies = async (req, res) => {
    try {
        const response = await axios.get(popularURL);
        const movies = response.data.results;
        res.status(200).json(movies);
    } catch (error) {
        console.error('Error fetching movie data:', error);
        res.status(500).json({ error: 'Unable to fetch movie data' });
    }
};

movieController.getTopRatedMovies = async (req, res) => {
    try {
        const response = await axios.get(topRatedURL);
        const movies = response.data.results;
        res.status(200).json(movies);
    } catch (error) {
        console.error('Error fetching movie data:', error);
        res.status(500).json({ error: 'Unable to fetch movie data' });
    }
};

movieController.getMovieDetails = async (req, res) => {
    const {id} = req.params;
    const MovieDetailsURL = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`;
    try {
        const response = await axios.get(MovieDetailsURL);
        const movies = response.data;
        res.status(200).json(movies);
    } catch (error) {
        console.error('Error fetching movie data:', error);
        res.status(500).json({ error: 'Unable to fetch movie data' });
    }
}

movieController.getActorDetails = async (req, res) => {
    const {id} = req.params;
    const ActorDetailsURL = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`;
    try {
        const response = await axios.get(ActorDetailsURL);
        const movies = response.data;
        res.status(200).json(movies);
    } catch (error) {
        console.error('Error fetching movie data:', error);
        res.status(500).json({ error: 'Unable to fetch movie data' });
    }
}

movieController.findListMovie = async (req, res) => {
    const {query} = req.query;
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
            params: {
              api_key: apiKey,
              query: query
            }
        });
        res.json(response.data.results); 
    } catch (error) {
        console.error('Error fetching search results:', error);
        res.status(500).send('Server Error');
    }
}

module.exports = movieController;