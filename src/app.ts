import express from "express";
import path from "path";
import router from "./routes";
import routerAdmin from "./routerAdmin";
import morgan from "morgan";
import {MORGAN_FORMAT} from "./lib/config";
//  1- entrance
const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
// Morgan — bu Express.js uchun HTTP request logger middleware.
app.use(morgan(MORGAN_FORMAT));

// 2 -session

// 3- views
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs");

// 4- routing
app.use("/admin", routerAdmin) // SSR: ejs
app.use("/", router) // for user => REACT

export default app;


