
import fs from 'fs'
import path from 'path'
let __dirname = path.resolve(path.dirname(''))

class FileController{
  static async newFile (req, res){
    let fileBase
    try{
      const fileElement = req.files.file
      if(!fileElement){
        throw new Error('File is not found')
      }
      if(fileElement.size / 1024 > (50 * 1024)){
        throw new Error('File is too big')
      }
      const type = fileElement.name.split(".")[fileElement.name.split(".").length - 1]
      const file = await req.postgres.file_model.create({
        type: type,
        user_id: req.user
      })
      fileBase = file
      const filePath = path.join(__dirname, 'src', 'public','files', `${file.dataValues.photo_id}` + type)
      const savedFile = await fs.writeFile(filePath, fileElement.data, (err)=>{
        if(err){
          console.log(e);
        }
      }) 
      // console.log(savedFile);
      console.log(fileBase); 

      await res.status(201).json({
        ok: true,
        message: 'File has been loaded',
        file: file
      })
    }catch(e){
      if(fileBase){
        await req.postgres.file_model.destroy({
          where: {
            id: fileBase.dataValues.photo_id
          }
        })
      }
      console.log(e);
      res.status(400).json({
        ok: false,
        message: e + ''
      })
    }
  }
}
export default  FileController