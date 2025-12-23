import {T} from "../lib/types/common";
import {NextFunction, Request, Response} from "express";
import {AdminRequest, LoginInput, MemberInput} from "../lib/types/member";
import MemberService from "../model/Member.service";
import {MemberType} from "../lib/enums/member.enum";
import Errors, {Message} from "../lib/Error";

const restaurantController: T = {};


restaurantController.goHome = (req: Request, res: Response) => {
    try {
        res.send("Home page");
    } catch (err) {
        console.log("Error, goHome:", err)
    }
};

restaurantController.getLogin = (req: Request, res: Response) => {

    try {
        res.send("Login page");
    } catch (err) {
        console.log("Error, getLogin:", err)
    }
};

restaurantController.getSingup = (req: Request, res: Response) => {
    try {

        res.send("Signup page");
    } catch (err) {
        console.log("Error, getSignup:", err)
    }
};

restaurantController.processSignup = async (req: AdminRequest, res: Response) => {
    try {
        console.log("processSignup");
        const newMember: MemberInput = req.body;
        newMember.memberType = MemberType.RESTAURANT;
        const memberService = new MemberService();
        const result = await memberService.processSignup(newMember);
        // SESSION AUTHENTICATION

        req.session.member = result;
        req.session.save(function (err) {
            if (err) {
                console.log("session save error:", err)
            }
            // res.send(result)
            res.redirect("/admin/product/all")
        });
    } catch (err) {
        console.log("Error, processSignup:", err);
        const message = err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
        res.send(`<script> alert(${message}"); window.location.replace("admin/signup") </script>`);
    }
}

restaurantController.processLogin = async (req: AdminRequest, res: Response) => {

    try {
        console.log("processLogin");
        const input: LoginInput = req.body;
        const memberService = new MemberService();
        const result = await memberService.processLogin(input);
        req.session.member = result;
        req.session.save(function () {
            res.redirect("/admin/product/all")
        });
    } catch (err) {
        console.log("Error, processLogin:", err)
        const message = err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
        res.send(`<script> alert(${message}"); window.location.replace("admin/login") </script>`);
        res.send(err);
    }
}

restaurantController.checkAuthSession = async (req: AdminRequest, res: Response) => {
    try {
        if (req.session?.member) res.send(`<script> alert(${req.session.member.memberNick}") </script>`);
        else res.send(`<script> alert(${Message.NOT_AUTHENTICATED}") </script>`);
    } catch (err) {
        console.log("Error, checkAuthSession:", err)
        res.send(err);
    }
}

restaurantController.verifyRestaurant = async (req: AdminRequest, res: Response, next: NextFunction) => {
    console.log("MEMBER TYPE IN VERIFY : ", req.session?.member)
    if (req.session?.member?.memberType === MemberType.RESTAURANT) {
        req.member = req.session.member;
        next();
    } else {
        const message = Message.NOT_AUTHENTICATED;
        res.send(`<script> alert("${message}"); window.location.replace("/admin/login"); </script>`);
    }
}

restaurantController.logout = async (req: AdminRequest, res: Response) => {

    try {
        console.log("logout");

        req.session.destroy(function () {
            res.redirect("/admin")
        });

    } catch (err) {
        console.log("Error, processLogin:", err)
        res.redirect("/admin")

    }
};

restaurantController.getUsers = async (req: AdminRequest, res: Response) => {
    try {
        const memberService = new MemberService();
        const result = await memberService.getUsers();
        res.render("users", {users: result});
    } catch (err) {
        console.log("Error, getUsers:", err);
        res.redirect("/admin/login")
    }
}
export default restaurantController;