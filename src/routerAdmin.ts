import express from "express";
import restaurantController from "./controller/restaurant.controller";

const routerAdmin = express.Router();

routerAdmin.get("/", restaurantController.goHome);

routerAdmin.post("/login", restaurantController.getLogin);

routerAdmin.post("/signup", restaurantController.getSingup);

export default routerAdmin;