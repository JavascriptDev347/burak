import mongoose, {Schema} from "mongoose";
import {MemberStatus, MemberType} from "../lib/enums/member.enum";

// create schema
const memberSchema = new Schema({
        memberType: {
            type: String, //DB da string saqlaydi
            enum: MemberType, // faqat enum ichidagi qiymatlarni oladi
            default: MemberType.USER // boshlang'ich xolatida "USER" bo'ladi
        },

        memberStatus: {
            type: String,
            enum: MemberStatus,
            default: MemberStatus.ACTIVE
        },
        memberNick: {
            type: String,
            index: {unique: true, sparse: true}, // unique: takrorlanmas bo'lsin, sparse: faqat bor hujjatlar tekshiriladi
            required: true // bu maydon majburiy hisoblanadi
        },
        memberPhone: {
            type: String,
            index: {unique: true, sparse: true},
            required: true
        },
        memberPassword: {
            type: String,
            select: false, // select: false bo'lsa find(): qilinganida memberPassword ko'rinmaydi (chiqmaydi)
            required: true
        },
        memberAddress: {
            type: String,
        },
        memberDesc: {
            type: String,
        },
        memberImage: {
            type: String,
        },
        memberPoints: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true // timestaps - database da createdAt va updatedAt ma'lumotlarni qo'yib beradi.
    }
);

export default mongoose.model("Member", memberSchema);