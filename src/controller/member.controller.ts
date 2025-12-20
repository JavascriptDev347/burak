import {T} from "../lib/types/common";
import {Request, Response} from "express";
import MemberService from "../model/Member.service";

const memberController: T = {};

memberController.processSignUp = async (req: Request, res: Response) => {
    try {
        const m = new MemberService();
        const resp = await m.processSignup(req.body);
    } catch (e) {
    }
}

export default memberController;
