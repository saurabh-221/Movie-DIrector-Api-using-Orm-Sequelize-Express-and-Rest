const winston = require('winston');
const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.simple(),
    winston.format.colorize(),
  ),
  transports: [
    new winston.transports.File({
      filename: './logs/errors.log',
      level: 'error',
    }),
    new winston.transports.Console({
      level: 'error',
    }),
  ],
});

const { Movie } = require('../models');
const { log } = console;
const createMovie = (req, res) => {
  const {
    Title,Description,Runtime,Genre,Rating,Metascore,Votes,Earning,Director_Id,Actor,Year,
  } = req.body;
  const movie = {Title: Title,Description: Description,Runtime: Runtime,Genre: Genre,Rating: Rating,Metascore: Metascore,
    Votes: Votes,Earning: Earning,Director_Id: Director_Id,Actor: Actor,Year: Year,
  };
  Movie.create(movie)
    .then((createdMovie) => {
      res.status(201).json(createdMovie);
    })
    .catch((err) => {
      logger.error(err);
      if (err.name) {
        if (err.name === 'SequelizeValidationError') {
          const errors = [];
          err.errors.forEach((error) => {errors.push(error.message);});
          const errorObj = {
            name: 'ValidationError',
            errors,
          };
          res.status(400).json(errorObj);
        } else {
          res.status(500).json(err);
        }
      } else {
        res.status(500).json(err);
      }
    });
};

const readMovie = (req, res) => {
  const { id } = req.params;
  Movie.findByPk(id)
    .then((movie) => {
      if (movie) {
        res.status(200).json(movie);
      } else {
        throw new Error('Movie not found');
      }
    })
    .catch((err) => {
      logger.error(err);
      res.status(400).json(err.message);
    });
};

const readAllMovies = (req, res) => {
  Movie.findAll()
    .then((movies) => {
      res.status(200).json(movies);
    })
    .catch((err) => {
      logger.error(err);
      res.status(500).json(err);
    });
};

const updateMovie = (req, res) => {
  const { id } = req.params;
  const {
    Title,Description,Runtime,Genre,Rating,Metascore,Votes,Earning,Director_Id,Actor,
    Year,
  } = req.body;
  const newMovie = {
    Title: Title,Description: Description,Runtime: Runtime,Genre: Genre,Rating: Rating,Metascore: Metascore,
    Votes: Votes,Earning: Earning,Director_Id: Director_Id,Actor: Actor,Year: Year,
  };
  Movie.update(newMovie, { where: { id } })
    .then((updatedMovie) => {
      if (updatedMovie[0] !="") {
        res.status(200).json({ message: 'Movie updated successfully' });
      } else {
        throw new Error('Movie not found');
      }
    })
    .catch((err) => {
      logger.error(err);
      if (err.name) {
        if (err.name === 'SequelizeValidationError') {
          const errors = [];
          err.errors.forEach((error) => {
            errors.push(error.message);
          });
          const errorObj = {
            name: 'ValidationError',
            errors,
          };
          res.status(400).json(errorObj);
        } else {
          res.status(500).json(err.message);
        }
      } else {
        res.status(500).json(err.message);
      }
    });
};


const deleteMovie = (req, res) => {
  const { id } = req.params;
  Movie.destroy({ where: { id } })
    .then((deletedMovie) => {
      if (deletedMovie) {
        res.status(200).json({ message: 'Movie deleted successfully' });
      } else {
        throw new Error('Movie not found');
      }
    })
    .catch((err) => {
      logger.error(err);
      res.status(500).json(err.message);
    });
};


module.exports = {
  createMovie,
  readMovie,
  readAllMovies,
  updateMovie,
  deleteMovie,
};