import React, { useState, useEffect } from 'react';
import MovieCard from '../MovieCard/MovieCard';
import './TopRated.css';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


// Function to fetch popular movies from your API
const fetchTopRatedMovies = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/movies/top-rated');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const movies = await response.json();
        return movies;
    } catch (error) {
        console.error('Failed to fetch movies:', error);
        return [];
    }
};

// React component that uses the fetchPopularMovies function
const TopRatedMovies = () => {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    useEffect(() => {
        fetchTopRatedMovies()
            .then(data => {
                setMovies(data);
                setIsLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <div className="title">Top Rated Movies</div>
            <Slider {...settings} className="movies-container">
                {movies.map(movie => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </Slider>
        </div> 
    );
};

export default TopRatedMovies;
