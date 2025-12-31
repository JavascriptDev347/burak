import OrderService from "../model/Order.service";
import {T} from "../lib/types/common"
import {ExtendedRequest} from "../lib/types/member";
import Errors, {HttpCode} from "../lib/Error";
import {Response} from "express";
import {OrderInquiry} from "../lib/types/order";
import {OrderStatus} from "../lib/enums/order.enum";

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

orderController.getMyOrders = async (req: ExtendedRequest, res: Response) => {
    try {
        const {page, limit, orderStatus} = req.query;
        const inquiry: OrderInquiry = {
            page: Number(page),
            limit: Number(limit),
            orderStatus: orderStatus as OrderStatus
        }

        const result = await orderService.getMyOrders(req.member, inquiry);

        res.status(HttpCode.OK).json(result);
    } catch (err) {
        console.log("Error, getMyOrders:", err);
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standart.code).json(Errors.standart);
    }
}

export default orderController;
