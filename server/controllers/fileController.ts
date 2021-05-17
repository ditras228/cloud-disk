require('dotenv').config()
const FileSchema = require('../models/File')
const User = require('../models/User')
const fs = require('fs')

const fileService = require('../services/fileService')

class FileController {
    async createDir(req, res) {
        try {
            const {name, type, parent} = req.body
            const file = new FileSchema({name, type, parent, user: req.user.id})
            const parentFile = await FileSchema.findOne({_id: parent})
            if (!parentFile) {
                file.path = name
                await fileService.createDir(file)
            } else {
                file.path = `${req.filePath}\\${file.name}`
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
            const {sort} = req.query
            let files
            switch (sort) {
                case 'name':
                    files = await FileSchema.find({user: req.user.id, parent: req.query.parent}).sort({name: 1})
                    break
                case 'type':
                    files = await FileSchema.find({user: req.user.id, parent: req.query.parent}).sort({type: 1})
                    break

                case 'date':
                    files = await FileSchema.find({user: req.user.id, parent: req.query.parent}).sort({date: 1})
                    break

                default:
                    files = await FileSchema.find({user: req.user.id, parent: req.query.parent})
                    break

            }
            return res.json(files)

        } catch (e) {
            console.log(e)
            return res.status(400).json({message: 'Can`t get files'})
        }
    }

    async uploadFile(req, res) {
        try {
            const file = req.files.file
            const parent = await FileSchema.findOne({user: req.user.id, _id: req.body.parent})
            const user = await User.findOne({_id: req.user.id})

            if (user.usedSpace + file.size > user.diskSpace) {
                return res.status(500).json({message: 'There no space on the disk'})
            }
            user.usedSpace = user.usedSpace + file.size

            let path
            if (parent) {
                path = `${req.filePath}\\${user._id}\\${parent.path}\\${file.name}`
            } else {
                path = `${req.filePath}\\${user._id}\\${file.name}`

            }
            if (fs.existsSync(path)) {
                return res.status(400).json({message: 'File already exists'})
            }
            await file.mv(path)

            const type = file.name.split('.').pop()
            const dbFile = new FileSchema({
                name: file.name,
                type,
                size: file.size,
                path: path,
                parent: parent ? parent._id : null,
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

    async downloadFile(req, res) {
        try {
            let path = ''
            const file = await FileSchema.findOne({_id: req.query.id, user: req.user.id})
            if (file.parent)
                path = `${req.filePath}\\${req.user.id}\\${file.path}\\${file.name}`
            else
                path = `${req.filePath}\\${req.user.id}\\${file.name}`

            if (fs.existsSync(path)) {
                return res.download(path, file.name)
            }
            console.log(path)
            return res.status(500).json({message: 'Download error'})
        } catch (e) {
            console.log(e)
        }
    }

    async deleteFile(req, res) {
        try {
            const file = await FileSchema.findOne({_id: req.query.id, user: req.user.id})
            if (!file) {
                return res.status(400).json({message: 'File not found'})
            }
            fileService.deleteFile(req, file)
            await file.remove()
            return res.json({message: 'File was deleted'})
        } catch (e) {
            console.log(e)
        }
    }

    async searchFile(req, res) {
        try {
            const searchName = req.query.search
            let files = await FileSchema.find({user: req.user.id})
            console.log(files)
            files = files.filter(file => file.name.includes(searchName))
            return res.json(files)
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new FileController()