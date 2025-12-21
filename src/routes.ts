import express from "express";
import memberController from "./controller/member.controller";

const router = express.Router();
router.post("/login", memberController.login);
router.post("/signup", memberController.signup);

export default router;