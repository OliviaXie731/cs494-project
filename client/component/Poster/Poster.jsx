import React from 'react';
import './Poster.css';
import poster from '../../public/movie-poster.png';

export const Poster = () => {
    return (
        <div className="poster">
            <img className='post-img' src={poster} alt=""/>
        </div>
    )
};