import {ObjectId, Types} from "mongoose";
import {orderStatus} from "../enums/order.enum";

export interface OrderItem {
    _id: Types.ObjectId;
    itemQuantity: number;
    ItemPrice: number;
    orderId: Types.ObjectId;
    productId: Types.ObjectId;
    createAt: Date;
    updatedAt: Date;
}

export interface Order {
    _id: Types.ObjectId;
    orderTotal: number;
    orderDelivery: number;
    orderStatus: orderStatus;
    memberId: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

export interface OrderItemInput {
    itemQuantity: number;
    itemPrice: number;
    productId: Types.ObjectId;
    orderId?: Types.ObjectId;
}
