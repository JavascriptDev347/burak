import mongoose, {Schema, Types} from "mongoose";
import {orderStatus} from "../lib/enums/order.enum";

const OrderSchema = new Schema({
    orderTotal: {
        type: Number,
        required: true,
    },
    orderDelivery: {
        type: Number,
        required: true,
    },
    orderStatus: {
        type: String,
        enum: orderStatus,
        default: orderStatus.PAUSE
    },
    memberId: {
        type: Types.ObjectId,
        required: true,
        ref: "Member",
    }
}, {timestamps: true});

export default mongoose.model("Order", OrderSchema);