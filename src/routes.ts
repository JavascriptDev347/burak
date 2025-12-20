import express from "express";
import memberController from "./controller/member.controller";

const router = express.Router();

router.post("/register", memberController.processSignUp);

export default router;