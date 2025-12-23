import MemberModel from "../schema/Member.model";
import {LoginInput, Member, MemberInput, MemberUpdateInput} from "../lib/types/member";
import {MemberType} from "../lib/enums/member.enum";
import Errors, {HttpCode, Message} from "../lib/Error";
import * as bcrypt from "bcryptjs"
import {shapeIntoMongooseObjectId} from "../lib/config";

class MemberService {
    private readonly memberModel;

    constructor() {
        this.memberModel = MemberModel; // qachongi yangi new MemberService qilganimda constructor ishga tushadi
    }

    //📌📌📌📌📌📌📌📌📌📌📌 SPA 📌📌📌📌📌📌📌📌📌📌📌
    public async signup(input: MemberInput): Promise<Member> {
        const salt = await bcrypt.genSalt();
        input.memberPassword = await bcrypt.hash(input.memberPassword, salt);

        try {
            const result = await this.memberModel.create(input);
            result.memberPassword = "";
            console.log("Successfully created member", result);
            return result.toJSON();
        } catch (e) {
            console.log("Failed creating member signup", e);
            throw new Errors(HttpCode.BAD_REQUEST, Message.USED_NICK_PHONE);
        }

    }

    public async login(input: LoginInput): Promise<Member> {
        const member = await this.memberModel.findOne(
            {memberNick: input.memberNick,}, //filter?
            {memberNick: 1, memberPassword: 1}).exec(); // projection

        if (!member) throw new Errors(HttpCode.BAD_REQUEST, Message.NO_MEMBER_NICK);

        const isMatch = await bcrypt.compare(input.memberPassword, member.memberPassword);
        if (!isMatch) throw new Errors(HttpCode.UNAUTHORIZED, Message.WRONG_PASSWORD);

        // .lean() → Mongoose Document emas, oddiy JS object qaytaradi
        const result = await this.memberModel.findById(member._id).lean().exec();
        if (!result) {
            throw new Errors(HttpCode.NOT_FOUND, Message.NO_MEMBER_NICK);
        }

        return result;
    }

    //📌📌📌📌📌📌📌📌📌📌📌 SPA 📌📌📌📌📌📌📌📌📌📌📌

    public async processSignup(input: MemberInput): Promise<Member> {
        const exist = await this.memberModel.findOne({
            memberType: MemberType.RESTAURANT,
        }).exec();

        if (exist) {
            throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED)
        }

        // *** HASHING PASSWORDS ***
        console.log("before:", input.memberPassword);
        const salt = await bcrypt.genSalt();
        input.memberPassword = await bcrypt.hash(input.memberPassword, salt);
        console.log("after:", input.memberPassword);


        try {
            const result = await this.memberModel.create(input);
            result.memberPassword = "";
            return result;

        } catch (err) {
            throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED)
        }
    }

    public async processLogin(input: LoginInput): Promise<Member> {
        const member = await this.memberModel.findOne(
            {memberNick: input.memberNick},
            {memberNick: 1, memberPassword: 1})
            .exec();

        if (!member) throw new Errors(HttpCode.NOT_FOUND, Message.NO_MEMBER_NICK);

        const isMatch = await bcrypt.compare(input.memberPassword, member.memberPassword);
        console.log("isMatch:", isMatch);

        if (!isMatch) {
            throw new Errors(HttpCode.UNAUTHORIZED, Message.WRONG_PASSWORD);
        }

        const result = await this.memberModel.findById(member._id).exec()
        if (!result) {
            throw new Errors(HttpCode.BAD_REQUEST, Message.NO_DATA_FOUND)
        }
        return result;

    }

    public async getUsers(): Promise<Member[]> {
        const result = await this.memberModel.find({
            memberType: MemberType.USER
        }).exec();

        if (!result) throw new Errors(HttpCode.BAD_REQUEST, Message.NO_DATA_FOUND) ;

        return result;
    }

    public async updateChosenUser(input: MemberUpdateInput): Promise<Member> {
        input._id = shapeIntoMongooseObjectId(input._id);
        const result = await this.memberModel.findOneAndUpdate({_id: input._id}, input, {new: true}).exec()
        if (!result) throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED);

        return result;
    }
}

export default MemberService;