//import * as bcrypt from 'bcrypt';
import { Request, Response } from "express";
import PG_ERROR from "../../helpers/postgresCodes";
import mongo from "../../config/db";
import getUser from "./user.utils";
import getOrganization from "../organizations/organization.utils";

export default class UserController {
  public findAll = async (req: Request, res: Response): Promise<any> => {
    try {
      var users = {};

      try {
        const db = await mongo.connect();
        try {
          users = await mongo.db().collection("users").find();
          const result = await mongo.db().collection("users").find();
          res.status(200).send({
            success: true,
            message: "Users Successfully Retrieved",
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

  public registerUser = async (req: Request, res: Response): Promise<any> => {
    var user = {};
    const { emailId, givenName, familyName, phone, callingCode, uid } =
      req.body;
    try {
      const db = await mongo.connect();
      try {
        user = await mongo.db().collection("users").findOne({
          uid: uid,
        });

        if (user) {
          return res.status(400).send({
            success: false,
            message: "User already exists",
            data: null,
          });
        } else {
          const result = await mongo.db().collection("users").insertOne({
            emailId: emailId,
            givenName: givenName,
            familyName: familyName,
            phone: phone,
            callingCode: callingCode,
            uid: uid,
            createdAt: new Date(),
          });

          console.log(
            `New listing created with the following id: ${result.insertedId}`
          );
        }
      } catch (e) {
        throw e;
      }
      res.status(200).send({
        success: true,
        message: "User Successfully created",
        data: user,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        success: false,
        message: err,
        givenParameters: req.body,
      });
    }
  };

  //   public getProfile = async (req: Request, res: Response): Promise<any> => {
  //     try {
  //       var user: any = {};
  //       user = await getUser(req.params.uid);

  //       if (!user) {
  //         return res.status(404).send({
  //           success: false,
  //           message: "User not found",
  //           data: user,
  //         });
  //       } else {
  //         var organization = {};
  //         organization = await getOrganization(user.organizationIds);

  //         res.status(200).send({
  //           success: true,
  //           data: { user: user, organizations: organization },
  //         });
  //       }
  //     } catch (err) {
  //       res.status(500).send({
  //         success: false,
  //         message: err.toString(),
  //         data: null,
  //       });
  //     }
  //   };

  //   public update = async (req: Request, res: Response): Promise<any> => {
  //     const { name, lastName, email, password } = req.body;
  //     try {
  //       const userUpdated = true;
  //       if (!userUpdated) {
  //         return res.status(404).send({
  //           success: false,
  //           message: "User not found",
  //           data: null,
  //         });
  //       }
  //       res.status(200).send({
  //         success: true,
  //         data: userUpdated,
  //       });
  //     } catch (err) {
  //       res.status(500).send({
  //         success: false,
  //         message: err.toString(),
  //         data: null,
  //       });
  //     }
  //   };

  //   public removeUser = async (req: Request, res: Response): Promise<any> => {
  //     try {
  //       var user = {};
  //       user = await getUser(req.params.uid);

  //       if (!user) {
  //         return res.status(404).send({
  //           success: false,
  //           message: "User not found",
  //         });
  //       }

  //       await dbPool
  //         .query(`DELETE FROM "users" WHERE "uid"='${req.params.uid}'`) // TODO: Also delete from the roles table
  //         .catch((err) => {
  //           throw err;
  //         });

  //       res.status(200).send({
  //         success: true,
  //         message: "User Successfully deleted",
  //       });
  //     } catch (err) {
  //       res.status(500).send({
  //         success: false,
  //         message: err.toString(),
  //       });
  //     }
  //   };
}
