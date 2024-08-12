import React from 'react';
import { Link } from 'react-router-dom';
import './MovieCard.css';


const MovieCard = ({ movie }) => {
    return (
        <Link to={`/movie/${movie.id}`}>
        <div className="movie-card">
            <img className="movie-image" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            <p className="rating">Rating: {movie.vote_average}</p>
            <h3>{movie.title}</h3>
            <p className="overview"><strong>Description: </strong>{movie.overview}</p>
        </div>
        </Link>
    );
};

export default MovieCard;