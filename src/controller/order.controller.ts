import OrderService from "../model/Order.service";
import {T} from "../lib/types/common"
import {ExtendedRequest} from "../lib/types/member";
import Errors, {HttpCode} from "../lib/Error";
import {Response} from "express";

const orderService = new OrderService();
const orderController: T = {};

orderController.createOrder = async (req: ExtendedRequest, res: Response) => {
    try {
        console.log("createOrder");
        const result = await orderService.createOrder(req.member, req.body);
        res.status(HttpCode.CREATED).json(result);
    } catch (err) {
        console.log("Error, createOrder:", err);
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(HttpCode.INTERNAL_SERVER_ERROR).json(Errors.standart);
    }
};

export default orderController;
