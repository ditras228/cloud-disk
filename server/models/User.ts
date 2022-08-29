import { Schema } from "mongoose";
import { IFile } from "./File";
import * as mongoose from "mongoose";

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  diskSpace: { type: Number, default: 1024 ** 3 * 10 },
  usedSpace: { type: Number, default: 0 },
  avatar: { type: String },
  files: [{ type: Schema.Types.ObjectId, ref: "File" }],
  active: { type: Schema.Types.Boolean, required: true },
  hash: { type: String },
});
module.exports = mongoose.model("UserSchema", UserSchema);

export interface IUser extends mongoose.Document {
  _id: number;
  email: string;
  password: string;
  diskSpace: number;
  usedSpace: number;
  avatar: string;
  files: IFile["_id"];
  hash: string;
  active: boolean;
}
