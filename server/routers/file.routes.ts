export {};
const Router = require("express");
const router = Router();
const fileController = require("../controllers/fileController.ts");
const authMiddleware = require("../middleware/auth.middleware.ts");

router.post("/", authMiddleware, fileController.createDir);
router.post("/upload", authMiddleware, fileController.uploadFile);
router.post("/avatar", authMiddleware, fileController.uploadAvatar);
router.post("/dropTo", authMiddleware, fileController.dropTo);
router.post("/shareFile", authMiddleware, fileController.shareFile);

router.get("/", authMiddleware, fileController.fetchFile);
router.get("/download", authMiddleware, fileController.downloadFile);
router.get("/search", authMiddleware, fileController.searchFile);
router.get("/file", authMiddleware, fileController.getFile);

router.delete("/", authMiddleware, fileController.deleteFile);
router.delete("/delFol", authMiddleware, fileController.deleteFolder);
router.delete("/avatar", authMiddleware, fileController.deleteAvatar);
router.delete("/nuke", authMiddleware, fileController.nuke);

module.exports = router;
