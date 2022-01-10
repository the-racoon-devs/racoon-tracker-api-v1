import { Router } from "express";
import jwtAuthCheck from "../helpers/verifyToken";

import users from "./users/users.route";
import projects from "./projects/projects.route";

const router: Router = Router();

router.use("/users", jwtAuthCheck, users);
router.use("/projects", jwtAuthCheck, projects);

export default router;
