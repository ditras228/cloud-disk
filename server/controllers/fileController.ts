import { IReq, IRes } from "../typings/IRoute";
import { IFile } from "../models/File";

require("dotenv").config();
const fs = require("fs");
const uuid = require("uuid");
import { FileService } from "../services/fileService";
import { IUser } from "../models/User";
import { AuthRepo } from "../infrastructure/pg/authRepo";
import { CreateFileInput, FileRepo } from "../infrastructure/pg/fileRepo";

const archiver = require("archiver");

class FileController {
  async createDir(req: Request & IReq & IReqFile, res: Response & IRes) {
    try {
      const input = req.body as CreateFileInput;
      const user = (await AuthRepo.findOne(req.user.id)) as IUser;
      let parentFile = null as IFile | null;

      if (input.parent !== "0") parentFile = await FileRepo.findById(req, res);

      const file = await FileRepo.createFile(input, parentFile, user.id);

      return res.json(file);
    } catch (e) {
      return res.json(e);
    }
  }
  //
  // async fetchFile(req: Request & IReq, res: Response & IRes) {
  //   try {
  //     const { parent, sort } = req.query;
  //     let files: IFile;
  //     let getParentId;
  //
  //     if (parent) getParentId = parent.split("?")[0];
  //
  //     switch (sort) {
  //       case "name":
  //         files = (await FileSchema.find({
  //           user: req.user.id,
  //           parent: getParentId,
  //         }).sort({ name: 1 })) as IFile;
  //         break;
  //       case "type":
  //         files = (await FileSchema.find({
  //           user: req.user.id,
  //           parent: getParentId,
  //         }).sort({ type: 1 })) as IFile;
  //         break;
  //
  //       case "date":
  //         files = (await FileSchema.find({
  //           user: req.user.id,
  //           parent: getParentId,
  //         }).sort({ date: 1 })) as IFile;
  //         break;
  //
  //       default:
  //         files = (await FileSchema.find({
  //           user: req.user.id,
  //           parent: getParentId,
  //         })) as IFile;
  //         break;
  //     }
  //     return res.json(files);
  //   } catch (e) {
  //     console.log(e);
  //     return res.status(400).json({ message: "Can`t get files" });
  //   }
  // }
  //
  // async uploadFile(req: Request & IReq & IReqFile, res: Response & IRes) {
  //   try {
  //     const webkitRelativePath = req.body
  //       .webkitRelativePath as unknown as Array<string>;
  //     let files = req.files?.file as Array<IFile> | any;
  //     let parent = (await FileSchema.findOne({
  //       user: req.user.id,
  //       id: req.body.parent,
  //     })) as IFile;
  //     const user = (await UserSchema.findOne({ id: req.user.id })) as IUser;
  //     let dbFiles = [] as Array<IFile> | any;
  //     let parentFile: IFile;
  //     let folder = null as IFile | null;
  //     let fistFolder = null as IFile | null;
  //
  //     if (!files.length) {
  //       files = Array.from([files]);
  //     }
  //     for (let i = 0; i < files?.length; i++) {
  //       if (user.used_space + files[i].size > user.disk_space) {
  //         return res
  //           .status(500)
  //           .json({ message: "There no space on the disk" });
  //       }
  //       user.used_space = user.used_space + files[i].size;
  //
  //       let path;
  //       if (parent) {
  //         path = `/${parent.path}/${files[i].name}`;
  //       } else {
  //         path = `/${user.id}/${files[i].name}`;
  //       }
  //       if (webkitRelativePath[i]) {
  //         const relativePath = webkitRelativePath[i].split("/");
  //         let currentPath = `/${user.id}/`;
  //         for (let d = 0; d < relativePath.length - 1; d++) {
  //           let previewsPath = currentPath;
  //           currentPath += `${relativePath[d]}/`;
  //
  //           parentFile = await FileSchema.findOne({ path: previewsPath });
  //           folder = await FileSchema.findOne({ path: currentPath });
  //
  //           if (!folder) {
  //             const newFolder = new FileSchema({
  //               name: relativePath[d],
  //               type: "dir",
  //               parent: parentFile?.id,
  //               user: req.user.id,
  //               path: currentPath,
  //             });
  //             await newFolder.save();
  //
  //             if (d == 0) {
  //               fistFolder = newFolder;
  //             }
  //           }
  //           parent = await FileSchema.findOne({ path: currentPath });
  //           path = `/${user.id}/${webkitRelativePath[i]}`;
  //           if (files[i].parent != null && i != 0) {
  //             parentFile.childs.push(files[i].id);
  //             await parentFile.save();
  //           }
  //         }
  //         fs.mkdir(
  //           `${req.filePath}/${user.id}/${webkitRelativePath[i]}`.replace(
  //             relativePath[relativePath.length - 1],
  //             ""
  //           ),
  //           { recursive: true },
  //           (err) => {
  //             if (err) throw err;
  //           }
  //         );
  //       } else if (fs.existsSync(`${req.filePath}/${path}`)) {
  //         return res.status(400).json({ message: "File already exists" });
  //       }
  //       files[i].mv(`${req.filePath}/${path}`);
  //
  //       const type = files[i].name.split(".").pop();
  //       const dbFile = new FileSchema({
  //         name: files[i].name,
  //         type,
  //         size: files[i].size,
  //         path: path,
  //         parent: parent ? parent.id : null,
  //         user: user.id,
  //       });
  //       if (parent) {
  //         parent.childs.push(dbFile);
  //         await parent.save();
  //       }
  //       let currentParentPath = dbFile.path;
  //       let parentRelativePath = currentParentPath.split("/");
  //
  //       for (let pp = parentRelativePath.length - 1; pp > 1; pp--) {
  //         currentParentPath = currentParentPath.replace(
  //           parentRelativePath[pp],
  //           ""
  //         );
  //         const currentParentFile = (await FileSchema.findOne({
  //           path: currentParentPath,
  //         })) as IFile;
  //         if (currentParentFile) {
  //           currentParentFile.size += dbFile.size;
  //           await currentParentFile.save();
  //         }
  //       }
  //       dbFiles.push(dbFile);
  //     }
  //     for (let dbI = 0; dbI < dbFiles.length; dbI++) {
  //       await dbFiles[dbI].save();
  //     }
  //     await user.save();
  //     if (webkitRelativePath[0]) {
  //       return res.json([fistFolder]);
  //     }
  //     return res.json(dbFiles);
  //   } catch (e) {
  //     console.log(e);
  //     return res.status(400).json({ message: "Can`t get files" });
  //   }
  // }
  // async shareFile(req: Request & IReq, res: Response & IRes) {
  //   const file = (await FileSchema.findOne({ id: req.body.fileId })) as IFile;
  //   file.isShare = !file.isShare;
  //   await file.save();
  //   return res.json(file.isShare);
  // }
  // async getFile(req: Request & IReq, res: Response & IRes) {
  //   try {
  //     const file = (await FileSchema.findOne({ id: req.query.id })) as IFile;
  //     if (file.isShare) {
  //       return res.json(file);
  //     } else {
  //       return res.status(404).json({ message: "File not found" });
  //     }
  //   } catch (e) {
  //     console.log(e);
  //     return res.status(404).json({ message: "File not found" });
  //   }
  // }
  // async downloadFile(req: Request & IReq, res: Response & IRes & any) {
  //   try {
  //     let path: string;
  //     const file = (await FileSchema.findOne({ id: req.query.id })) as IFile;
  //     if (file.user == req.user.id || file.isShare == true) {
  //       path = `${req.filePath}/${file.path}`;
  //
  //       if (fs.existsSync(path)) {
  //         if (file.type !== "dir") {
  //           return res.download(path, file.name);
  //         } else {
  //           const archivePath = `${req.filePath}/${req.user.id}/target.zip`;
  //           const output = fs.createWriteStream(archivePath);
  //           const archive = archiver("zip");
  //
  //           output.on("close", function () {
  //             console.log(archive.pointer() + " total bytes");
  //             console.log(
  //               "archiver has been finalized and the output file descriptor has closed."
  //             );
  //           });
  //
  //           archive.on("error", function (err) {
  //             throw err;
  //           });
  //           res.attachment(`${file.name}.zip`);
  //           archive.pipe(res);
  //           archive.directory(path, false);
  //           archive.finalize();
  //           return archive;
  //         }
  //       }
  //     }
  //
  //     return res.status(500).json({ message: "Download error" });
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }
  //
  // async deleteFile(req: Request & IReq, res: Response & IRes) {
  //   try {
  //     const file = (await FileSchema.findOne({
  //       id: req.query.id,
  //       user: req.user.id,
  //     })) as IFile;
  //     const user = (await UserSchema.findOne({ id: req.user.id })) as IUser;
  //
  //     user.used_space = user.used_space - file.size;
  //     if (!file) {
  //       return res.status(400).json({ message: "File not found" });
  //     }
  //     FileService.deleteFile(req, file);
  //     await file.remove();
  //     await user.save();
  //     return res.json({ message: "Файл был удален" });
  //   } catch (e) {
  //     console.log(e);
  //     return res.json({ message: "Delete file error" });
  //   }
  // }
  // async dropTo(req: Request & IReq, res: Response & IRes) {
  //   try {
  //     const fileId = req.body.fileId;
  //     const folderId = req.body.folderId;
  //     const file = (await FileSchema.findOne({
  //       id: fileId,
  //       user: req.user.id,
  //     })) as IFile;
  //     let folder;
  //     let newPath;
  //
  //     if (folderId !== "0") {
  //       folder = (await FileSchema.findOne({
  //         id: folderId,
  //         user: req.user.id,
  //       })) as IFile;
  //       folderId
  //         ? (newPath = `${folder.path}/${file.name}`)
  //         : (newPath = `${req.user.id}/${folder.path}/${file.name}`);
  //     } else {
  //       newPath = `${req.user.id}/${file.name}`;
  //     }
  //
  //     fs.rename(
  //       `${req.filePath}/${file.path}`,
  //       `${req.filePath}/${newPath}`,
  //       () => {
  //         console.log("File moved");
  //       }
  //     );
  //     file.path = newPath;
  //     file.parent = folder?.id;
  //     await file.save();
  //     return res.json({ message: file });
  //   } catch (e) {
  //     console.log(e);
  //     return res.json({ message: "Drop error" });
  //   }
  // }
  // async deleteFolder(req: Request & IReq, res: Response & IRes) {
  //   try {
  //     const folder = (await FileSchema.findOne({
  //       id: req.query.id,
  //       user: req.user.id,
  //     })) as IFile;
  //     const files = (await FileSchema.find({
  //       parent: folder.id,
  //     })) as Array<IFile>;
  //     const user = (await UserSchema.findOne({ id: req.user.id })) as IUser;
  //
  //     files.map((file) => {
  //       user.used_space -= file.size;
  //     });
  //
  //     await FileService.removeDir(req, files, folder);
  //     await user.save();
  //     return res.json({ message: "Папка была удалена" });
  //   } catch (e) {
  //     console.log(e);
  //     return res.json({ message: "Delete folder error" });
  //   }
  // }
  //
  // async searchFile(req: Request & IReq, res: Response & IRes) {
  //   try {
  //     const searchName = req.query.search;
  //     let files = await FileSchema.find({ user: req.user.id });
  //     console.log(files);
  //     files = files.filter((file: IFile) => file.name.includes(searchName));
  //     return res.json(files);
  //   } catch (e) {
  //     console.log(e);
  //     return res.json({ message: "Search file error" });
  //   }
  // }
  //
  // async uploadAvatar(req: Request & IReq, res: Response & IRes) {
  //   try {
  //     const file = req.files.file;
  //     const user = await UserSchema.findOne({ id: req.user.id });
  //     const avatarName = uuid.v4() + ".jpg";
  //
  //     if (fs.existsSync(`${req.static}/${user.avatar}`)) {
  //       fs.unlinkSync(`${req.static}/${user.avatar}`);
  //     }
  //     if (!fs.existsSync(req.static)) {
  //       fs.mkdirSync(req.static);
  //     }
  //     await file.mv(`${req.static}/${avatarName}`);
  //
  //     user.avatar = avatarName;
  //     await user.save();
  //     return res.json(user);
  //   } catch (e) {
  //     console.log(e);
  //     return res.json({ message: "Upload avatar error" });
  //   }
  // }
  //
  // async deleteAvatar(req: Request & IReq, res: Response & IRes) {
  //   try {
  //     const user = await UserSchema.findOne({ id: req.user.id });
  //     if (user.avatar !== "undefined") {
  //       fs.unlinkSync(`${req.static}/${user.avatar}`);
  //       user.avatar = "undefined";
  //       await user.save();
  //     }
  //     return res.json(user);
  //   } catch (e) {
  //     console.log(e);
  //     return res.json({ message: "Delete avatar error" });
  //   }
  // }
  //
  // async nuke(req: Request & IReq, res: Response & IRes) {
  //   try {
  //     const staticPath = req.static;
  //     const filePath = req.filePath;
  //     fs.rmdirSync(staticPath, { recursive: true });
  //     fs.rmdirSync(filePath, { recursive: true });
  //     await UserSchema.deleteMany({});
  //     await FileSchema.deleteMany({});
  //     return res.json({ message: "Nuked" });
  //   } catch (e) {
  //     console.log(e);
  //     return res.json({ message: "Nuke error" });
  //   }
  // }
}

module.exports = new FileController();

interface IReqFile {
  body: {
    name: string;
    type: string;
    parent: string;
  };
}
