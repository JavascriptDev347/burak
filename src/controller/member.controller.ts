import {T} from "../lib/types/common";
import {Request, Response} from "express";
import {LoginInput, MemberInput} from "../lib/types/member";
import MemberService from "../model/Member.service";
import Errors from "../lib/Error";
const memberController: T = {};

memberController.signup = async (req: Request, res: Response) => {
    try {
        console.log("signup");
        const input: MemberInput = req.body;
        const service = new MemberService();
        const result = await service.signup(input);

        res.json({member: result});
    } catch (err) {
        console.log("Error, signup", err);
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standart.code).json(Errors.standart);
    }
}

memberController.login = async (req: Request, res: Response) => {
    try {
        console.log("login");
        const input: LoginInput = req.body;
        const memberService = new MemberService();
        const result = await memberService.login(input);
        res.send(result);
    } catch (err) {
        console.log("login err: ", err);
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standart.code).json(Errors.standart);
    }
}


export default memberController;
