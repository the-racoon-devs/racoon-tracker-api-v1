import { Router } from "express";
import auth from "./auth/auth.route";
import users from "./users/user.route";
// import organizations from "./organizations/organization.route";

const router: Router = Router();

router.use("/auth", auth);
router.use("/users", users);
// router.use("/orgs", organizations);

export default router;
