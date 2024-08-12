import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MovieCard from '../component/MovieCard/MovieCard';
import './CSS/SearchResult.css';

const SearchResults = () => {
    const [movies, setMovies] = useState([]);
    const query = new URLSearchParams(useLocation().search).get('query');

    useEffect(() => {
        if (query) {
            fetch(`http://localhost:3000/api/movies/search?query=${query}`)
                .then(response => response.json())
                .then(data => setMovies(data));
        }
    }, [query]);

    return (
        <div className="search-results">
            {movies.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
    );
};

export default SearchResults;
