import { Router } from "express";
import Controller from "./users.controller";

const users: Router = Router();
const controller = new Controller();

// Retrieve all Users
users.get("/", controller.getAllUsers);
users.get("/:email", controller.getUser);

// Register or Update a User
users.put("/", controller.upsertUser);

// Retrieve all Users

// // Retrieve a Specific User
// users.get("/:uid", jwtAuthCheck, controller.getProfile);

// // Update a User with Id
// users.put("/:uid", jwtAuthCheck, controller.update);

// // Delete a User with Id
// users.delete("/:uid", jwtAuthCheck, controller.removeUser);

export default users;
