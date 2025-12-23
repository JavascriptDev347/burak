import ProductModel from "../schema/Product.model";
import {Product, ProductInput, ProductUpdateInput} from "../lib/types/product";
import Errors, {HttpCode, Message} from "../lib/Error";
import {shapeIntoMongooseObjectId} from "../lib/config";

class ProductService {
    private readonly productModel;

    constructor() {
        this.productModel = ProductModel;
    }

    public async getAllProducts(): Promise<Product[]> {
        const result = await this.productModel.find().exec();
        if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
        return result;
    }

    public async createNewProduct(input: ProductInput): Promise<Product> {
        try {
            return await this.productModel.create(input);
        } catch (err) {
            console.error("Error, model:createNewProduct:", err);
            throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
        }

    }

    public async updateChosenProduct(id: string, input: ProductUpdateInput): Promise<Product> {
        // string => object id
        id = shapeIntoMongooseObjectId(id);
        const result = await this.productModel.findOneAndUpdate({_id: id}, input, {new: true}).exec();
        if (!result) throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED);

        console.log("result:", result);
        return result;
    }
}

export default ProductService;