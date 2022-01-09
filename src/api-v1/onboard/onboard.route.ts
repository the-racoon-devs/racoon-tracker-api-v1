import { Router } from "express";
import jwtAuthCheck from "../../helpers/verifyToken";
import Controller from "./onboard.controller";

const onboard: Router = Router();
const controller = new Controller();

// Retrieve all Organizations
onboard.post("/", jwtAuthCheck, jwtAuthCheck, controller.registerOrganization);

// Retrieve Organization / Organizations
onboard.get("/:organizationSlug", jwtAuthCheck, controller.getOrganizations);

// Update a Organization with Id
onboard.put("/:organizationSlug", jwtAuthCheck, controller.update);

// Delete a Organization with Id
onboard.delete(
  "/:organizationSlug",
  jwtAuthCheck,
  controller.removeOrganization
);

export default onboard;
