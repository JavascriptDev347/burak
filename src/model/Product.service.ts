import ProductModel from "../schema/Product.model";
import {Product, ProductInput} from "../lib/types/product";
import Errors, {HttpCode, Message} from "../lib/Error";

class ProductService {
    private readonly productModel;

    constructor() {
        this.productModel = ProductModel;
    }

    public async createNewProduct(input: ProductInput): Promise<Product> {
        try {
            return await this.productModel.create(input);
        } catch (err) {
            console.error("Error, model:createNewProduct:", err);
            throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
        }

    }
}

export default ProductService;