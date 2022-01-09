import { Router } from "express";
import jwtAuthCheck from "../../helpers/verifyToken";
import Controller from "./user.controller";

const user: Router = Router();
const controller = new Controller();

// Retrieve all Users
user.post("/", jwtAuthCheck, controller.registerUser);

// Retrieve all Users
user.get("/", controller.findAll);

// // Retrieve a Specific User
// user.get("/:uid", jwtAuthCheck, controller.getProfile);

// // Update a User with Id
// user.put("/:uid", jwtAuthCheck, controller.update);

// // Delete a User with Id
// user.delete("/:uid", jwtAuthCheck, controller.removeUser);

export default user;
