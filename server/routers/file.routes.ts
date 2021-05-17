export {}
const Router = require('express')
const router = Router()
const fileController=require('../controllers/fileController')
const authMiddleware= require('../middleware/auth.middleware')

router.post('/', authMiddleware, fileController.createDir)
router.get('/', authMiddleware, fileController.fetchFile)
router.delete('/', authMiddleware, fileController.deleteFile)

router.post('/upload', authMiddleware, fileController.uploadFile)
router.get('/download', authMiddleware, fileController.downloadFile)
router.get('/search', authMiddleware, fileController.searchFile)

module.exports = router