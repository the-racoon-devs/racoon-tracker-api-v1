//import * as bcrypt from 'bcrypt';
import { Request, Response } from "express";
import mongo from "../../config/db";

var ObjectId = require("mongodb").ObjectId;

export default class UserController {
  public upsertUser = async (req: Request, res: Response): Promise<any> => {
    try {
      var user = req.body;
      await mongo.connect();
      var updatedUser = {
        name: user.name,
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

      console.log(result);

      const userData = await mongo
        .db()
        .collection("users")
        .findOne(
          {
            email: {
              $eq: user.email, // Check if the email is the same
            },
          },
          {
            sort: { email: 1 }, // Sort by email ascending
          }
        );
      console.log(userData);
      if (userData === null) {
        res.status(404).send({
          success: false,
          message: "User not found",
        });
      } else {
        res.status(200).send({
          success: true,
          data: userData,
        });
      }
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
          users = await mongo
            .db()
            .collection("users")
            .find()
            .sort([["_id", -1]])
            .toArray();
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

  public getProjects = async (req: Request, res: Response): Promise<any> => {
    try {
      await mongo.connect();
      const owned = await mongo
        .db()
        .collection("projects")
        .find(
          {
            $or: [
              {
                owner: new ObjectId(req.params._id),
              },
              {
                superCollabs: {
                  $in: [new ObjectId(req.params._id)],
                },
              },
            ],
          },
          { sort: { _id: -1 } }
        )
        .sort([["_id", -1]])
        .toArray();

      const assigned = await mongo
        .db()
        .collection("projects")
        .find(
          {
            collabs: {
              $in: [new ObjectId(req.params._id)],
            },
          },
          { sort: { _id: -1 } }
        )
        .toArray();

      var projects = { owned: owned, assigned: assigned };
      console.log(projects);

      if (projects.owned.length === 0 && projects.assigned.length === 0) {
        res.status(404).send({
          success: false,
          message: "User has no projects",
        });
      } else {
        res.status(200).send({
          success: true,
          data: projects,
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
