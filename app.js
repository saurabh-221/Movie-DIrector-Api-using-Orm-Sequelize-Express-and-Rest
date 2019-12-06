const express = require('express');
const models = require('./models');
const directorRoutes = require('./routes/directorRoute');
require('dotenv').config();
const movieRoutes = require('./routes/movieRoute');
const fs = require('fs');
const morgan = require('morgan');

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


// const logger = require('./utils/logger.util');
const app = express();
const PORT = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
morgan('dev', {
    stream: fs.createWriteStream('./logs/access.log', {
    encoding: 'utf-8',
    flags: 'a',
    }),
})
);
app.use('/api/directors', directorRoutes);
app.use('/api/movies', movieRoutes);
app.use('*', (req, res) => {
    logger.error(`404 Page Not Found`);
    res.status(404).send('404 Page Not Found');
  });

models.sequelize.sync().then(() => {
  app.listen(PORT, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Server started at port ${PORT}`);
    }
  });
});