const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send({ data: movies }))
    .catch(next);
};

module.exports.postMovie = (req, res, next) => {
  const movieData = {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId
  } = req.body;

  Movie.create({ movieData, owner: req.user._id })
    .then((movie) => res.send({ data: movie }))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.id)
    .orFail(new NotFoundError('Фильм с таким id не найден'))
    .then((movie) => {
      if (!movie.owner.equals(req.user._id)) throw new ForbiddenError('Нельзя удалять фильмы других пользователей');
      return Movie.findByIdAndDelete(req.params.id);
    })
    .then(() => res.send({ message: 'Фильм удален' }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Передан некорректный id'));
      } else {
        next(err);
      }
    });
};
