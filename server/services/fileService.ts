import { IFile } from "../models/File";
import { IReq } from "../typings/IRoute";

const fs = require("fs");
const FileSchema = require("../models/File.ts");

export class FileService {
  static createDir(req, file: IFile) {
    try {
      let filePath;
      if (req != null) {
        filePath = this.getPath(req, file as IFile);
      } else {
        filePath = file.path;
      }
      return new Promise((resolve, reject) => {
        if (!fs.existsSync(filePath)) {
          fs.mkdirSync(filePath);
          return resolve({ message: "Dir was created" });
        } else {
          console.log(filePath);
          return reject({ message: "Dir already exist" });
        }
      });
    } catch (e) {
      console.log(e);
    }
  }

  static async removeDir(
    req: Request & IReq,
    files: Array<IFile>,
    folder: IFile
  ) {
    try {
      for (let i = 0; i < files.length; i++) {
        if (files[i].type === "dir") {
          let dbFiles = await FileSchema.find({ parent: folder._id });
          if (dbFiles.length > 0)
            await FileService.removeDir(req, dbFiles, files[i]);
        } else await FileSchema.findOneAndDelete({ _id: files[i]._id });
        console.log(files[i].name);
      }
      await folder.remove();
      fs.rmdirSync(FileService.getPath(req, folder), { recursive: true });
    } catch (e) {
      console.log(e);
    }
  }

  static deleteFile(req: Request & IReq, file: IFile) {
    fs.unlinkSync(FileService.getPath(req, file));
  }

  static getPath(req: Request & IReq, file: IFile) {
    return `${req.filePath}/${file.path}`;
  }
}
