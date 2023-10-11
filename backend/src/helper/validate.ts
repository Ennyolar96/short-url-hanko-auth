const Joi = require("joi");
var pattern = new RegExp(
  "^(https?:\\/\\/)?" + // protocol
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
    "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
    "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
    "(\\#[-a-z\\d_]*)?$",
  "i"
);

module.exports = {
  loginData: async (email: string, password: string) => {
    const schema = Joi.object({
      email: Joi.string()
        .min(10)
        .max(255)
        .email({ minDomainSegments: 2 })
        .required(),
      password: Joi.string()
        .min(8)
        .max(30)
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
    });

    return await schema.validate({ email: email, password: password });
  },

  regData: async (username: string, email: string, password: string) => {
    const schema = Joi.object({
      username: Joi.string().min(3).required(),
      email: Joi.string()
        .min(10)
        .max(255)
        .email({ minDomainSegments: 2 })
        .required(),
      password: Joi.string()
        .min(8)
        .max(30)
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
    });

    return await schema.validate({
      username: username,
      email: email,
      password: password,
    });
  },

  createShort: async (longURL: string, alias: string) => {
    const schema = Joi.object({
      long: Joi.string().pattern(pattern).required(),
      alias: Joi.string().min(5).max(20),
    });

    return await schema.validate({ long: longURL, alias: alias });
  },

  aliasData: async (url: string) => {
    const schema = Joi.object({
      alias: [Joi.string(), Joi.number()],
    });

    return await schema.validate({ alias: url });
  },
};
