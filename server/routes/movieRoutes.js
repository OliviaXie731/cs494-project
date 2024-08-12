const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');


router.get('/popular', movieController.getPopularMovies);
router.get('/top-rated', movieController.getTopRatedMovies);
router.get('/movie-details/:id', movieController.getMovieDetails);
router.get('/actor-details/:id', movieController.getActorDetails);
router.get("/search", movieController.findListMovie);

module.exports = router;
