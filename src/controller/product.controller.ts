import ProductService from "../model/Product.service";
import {T} from "../lib/types/common";
import {Request, Response} from "express";
import Errors, {HttpCode, Message} from "../lib/Error";
import {AdminRequest, ExtendedRequest} from "../lib/types/member";
import {ProductInput, ProductInquiry} from "../lib/types/product";
import {ProductCollection} from "../lib/enums/product.enum";

const productService = new ProductService();

const productController: T = {};

productController.getProducts = async (req: Request, res: Response) => {
    try {
        console.log("getProducts");

        const {page, limit, order, productCollection, search} = req.query;

        const inquiry: ProductInquiry = {
            order: String(order),
            page: Number(page),
            limit: Number(limit),
        };

        if (productCollection)
            inquiry.productCollection = productCollection as ProductCollection;

        if (search) inquiry.search = String(search);

        const result = await productService.getProducts(inquiry);

        res.status(HttpCode.OK).json(result);
    } catch (err) {
        console.log("Error, getProducts", err);
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standart.code).json(Errors.standart);
        // res.send(err);
    }
};

productController.getAllProducts = async (req: Request, res: Response) => {
    try {
        console.log("Get all products");
        const data = await productService.getAllProducts();
        res.render("products", {products: data});
    } catch (err) {
        console.log('get all products error', err);
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standart.code).json(Errors.standart)
    }
}

productController.createNewProduct = async (req: AdminRequest, res: Response) => {
    try {

        if (!req?.files?.length) throw new Errors(HttpCode.INTERNAL_SERVER_ERROR, Message.CREATE_FAILED);
        const data: ProductInput = req.body;
        data.productImages = req.files.map(file => {
            return file.path;
        })

        await productService.createNewProduct(data);

        res.send(`<script> alert("Successful creation"); window.location.replace("/admin/product/all") </script>`);

    } catch (err) {
        console.log("Error, createNewProduct", err);
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standart.code).json(Errors.standart);
    }
}

productController.updateProduct = async (req: Request, res: Response) => {
    try {
        console.log("updateChosenProduct");
        const id = req.params.id;

        const result = await productService.updateChosenProduct(id, req.body);

        res.status(HttpCode.OK).json({data: result});
    } catch (err) {
        console.log("Error, updateChosenProduct", err);
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standart.code).json(Errors.standart);
        // res.send(err);
    }
}

productController.getProduct = async (req: ExtendedRequest, res: Response) => {
    try {
        console.log("getProduct");
        const {id} = req.params;

        const memberId = req.member?._id ?? null;
        const result = await productService.getProduct(memberId, id);
        res.status(HttpCode.OK).json(result);
    } catch (err) {
        console.log("Error, getProduct", err);
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standart.code).json(Errors.standart);
        // res.send(err);
    }
};
export default productController;