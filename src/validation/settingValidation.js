import Joi from 'joi'


export default Joi.object({
  code_attempts: Joi.number()
            .error(Error("Invalid Code Attempts"))
            .min(1)
            .max(999999),
  phone_attempts: Joi.number()
            .error(Error("Invalid Phone Attempts"))
            .min(1)
            .max(999999),
  ban_time: Joi.number()
            .error(Error("Invalid Ban Time"))
            .min(1)
})