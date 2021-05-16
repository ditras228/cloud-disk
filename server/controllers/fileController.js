require('dotenv').config()
const File = require('../models/File')
const User = require('../models/User')
const fs = require('fs')
const fileService = require('../services/fileService')

class FileController {
    async createDir(req, res) {
        try {
            const {name, type, parent} = req.body
            const file = new File({name, type, parent, user: req.user.id})
            const parentFile = await File.findOne({_id: parent})
            if (!parentFile) {
                file.path = name
                await fileService.createDir(file)
            } else {
                file.path = `${__dirname}\\files\\${file.name}`
                await fileService.createDir(file)
                parentFile.childs.push(file._id)
                await parentFile.save()
            }
            await file.save()
            return res.json(file)
        } catch (e) {
            return res.json(e)
        }
    }

    async fetchFile(req, res) {
        try {
            const files = await File.find({user: req.user.id, parent: req.query.parent})
            return res.json(files)

        } catch (e) {
            console.log(e)
            return res.status(400).json({message: 'Can`t get files'})
        }
    }

    async uploadFile(req, res) {
        try {
            const file = req.files.file
            const parent = await File.findOne({user: req.user.id, _id: req.body.parent})
            const user = await User.findOne({_id: req.user.id})

            if (user.usedSpace + file.size > user.diskSpace) {
                return res.status(500).json({message: 'There no space on the disk'})
            }
            user.usedSpace = user.usedSpace + file.size

            let path
            if (parent) {
                path = `${__dirname}\\..\\files\\${user._id}\\${parent.path}\\${file.name}`
            } else {
                path = `${__dirname}\\..\\files\\${user._id}\\${file.name}`

            }
            if (fs.existsSync(path)) {
                return res.status(400).json({message: 'File already exists'})
            }
            await file.mv(path)
            let filePath = file.name
            if(parent){
                filePath=parent.path+'\\'+file.name
            }
            const type = file.name.split('.').pop()
            const dbFile = new File({
                name: file.name,
                type,
                size: file.size,
                path: filePath,
                user: user._id
            })
            await dbFile.save()
            await user.save()
            return res.json(dbFile)

        } catch (e) {
            console.log(e)
            return res.status(400).json({message: 'Can`t get files'})
        }
    }
    async downloadFile(req, res){
        try{
            const file = await File.findOne({_id: req.query.id, user: req.user.id})
            const path = `${__dirname}\\..\\files\\${req.user.id}\\${file.path}\\${file.name}`
            if(fs.existsSync(path)){
                return res.download(path, file.name)

            }
            return  res.status(500).json({message: 'Download error'})
        }catch (e){

        }
    }
    async deleteFile(req, res){
        try{
            const file  = await File.findOne({_id: req.query.id, user: req.user.id})
            if(!file){
                return res.status(400).json({message: 'File not found'})

            }
            fileService.deleteFile(file)
            await res.json({message: 'File was deleted'})
        }catch (e){

        }
    }
}


module.exports = new FileController()