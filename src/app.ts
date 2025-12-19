import express from "express";
import path from "path";
import router from "./routes";
import routerAdmin from "./routerAdmin";

//  1- entrance
const app = express();
// public ichidagi filelarni to'g'ridan-to'g'ri serve qilish uchun ishlatiladi.
app.use(express.static(path.join(__dirname, "public")));
// bodydan keladigan {} larni o'qish uchun, extended true degani ichma-ich {} larni o'qiy olish uchun
app.use(express.urlencoded({extended: true}));
// jsonda parse qilish uchun
app.use(express.json());

// 2 -session

// 3- views
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs");

// 4- routing
app.use("/admin", routerAdmin) // SSR: ejs
app.use("/", router) // for user => REACT

export default app;


