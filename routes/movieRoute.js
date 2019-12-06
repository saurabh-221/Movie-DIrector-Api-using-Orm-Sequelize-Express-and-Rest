const express = require('express');
const router = express.Router();
const {
  createMovie,
  readMovie,
  readAllMovies,
  updateMovie,
  deleteMovie,
} = require('../apiOperation/movieOperation');

router
  .post('/', createMovie)
  .get('/', readAllMovies)
  .get('/:id', readMovie)
  .put('/:id', updateMovie)
  .delete('/:id', deleteMovie);

module.exports = router;