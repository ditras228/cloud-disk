import { IReq, IRes } from "../typings/IRoute";
import * as fs from "fs";
import { IUser } from "../models/User";
import { AuthRepo } from "../infrastructure/pg/authRepo";
// @ts-ignore
import mailer = require("../services/mailService");

const UserSchema = require("../models/User.ts");
const FileSchema = require("../models/File.ts");

require("dotenv").config();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { FileService } = require("../services/fileService.ts");

class AuthController {
  async registration(req: Request & IReq, res: Response & IRes) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Incorrect request", errors });
      }

      const checkExist = await AuthRepo.findUser(req, res);

      if (checkExist) {
        return checkExist;
      }

      const registerUser = await AuthRepo.registration(req, res);

      if (!fs.existsSync(req.filePath)) {
        try {
          fs.mkdirSync(req.filePath);
        } catch (e) {
          console.log(e);
        }
      }
      await FileService.createDir(
        req,
        new FileSchema({
          user: registerUser.id,
          name: "",
          path: registerUser.id,
        })
      );

      mailer(registerUser.email, registerUser.hashURL).then(() => {
        res.send({ message: "Registration success" });
      });
    } catch (e) {
      console.log(e);
      res.send({ message: "Server error" });
    }
  }

  async submit(req: Request & IReq, res: Response & IRes) {
    try {
      const user = (await UserSchema.findOne({
        hash: req.query.hash,
      })) as IUser;
      if (!user) {
        return res.status(404).json({ message: "Hash incorrect" });
      } else {
        user.active = true;
        user.hash = "";
        await user.save();
        const token = jwt.sign({ _id: user._id }, process.env.SECRETKEY, {
          expiresIn: "1h",
        });

        return res.json({
          token,
          user: {
            _id: user._id,
            email: user.email,
            diskSpace: user.diskSpace,
            usedSpace: user.usedSpace,
            avatar: user.avatar,
          },
        });
      }
    } catch (e) {
      console.log(e);
      return res.status(500).json("User submit error");
    }
  }

  async login(req: Request & IReq, res: Response & IRes) {
    try {
      const { email, password } = req.body;

      const user = await UserSchema.findOne({ email });
      if (!user) return res.status(404).json({ message: "User not found" });
      const isPassValid = bcrypt.compareSync(password, user.password);
      if (!isPassValid)
        return res.status(400).json({ message: "Invalid password" });

      if (user.active === false) {
        return res.status(400).json({ message: "User not submitted" });
      }
      const token = jwt.sign({ _id: user._id }, process.env.SECRETKEY, {
        expiresIn: "1h",
      });
      return res.json({
        token,
        user: {
          _id: user._id,
          email: user.email,
          diskSpace: user.diskSpace,
          usedSpace: user.usedSpace,
          avatar: user.avatar,
        },
      });
    } catch (e) {
      console.log(e);
      res.send({ message: "Server error" });
    }
  }

  async auth(req: Request & IReq, res: Response & IRes) {
    try {
      const user = (await UserSchema.findOne({ _id: req.user._id })) as IUser;

      if (user.active === false) {
        return res.status(400).json({ message: "User not submitted" });
      }

      const token = jwt.sign({ _id: user._id }, process.env.SECRETKEY, {
        expiresIn: "1h",
      });
      return res.json({
        token,
        user: {
          _id: user._id,
          email: user.email,
          diskSpace: user.diskSpace,
          usedSpace: user.usedSpace,
          avatar: user.avatar,
        },
      });
    } catch (e) {
      console.log(e);
      res.send({ message: "Server error" });
    }
  }

  async deleteUser(req: Request & IReq, res: Response & IRes) {
    try {
      const user = (await UserSchema.findOneAndDelete({
        _id: req.user._id,
      })) as IUser;
      return res.json({ message: `User ${user.email} was deleted` });
    } catch (e) {
      console.log(e);
      return res.json({ message: "Delete user error" });
    }
  }
}
module.exports = new AuthController();
