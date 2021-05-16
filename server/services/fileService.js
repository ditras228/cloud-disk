const fs = require('fs')
 class FileService {
    createDir(file) {
        const filePath = `${__dirname}\\..\\files\\${file.user}\\${file.path}`
        return new Promise(((resolve, reject) => {
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath)
                return resolve({message: 'File was created'})
            } else {
                return reject({message: 'File already exist'})
            }

        }))
    }
    deleteFile(file){
        const path = this.getPath(file)
        if(file.type === 'dir'){
            fs.rmdirSync(path)
        }else{
            fs.unlinkSync(path)
        }
    }
    getPath(file){
        return `${__dirname}\\..\\${file.user}\\${file.path}`
    }
}
module.exports = new FileService()