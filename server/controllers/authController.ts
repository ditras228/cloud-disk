import { IReq, IRes } from "../typings/IRoute";
import * as fs from "fs";
import { IUser } from "../models/User";
import { AuthRepo } from "../infrastructure/pg/authRepo";
// @ts-ignore
import mailer = require("../services/mailService");

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

      const checkExist = await AuthRepo.checkUserExist(req, res);

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

      await FileService.createDir(req, {
        user: registerUser.id,
        name: "",
        path: registerUser.id,
      });

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
      const user = (await AuthRepo.findUserByHash(req, res)) as IUser;
      const token = jwt.sign({ id: user.id }, process.env.SECRETKEY, {
        expiresIn: "1h",
      });

      return res.json({
        token,
        user,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json("User submit error");
    }
  }

  async login(req: Request & IReq, res: Response & IRes) {
    try {
      const { password } = req.body;
      const user = (await AuthRepo.findOne(req.user.id)) as IUser;

      const isPassValid = bcrypt.compareSync(password, user.password);

      if (!isPassValid)
        return res.status(400).json({ message: "Invalid password" });

      if (user.active === false) {
        return res.status(400).json({ message: "User not submitted" });
      }

      const token = jwt.sign({ id: user.id }, process.env.SECRETKEY, {
        expiresIn: "1h",
      });

      return res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          disk_space: user.disk_space,
          used_space: user.used_space,
          avatar: user.avatar,
        } as IUser,
      });
    } catch (e) {
      console.log(e);
      res.send({ message: "Server error" });
    }
  }

  async auth(req: Request & IReq, res: Response & IRes) {
    try {
      const user = (await AuthRepo.findOne(req.user.id)) as IUser;

      if (user.active === false) {
        return res.status(400).json({ message: "User not submitted" });
      }

      const token = jwt.sign({ id: user.id }, process.env.SECRETKEY, {
        expiresIn: "1h",
      });

      return res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          disk_space: user.disk_space,
          used_space: user.used_space,
          avatar: user.avatar,
        } as IUser,
      });
    } catch (e) {
      console.log(e);
      res.send({ message: "Server error" });
    }
  }
}
module.exports = new AuthController();
