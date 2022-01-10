import { Router } from "express";
import users from "./users/user.route";
import jwtAuthCheck from "../helpers/verifyToken";

const router: Router = Router();

router.use("/users", jwtAuthCheck, users);

export default router;
