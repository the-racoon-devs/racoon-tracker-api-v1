//import * as bcrypt from 'bcrypt';
import { Request, Response } from "express";
import mongo from "../../config/db";

var ObjectId = require("mongodb").ObjectId;

export default class UserController {
  public createProject = async (req: Request, res: Response): Promise<any> => {
    try {
      await mongo.connect();
      var project = req.body;
      const result = await mongo.db().collection("projects").insertOne(project);
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
