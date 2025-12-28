import mongoose, {Schema, Types} from "mongoose";

const orderItemSchema = new Schema({
    itemQuantity: {
        type: Number,
        required: true,
    },
    itemPrice: {
        type: Number,
        required: true,
    },
    orderId: {
        type: Types.ObjectId,
        ref: "Order"
    },
    productId: {
        type: Types.ObjectId,
        ref: "Product"
    }
}, {timestamps: true, collection: "orderItems"});

export default mongoose.model("OrderItem", orderItemSchema);