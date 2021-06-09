import Joi from 'joi'

export default Joi.object({
  name: Joi.string()
           .min(3)
           .max(64)
           .required()
           .error(Error('Invalid Name')),

  email: Joi.string()
            .pattern(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)
            .error(Error('Invalid Email address')),

  bdate: Joi.date()
            .error(Error('Invalid Birth Date'))  
            .required(),
            
  gender: Joi.number()
             .min(1)
             .max(2)
             .error(Error('Invalid Gender'))
             .required()
})