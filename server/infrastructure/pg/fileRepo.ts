import { IReq, IRes } from "../../typings/IRoute";
import { IFile } from "../../models/File";
import { FileService } from "../../services/fileService";

const db = require("../../db.ts");

export {};
export interface CreateFileInput {
  name: string;
  type: string;
  parent: string;
}

export class FileRepo {
  static async createFile(
    input: CreateFileInput,
    parentFile: IFile,
    user_id: number
  ): Promise<IFile> {
    let path;
    let newFile: IFile;

    if (!parentFile) {
      path = `${user_id}/${input.name}`;
      newFile.path = path;
      newFile.user_id = user_id;
      await FileService.createDir(req, newFile);
    } else {
      path = `${parentFile.path}/${file.name}`;
      newFile.path = path;
      newFile.user_id = user_id;
      await FileService.createDir(req, newFile);
    }

    await db.query(
      `

               INSERT INTO
                   public.files
                       (name, type,  parent, user_id) 
               VALUES 
                  ($1,$2,$3,$4)
                    
                    `,
      [name, type, parent, user_id]
    );

    return newFile.rows[0];
  }

  static async updateFIle(file: IFile): Promise<IFile> {
    const { parent } = req.body;
    await db.query(
      `

               UPDATE public.files
               
               SET name = $2, type = $3,  parent=$4, user_id = $5
       
               WHERE id = $1         
                    `,
      [id, name, type, parent, req.user.id]
    );
  }

  static async findById(
    req: Request & IReq & IReqFile,
    res: Response & IRes
  ): Promise<IFile> {
    const { parent } = req.body;
    const file = await db.query(
      `

                SELECT 
                   *
                
                FROM 
                    public.users
                
                WHERE 
                    id = $1 
                    
                    `,
      [parent]
    );
    return file.rows[0];
  }

  static async deleteFile(id: number): Promise<number> {
    const file = (await db.query(
      `

                DELETE FROM 
                    public.users
                
                WHERE 
                    id = $1 
                
                RETURNING 
                    id

                    `,
      [id]
    )) as IFile;
    return file.id;
  }
}
