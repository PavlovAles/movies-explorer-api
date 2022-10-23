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
const { CORS_ORIGINS } = require('./utils/constants');

const {
  PORT = 3000,
  MONGO_ADDRESS = 'mongodb://localhost:27017/moviesDB',
} = process.env;

const app = express();

mongoose.connect(MONGO_ADDRESS);

const corsOptions = {
  origin: CORS_ORIGINS,
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
