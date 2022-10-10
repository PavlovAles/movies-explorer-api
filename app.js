require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const { limiter } = require('./middlewares/limiter');
const router = require('./routes/index');
const { handleError } = require('./middlewares/handleError');
const { errorLogger, requestLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/moviesDB');

const corsOptions = {
  origin: ['http://ales.movies.nomoredomains.icu/', 'https://ales.movies.nomoredomains.icu/', 'localhost:3001'],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(limiter);

app.use(helmet());

app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(handleError);

app.listen(PORT, () => { });
