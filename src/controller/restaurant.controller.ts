import {T} from "../lib/types/common";
import {Request, Response} from "express";
import {LoginInput, MemberInput} from "../lib/types/member";
import MemberService from "../model/Member.service";
import {MemberType} from "../lib/enums/member.enum";

const restaurantController: T = {};

restaurantController.goHome = (req: Request, res: Response) => {
    try {
        res.send("Home page");
    } catch (err) {
        console.log("Error, goHome:", err)
    }
};

restaurantController.processLogin = async (req: Request, res: Response) => {

    try {
        console.log("processLogin");
        console.log("body:", req.body);
        const input: LoginInput = req.body;
        const memberService = new MemberService();
        const result = await memberService.processLogin(input);
        res.send(result);
    } catch (err) {
        console.log("Error, processLogin:", err)
        res.send(err);
    }
}

restaurantController.getLogin = (req: Request, res: Response) => {

    try {
        res.send("Login page");
    } catch (err) {
        console.log("Error, getLogin:", err)
    }
};

restaurantController.processSignup = async (req: Request, res: Response) => {
    try {
        console.log("processSignup");
        const newMember: MemberInput = req.body;
        newMember.memberType = MemberType.RESTAURANT;
        const memberService = new MemberService();
        const result = await memberService.processSignup(newMember);
        res.send(result);
    } catch (err) {
        console.log("Error, processSignup:", err);
        res.send(err);
    }
}

restaurantController.getSingup = (req: Request, res: Response) => {
    try {

        res.send("Signup page");
    } catch (err) {
        console.log("Error, getSignup:", err)
    }
};


export default restaurantController;