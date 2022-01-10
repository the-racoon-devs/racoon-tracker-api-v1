import { Router } from "express";
import Controller from "./projects.controller";

const users: Router = Router();
const controller = new Controller();

users.post("/create", controller.createProject); // Create a new project
users.get("/", controller.getAllProjects); // Get all projects
users.get("/:_id", controller.getProject); // Get a project by id
users.put("/:_id", controller.updateProject); // Update a project by id
users.delete("/:_id", controller.deleteProject); // Delete a project by id

// Register or Update a User
//users.put("/", controller.upsertUser);

// Retrieve all Users

// // Retrieve a Specific User
// users.get("/:uid", jwtAuthCheck, controller.getProfile);

// // Update a User with Id
// users.put("/:uid", jwtAuthCheck, controller.update);

// // Delete a User with Id
// users.delete("/:uid", jwtAuthCheck, controller.removeUser);

export default users;
