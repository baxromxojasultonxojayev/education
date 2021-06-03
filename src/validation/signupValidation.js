import Joi from 'joi'

export default Joi.object({
  name: Joi.string()
           .min(3)
           .max(64)
           .required()
           .error(Error('Invalid Name')),

  phone: Joi.string()
            .pattern(/^9989[012345789][0-9]{7}$/)
            .required()
            .error(Error('Invalid Phone Number')),

  bdate: Joi.date()
            .error(Error('Invalid Birth Date'))  
            .required(),
            
  gender: Joi.number()
             .min(1)
             .max(2)
             .error(Error('Invalid Gender'))
             .required()
})