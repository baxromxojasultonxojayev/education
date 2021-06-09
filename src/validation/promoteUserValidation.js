import Joi from 'joi'


export default Joi.object({
  user_id: Joi.string()
            .required()
            .error(Error("Invalid User-Id")),

  role: Joi.string()
        .required()
        .error(Error("Invalid Role "))
})