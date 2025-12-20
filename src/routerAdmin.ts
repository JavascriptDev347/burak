import express from "express";
import restaurantController from "./controller/restaurant.controller";

const routerAdmin = express.Router();

routerAdmin.get("/", restaurantController.goHome);

routerAdmin
    .get("/login", restaurantController.getLogin)
    .post("/login", restaurantController.processLogin);

routerAdmin
    .get("/signup", restaurantController.getSingup)
    .post("/signup", restaurantController.processSignup);

export default routerAdmin;