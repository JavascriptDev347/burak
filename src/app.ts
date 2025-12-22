import express from "express";
import path from "path";
import router from "./routes";
import routerAdmin from "./routerAdmin";
import morgan from "morgan";
import {MORGAN_FORMAT} from "./lib/config";
import session from "express-session"; //Session — foydalanuvchi login bo‘lgandan keyin: kimligi, login holati , serverda saqlanib turishi uchun ishlatiladi.
import ConnectMongoDB from "connect-mongodb-session"; //connect-mongodb-session — sessionlarni MongoDB collection’da saqlab beradigan adapter
import {T} from "./lib/types/common";

const MongoDBStore = ConnectMongoDB(session);
const store = new MongoDBStore({
    uri: String(process.env.MONGO_URL),
    collection: "sessions",
})

//  1- entrance
const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
// Morgan — bu Express.js uchun HTTP request logger middleware.
app.use(morgan(MORGAN_FORMAT));

// 2 -session
app.use(session({
    secret: String(process.env.SESSION_SECRET),
    cookie: {
        maxAge: 1000 * 60 * 60 * 3  // 3 hours active sessions
    },
    store: store,
    resave: true,  // true bo'lsa oxirgi kirgandan yana 3 soat qo'shib hisobledi, false bo'lsa unday emas
    saveUninitialized: false,
}))

app.use(function (req, res, next) {
    const sessionInstance = req.session as T;
    res.locals.member = sessionInstance.member;
    next();
})

// 3- views
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs");

// 4- routing
app.use("/admin", routerAdmin) // SSR: ejs
app.use("/", router) // for user => REACT

export default app;


