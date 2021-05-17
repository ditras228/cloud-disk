const fs = require('fs')
 class FileService {
    createDir(req,file) {
        const filePath = this.getPath(req, file)
        return new Promise(((resolve, reject) => {
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath)
                return resolve({message: 'File was created'})
            } else {
                return reject({message: 'File already exist'})
            }

        }))
    }
    deleteFile(req,file){
        if(file.type === 'dir'){
            fs.rmdirSync(file.path)
        }else{
            fs.unlinkSync(file.path)
        }
    }
    getPath(req, file){
        return `${req.filePath}\\${file.user}\\${file.path}`
    }
}
module.exports = new FileService()