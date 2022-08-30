import { IReq, IRes } from "../../typings/IRoute";

const db = require("../../db.ts");
const bcrypt = require("bcryptjs");

export {};

export class AuthRepo {
  static async findUser(req: Request & IReq, res: Response & IRes) {
    const { email } = req.body;
    const candidate = await db.query(
      `

                SELECT 
                    email
                
                FROM 
                    public.users
                
                WHERE 
                    email = $1 
                    
                    `,
      [email]
    );
    if (candidate.rows[0]) {
      return res
        .status(400)
        .json({ message: `User with email ${email} already exist` });
    }
  }

  static async registration(req: Request & IReq, res: Response & IRes) {
    const { email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 5);
    const hashURL = await bcrypt.hash(email, 5);

    const newUser = await db.query(
      `
                INSERT INTO 
                    public.users(email, password, avatar, hash)

                VALUES 
                    ($1, $2, $3, $4)

                RETURNING 
                    id, email, hash

            `,
      [email, hashPassword, null, hashURL]
    );
    return newUser.rows[0];
  }
}
