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
      res.status(500).send({
        success: false,
        message: e.message,
      });
    } finally {
      await mongo.close();
    }
  };

  public updateProject = async (req: Request, res: Response): Promise<any> => {
    try {
      var project = req.body;
      project = {
        ...project,
        owner: new ObjectId(project.owner),
      };

      await mongo.connect();

      const result = await mongo
        .db()
        .collection("projects")
        .updateOne({ _id: new ObjectId(req.params._id) }, { $set: project });

      if (result.matchedCount === 0) {
        res.status(404).send({
          success: false,
          message: "Project not found",
        });
      } else if (result.modifiedCount === 0) {
        res.status(400).send({
          success: false,
          message: "Project not updated",
        });
      } else {
        res.status(200).send({
          success: true,
          data: result,
        });
      }
    } catch (e) {
      console.error(e);
      res.status(500).send({
        success: false,
        message: e.message,
      });
    } finally {
      await mongo.close();
    }
  };

  public deleteProject = async (req: Request, res: Response): Promise<any> => {
    try {
      await mongo.connect();
      console.log(req.params._id);
      const result = await mongo
        .db()
        .collection("projects")
        .deleteOne({
          _id: new ObjectId(req.params._id),
        });
      if (result.deletedCount === 0) {
        res.status(404).send({
          success: false,
          message: "Project not found",
        });
      } else {
        res.status(200).send({
          success: true,
          data: result,
        });
      }
    } catch (e) {
      console.error(e);
      res.status(500).send({
        success: false,
        message: e.message,
      });
    } finally {
      await mongo.close();
    }
  };

  public getProject = async (req: Request, res: Response): Promise<any> => {
    try {
      await mongo.connect();
      const result = await mongo
        .db()
        .collection("projects")
        .findOne({
          _id: new ObjectId(req.params._id),
        });

      if (result === null) {
        res.status(404).send({
          success: false,
          message: "Project not found",
        });
      } else {
        res.status(200).send({
          success: true,
          data: result,
        });
      }
    } catch (e) {
      console.error(e);
      res.status(500).send({
        success: false,
        message: e.message,
      });
    } finally {
      await mongo.close();
    }
  };

  public getAllProjects = async (req: Request, res: Response): Promise<any> => {
    try {
      var projects = {};

      await mongo.connect();
      projects = await mongo.db().collection("projects").find().toArray();
      res.status(200).send({
        success: true,
        data: projects,
      });
    } catch (e) {
      console.error(e);
      res.status(500).send({
        success: false,
        message: e.message,
      });
    } finally {
      await mongo.close();
    }
  };

  public createTicket = async (req: Request, res: Response): Promise<any> => {
    try {
      await mongo.connect();
      var ticket = req.body;

      ticket = {
        ...ticket,
        _id: new ObjectId(ticket._id),
        project: new ObjectId(ticket.project),
        createdBy: new ObjectId(ticket.createdBy),
        assignedTo: new ObjectId(ticket.assignedTo),
        deadline: new Date(ticket.deadline),
      };

      const result = await mongo.db().collection("tickets").insertOne(ticket);
      res.status(200).send({
        success: true,
        data: result,
      });
    } catch (e) {
      console.error(e);
      res.status(500).send({
        success: false,
        message: e.message,
      });
    } finally {
      await mongo.close();
    }
  };

  public updateTicket = async (req: Request, res: Response): Promise<any> => {
    try {
      var ticket = req.body;
      ticket = {
        ...ticket,
        _id: new ObjectId(ticket._id),
        project: new ObjectId(ticket.projectId),
        createdBy: new ObjectId(ticket.createdBy),
        assignedTo: new ObjectId(ticket.assignedTo),
        deadline: new Date(ticket.deadline),
      };

      await mongo.connect();

      const result = await mongo
        .db()
        .collection("tickets")
        .updateOne({ _id: new ObjectId(ticket._id) }, { $set: ticket });

      if (result.matchedCount === 0) {
        res.status(404).send({
          success: false,
          message: "Ticket not found",
        });
      } else if (result.modifiedCount === 0) {
        res.status(400).send({
          success: false,
          message: "Ticket not updated",
        });
      } else {
        res.status(200).send({
          success: true,
          data: result,
        });
      }
    } catch (e) {
      console.error(e);
      res.status(500).send({
        success: false,
        message: e.message,
      });
    } finally {
      await mongo.close();
    }
  };

  public deleteTicket = async (req: Request, res: Response): Promise<any> => {
    try {
      await mongo.connect();
      const result = await mongo
        .db()
        .collection("tickets")
        .deleteOne({
          _id: new ObjectId(req.body._id),
        });
      if (result.deletedCount === 0) {
        res.status(404).send({
          success: false,
          message: "Ticket not found",
        });
      } else {
        res.status(200).send({
          success: true,
          data: result,
        });
      }
    } catch (e) {
      console.error(e);
      res.status(500).send({
        success: false,
        message: e.message,
      });
    } finally {
      await mongo.close();
    }
  };

  public getTickets = async (req: Request, res: Response): Promise<any> => {
    try {
      await mongo.connect();
      const result = await mongo
        .db()
        .collection("tickets")
        .find({
          project: new ObjectId(req.params._id),
        })
        .sort([["_id", -1]])
        .toArray();

      if (result.length === 0) {
        res.status(404).send({
          success: false,
          message: "Tickets not found",
        });
      } else {
        res.status(200).send({
          success: true,
          data: result,
        });
      }
    } catch (e) {
      console.error(e);
      res.status(500).send({
        success: false,
        message: e.message,
      });
    } finally {
      await mongo.close();
    }
  };

  public addUser = async (req: Request, res: Response): Promise<any> => {
    try {
      var project = req.body;
      project = {
        ...project,
        ...{
          collabs: project.collabs.map((_id) => new ObjectId(_id)),
          superCollabs: project.superCollabs.map((_id) => new ObjectId(_id)),
        },
      };

      await mongo.connect();

      const result = await mongo
        .db()
        .collection("projects")
        .updateOne({ _id: new ObjectId(req.params._id) }, { $set: project });

      if (result.matchedCount === 0) {
        res.status(404).send({
          success: false,
          message: "Project not found",
        });
      } else if (result.modifiedCount === 0) {
        res.status(400).send({
          success: false,
          message: "Project not updated",
        });
      } else {
        res.status(200).send({
          success: true,
          data: result,
        });
      }
    } catch (e) {
      console.error(e);
      res.status(500).send({
        success: false,
        message: e.message,
      });
    } finally {
      await mongo.close();
    }
  };
}
