
import fs from 'fs'
import path from 'path'
import settingValidation from '../validation/settingValidation.js'
let __dirname = path.resolve(path.dirname(''))

class SettingsController{
  static async editSettings (req, res){
    try{
      if(!req.isSuperAdmin){
        throw new Error("You are not SUPERADMIN")
      }
      const data = await settingValidation.validateAsync(req.body)

      const settings = {
        ...req.settings,
        ...data
      }

      fs.writeFile(path.join(__dirname, 'setting.js'), JSON.stringify(settings))
      // console.log(req.settings);
      res.send({
        ok: true
      })  
    }
    catch(e){
      // console.log(e);
      res.status(400).json({
        ok: false,
        message: e + ''
      })
    }
  }
}
export default  SettingsController