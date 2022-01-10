//import * as bcrypt from 'bcrypt';
import { Request, Response } from "express";
import mongo from "../../config/db";

export default class UserController {
  public upsertUser = async (req: Request, res: Response): Promise<any> => {
    try {
      var user = req.body;
      await mongo.connect();
      var updatedUser = {
        fullName: user.fullName,
        email: user.email,
        sub: user.sub,
      };
      const result = await mongo
        .db()
        .collection("users")
        .updateOne(
          { email: user.email },
          { $set: updatedUser },
          { upsert: true }
        );

      res.status(200).send({
        success: true,
        data: result,
      });
    } catch (e) {
      console.error(e);
      res.status(500).send(e);
    } finally {
      await mongo.close();
    }
  };

  public getUser = async (req: Request, res: Response): Promise<any> => {
    try {
      await mongo.connect();
      const result = await mongo
        .db()
        .collection("users")
        .findOne(
          {
            email: {
              $eq: req.params.email, // Check if the email is the same
            },
          },
          {
            sort: { email: 1 }, // Sort by email ascending
          }
        );
      if (result === null) {
        res.status(404).send({
          success: false,
          message: "User not found",
        });
      } else {
        res.status(200).send({
          success: true,
          data: result,
        });
      }
    } catch (e) {
      console.error(e);
      res.status(500).send(e);
    } finally {
      await mongo.close();
    }
  };

  public getAllUsers = async (req: Request, res: Response): Promise<any> => {
    try {
      var users = {};

      try {
        const db = await mongo.connect();
        try {
          users = await mongo.db().collection("users").find().toArray();
          res.status(200).send({
            success: true,
            data: users,
          });
        } catch (e) {
          throw e;
        }
      } catch (err) {
        console.log(err);
        res.status(500).send({
          success: false,
          message: err,
          givenParameters: req.body,
        });
      }
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null,
      });
    }
  };
}
