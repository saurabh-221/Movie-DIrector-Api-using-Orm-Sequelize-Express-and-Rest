const express = require('express');
const router = express.Router();
const {
  createDirector,
  readDirector,
  readAllDirectors,
  updateDirector,
  deleteDirector,
} = require('../apiOperation/directorOperation');

router
  .post('/', createDirector)
  .get('/', readAllDirectors)
  .get('/:id', readDirector)
  .put('/:id', updateDirector)
  .delete('/:id', deleteDirector);

module.exports = router;