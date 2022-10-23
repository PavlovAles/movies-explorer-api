const { celebrate, Joi } = require('celebrate');

module.exports.idValidation = celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24),
  }),
});

module.exports.signupValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'any.required': 'Имя - обязательное поле',
        'string.min': 'Длина имени должна быть от 2 до 30 символов',
        'string.max': 'Длина имени должна быть от 2 до 30 символов',
      }),
    email: Joi.string().required().email().messages({
      'any.required': 'Email - обязательное поле',
      'string.email': 'Передан невалидный email',
    }),
    password: Joi.string().required().messages({
      'any.required': 'Пароль - обязательное поле',
    }),
  }),
});

module.exports.signinValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      'any.required': 'Email - обязательное поле',
      'string.email': 'Передан невалидный email',
    }),
    password: Joi.string().required().messages({
      'any.required': 'Пароль - обязательное поле',
    }),
  }),
});

module.exports.patchUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30)
      .messages({
        'any.required': 'Имя - обязательное поле',
        'string.min': 'Длина имени должна быть от 2 до 30 символов',
        'string.max': 'Длина имени должна быть от 2 до 30 символов',
      }),
    email: Joi.string().required().email().messages({
      'any.required': 'Email - обязательное поле',
      'string.email': 'Передан невалидный email',
    }),
  }),
});

const regexURL = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/;
const reqString = Joi.string().required().messages({ 'any.required': 'Не передан обязательный параметр' });
const reqNumber = Joi.number().required().messages({ 'any.required': 'Не передан обязательный параметр' });
const reqURL = Joi.string().required().regex(regexURL).message('Передана невалидная ссылка');

module.exports.movieValidation = celebrate({
  body: Joi.object().keys({
    movieId: reqNumber,
    nameRU: reqString,
    nameEN: reqString,
    country: reqString,
    director: reqString,
    duration: reqNumber,
    year: reqString,
    description: reqString,
    image: reqURL,
    trailerLink: reqURL,
    thumbnail: reqURL,
  }),
});
