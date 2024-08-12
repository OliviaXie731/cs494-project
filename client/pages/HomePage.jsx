import React from 'react';
import PopularMovies from '../component/Popular/Popular';
import TopRatedMovies from "../component/TopRated/TopRated";
import {Poster} from "../component/Poster/Poster";

function HomePage() {
    return (
        <div> 
            <Poster />
            <PopularMovies />
            <TopRatedMovies />
        </div>
    )
}

export default HomePage;

