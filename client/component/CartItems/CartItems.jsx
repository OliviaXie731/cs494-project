import React, { useEffect, useState } from 'react';
import MovieCard from '../MovieCard/MovieCard';
import { useSelector, useDispatch } from 'react-redux';
import { setLikeTotal } from '../../src/Redux/action';
import './CartItems.css';


const CartItem = () => {
    const dispatch = useDispatch();
    const [movies, setMovies] = useState([]);
    const { user_id } = useSelector(state => state.auth);
    
    useEffect(() => {
        const fetchLikedMovies = async () => {
            const total = await fetch('http://localhost:3000/like/totallist', {
                method: 'POST',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "user_id": user_id,
                })
            });
            const likeData = await total.json();
            dispatch(setLikeTotal(likeData)); 
            // localStorage.setItem('user', JSON.stringify({
            //     like_total: totalLike
            // }));

            const response = await fetch(`http://localhost:3000/like/getLike/${user_id}`);
            const likedMovies = await response.json();

            const movieDetailsPromises = likedMovies.map(like =>
                fetch(`http://localhost:3000/api/movies/movie-details/${like.movie_id}`)
                    .then(res => res.json())
            );

            const movieDetails = await Promise.all(movieDetailsPromises);
            setMovies(movieDetails);
        };

        if (user_id) {
            fetchLikedMovies();
        }
    }, [user_id, movies]);

    const handleDelete = async(user_id, movie_id) => {
        const total = await fetch('http://localhost:3000/like/deleteLike', {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "user_id": user_id,
                "movie_id": movie_id
            })
        });
        if (total.ok) {
            setMovies(movies.filter(movie => movie.id !== movie_id));
        } else {
            alert('Failed to delete like');
        }
    }

    return (
        <div className="cart-item">
            <h2>My Favorite Movies</h2>
            <div className="movie-grid">
                {movies.map(movie => (
                    <div>
                        <MovieCard key={movie.id} movie={movie} />
                        <button className="delete-button" onClick={() => {handleDelete(user_id, movie.id)}}>Delete</button>
                    </div> 
                ))}
            </div>      
        </div>
    );
};

export default CartItem;
