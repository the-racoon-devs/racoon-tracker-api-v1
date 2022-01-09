import { Router } from "express";
import users from "./users/user.route";

const router: Router = Router();

router.use("/users", users);

export default router;
