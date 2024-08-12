import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { setLikeTotal } from '../src/Redux/action';
import header from '../public/empty-image.png';
import './CSS/MovieDetails.css';

const MovieDetails = () => {
    const dispatch = useDispatch();
    const {id} = useParams();
    const [details, setDetails] = useState({});
    const [credits, setCredits] = useState([]);
    const [isFavorited, setIsFavorited] = useState(false);
    const { user_id } = useSelector(state => state.auth);

    useEffect(() => {
        const fetchDetails = async() => {
            const resDetails = await fetch(`http://localhost:3000/api/movies/movie-details/${id}`);
            const dataDetails = await resDetails.json();
            setDetails(dataDetails);

            const resCredits = await fetch(`http://localhost:3000/api/movies/actor-details/${id}`)
            const dataCredits = await resCredits.json();
            setCredits(dataCredits.cast);

            const resFavCheck = await fetch('http://localhost:3000/like/checklike', {
                method: 'POST',
                headers: {
                    Accept: "application/json",
                    "Content-Type":"application/json",
                },
                body: JSON.stringify({
                    "user_id": user_id,
                    "movie_id": id
                })
            })
            const favData = await resFavCheck.json();
            setIsFavorited(favData.isFavorited);
        };
        fetchDetails();
    }, [id]);

    const addFav = async() => {
        let responseData;
        await fetch("http://localhost:3000/like/addLike", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body:JSON.stringify({ 
                "user_id": user_id,
                "movie_id": id
            })
        })
        .then((response) => response.json())
        .then((data) => responseData = data);
        
        if (responseData && responseData.id) {
            alert('add successfully!')
            setIsFavorited(true);

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
        }
    }

    return (
        <div className="movie-details">
            {details && (
                <div className="introduction">
                    <div className="left">
                        <img src={`https://image.tmdb.org/t/p/w500${details.poster_path}`} alt={details.title} className="movie-poster" />
                    </div>
                    <div className="right">
                        <h1>{details.title}</h1>
                        <p><strong>Genres:</strong> {details.genres?.map(genre => genre.name).join(', ')}</p>
                        <p><strong>Release Date:</strong> {details.release_date}</p>
                        <p><strong>Language:</strong> {details.original_language?.toUpperCase()}</p>
                        <p><strong>Vote Score:</strong> {details.vote_average}</p>
                        <div className="buttonList">
                            {isFavorited ? (
                                <button className="like-button" disabled>Already in List</button>
                            ):(
                                <button className="like-button" onClick={addFav}>Like</button>
                            )}
                            
                            {details.homepage && (
                                <a href={details.homepage} target="_blank" rel="noopener noreferrer">
                                    <button className="watch-now-button">Watch Now</button>
                                </a>
                            )}
                        </div>
                        <p className="description"><strong>Description:</strong>{details.overview}</p>
                    </div>
                </div>
            )}
            {credits.length > 0 && (
                <div>
                    <h2>Cast</h2>
                    <div className="cast-grid">
                        {credits.map(actor => (
                            <div key={actor.cast_id} className="actor">
                                <img src={actor.profile_path ? `https://image.tmdb.org/t/p/w300${actor.profile_path}` : header} alt={actor.name} className="actor-image" />
                                <div className="actor-info">
                                    <strong>{actor.name}</strong>
                                    <p>{actor.character}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default MovieDetails;

