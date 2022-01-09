import { Router } from "express";
import jwtAuthCheck from "../../helpers/verifyToken";
import Controller from "./organization.controller";

const organization: Router = Router();
const controller = new Controller();

// Retrieve all Organizations
organization.post(
  "/",
  jwtAuthCheck,
  jwtAuthCheck,
  controller.registerOrganization
);

// Retrieve Organization / Organizations
organization.get(
  "/:organizationSlug",
  jwtAuthCheck,
  controller.getOrganizations
);

// Update a Organization with Id
organization.put("/:organizationSlug", jwtAuthCheck, controller.update);

// Delete a Organization with Id
organization.delete(
  "/:organizationSlug",
  jwtAuthCheck,
  controller.removeOrganization
);

export default organization;
