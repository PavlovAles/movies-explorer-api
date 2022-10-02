const router = require('express').Router();
const {
  getMovies,
  postMovie,
  deleteMovie,
} = require('../controllers/movies');
const { idValidation, movieValidation } = require('../middlewares/validation');

// возвращает все сохранённые текущим  пользователем фильмы
router.get('/', getMovies);

// создаёт фильм с переданными в теле
// country, director, duration, year, description, image,
// trailer, nameRU, nameEN и thumbnail, movieId
router.post('/', movieValidation, postMovie);

// удаляет сохранённый фильм по id
router.delete('/:id', idValidation, deleteMovie);

module.exports = router;
