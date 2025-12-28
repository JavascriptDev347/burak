import ViewModel from "../schema/View.model";
import {View, ViewInput} from "../lib/types/view";
import Errors, {HttpCode, Message} from "../lib/Error";

class ViewService {
    private readonly viewModel;

    constructor() {
        // This is schema model
        this.viewModel = ViewModel;
    }

    public async checkViewExistence(input: ViewInput): Promise<any> {
        return await this.viewModel
            .findOne({memberId: input.memberId, viewRefId: input.viewRefId})
            .exec();
    }

    public async insertMemberView(input: ViewInput): Promise<View> {
        try {
            return await this.viewModel.create(input);
        } catch (err) {
            console.error("Error, model:insertMemberView:", err);
            throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
        }
    }
}

export default ViewService;
