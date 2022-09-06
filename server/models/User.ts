import { IFile } from "./File";

export interface IUser {
  id: number;
  email: string;
  password: string;
  disk_space: number;
  used_space: number;
  avatar: string;
  files: IFile["_id"];
  hash: string;
  active: boolean;
}
