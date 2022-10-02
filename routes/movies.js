const router = require('express').Router();
const {
  getMovies,
  postMovie,
  deleteMovie,
} = require('../controllers/movies');
const { idValidation, movieValidation } = require('../middlewares/validation');

router.get('/', getMovies);
router.post('/', movieValidation, postMovie);
router.delete('/:id', idValidation, deleteMovie);

module.exports = router;
