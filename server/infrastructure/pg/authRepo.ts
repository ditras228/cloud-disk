import { IReq, IRes } from "../../typings/IRoute";

const db = require("../../db.ts");
const bcrypt = require("bcryptjs");

export {};

export class AuthRepo {
  static async checkUserExist(req: Request & IReq, res: Response & IRes) {
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

  static async findUserByHash(req: Request & IReq, res: Response & IRes) {
    const hash = req.query.hash;
    const candidate = await db.query(
      `

                SELECT 
                    email
                
                FROM 
                    public.users
                
                WHERE 
                    hash = $1 
                    
                    `,
      [hash]
    );

    if (candidate.rows[0]) {
      return await db.query(
        `

                UPDATE 
                    public.users
                
                SET activated_at = $2, hash = null

                WHERE id = $1

                    `,
        [hash]
      );
    } else {
      res.status(404).json({ message: "Hash incorrect" });
    }
  }

  static async findOne(id: number) {
    const userRows = await db.query(
      `

                SELECT 
                    email, password
                
                FROM 
                    public.users
                
                WHERE 
                    email = $1 
                    
                    `,
      [id]
    );
    return userRows.rows[0];
  }
}
