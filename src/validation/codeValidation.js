import Joi from 'joi'


export default Joi.object({
  code: Joi.number()
            .required()
            .error(Error("Invalid Code "))
            .min(100000)
            .max(999999)
})