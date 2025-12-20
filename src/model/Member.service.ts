// Modellar controller lar bilan to'gridan to'gri ishlaydi ekan
// Modellar database bilan schema modellar orqali bog'lanadi va amallar bajaradi ekan.
import MemberModel from "../schema/Member.model";
import {Member, MemberInput} from "../lib/types/member";
import {MemberType} from "../lib/enums/member.enum";
import Errors, {HttpCode, Message} from "../lib/Error";


class MemberService {
    private readonly memberModel;

    constructor() {
        this.memberModel = MemberModel; // qachongi yangi new MemberService qilganimda constructor ishga tushadi
    }

    public async processSignup(input: MemberInput): Promise<Member> {
        const exist = await this.memberModel.findOne({
            memberType: MemberType.RESTAURANT,
        }).exec();

        if (exist) {
            throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED)
        }

        try {
            const result = await this.memberModel.create(input);
            result.memberPassword = "";
            return result.toObject() as Member;
        } catch (err) {
            throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED)
        }
    }
}

export default MemberService;