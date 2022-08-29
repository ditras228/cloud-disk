import { Schema } from "mongoose";
import { IUser } from "./User";
import * as mongoose from "mongoose";

const FileSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  accessLink: { type: String },
  size: { type: Number, default: 0 },
  path: { type: String, default: "", unique: true },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  data: { type: Date, default: Date.now() },
  parent: { type: Schema.Types.ObjectId, ref: "File" },
  childs: [{ type: Schema.Types.ObjectId, ref: "User" }],
  isShare: { type: Schema.Types.Boolean },
});
module.exports = mongoose.model<IFile>("FileSchema", FileSchema);

export interface IFile extends mongoose.Document {
  _id: number;
  name: string;
  type: string;
  accessLink: string;
  size: number;
  path: string;
  user: IUser["_id"];
  data: string;
  parent: IFile["_id"];
  childs: [IUser["_id"]];
  isShare: boolean;
}
