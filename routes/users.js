const router = require('express').Router();
const {
  getCurrentUser,
  patchUser,
} = require('../controllers/users');
// const {  } = require('../middlewares/validation');

router.get('/me', getCurrentUser);
router.patch('/me', patchUser);

module.exports = router;
