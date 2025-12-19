import express from "express";
import memberController from "./controller/member.controller";

const router = express.Router();

router.get("/", memberController.goHome);

router.post("/login", memberController.getLogin);

router.post("/signup", memberController.getSingup);

export default router;