// import * as bcrypt from 'bcrypt';
import { Request, Response } from "express";
//import * as jwt from "jwt-then";

export default class UserController {
  public authenticate = async (req: Request, res: Response): Promise<any> => {
    const { email, password } = req.body;
    try {
      const user = {
        id: 1,
        username: "test",
        password: "test",
        firstName: "Test",
        lastName: "User",
        email: "test@gmail.com",
      };
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "User not found",
        });
      }

      // const token = await jwt.sign({ email }, config.JWT_ENCRYPTION, {
      //   expiresIn: config.JWT_EXPIRATION,
      // });

      res.status(200).send({
        success: true,
        message: "Token generated Successfully",
        // data: token,
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString(),
      });
    }
  };

  public register = async (req: Request, res: Response): Promise<any> => {
    const { name, lastName, email, password } = req.body;
    try {
      //const hash = await bcrypt.hash(password, config.SALT_ROUNDS);

      const user = {
        id: 1,
        username: "test",
        password: "test",
        firstName: "Test",
        lastName: "User",
        email: "test@gmail.com",
      };

      // const newUser = await user.save();

      res.status(201).send({
        success: false,
        message: "User Successfully created",
        //data: newUser,
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString(),
      });
    }
  };
}
