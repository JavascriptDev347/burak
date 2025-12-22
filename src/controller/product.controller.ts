import ProductService from "../model/Product.service";
import {T} from "../lib/types/common";
import {Request, Response} from "express";
import Errors from "../lib/Error";

const productService = new ProductService();

const productController: T = {};

productController.getAllProducts = async (req: Request, res: Response) => {
    try {
        console.log("Get all products");
        res.render("products");
    } catch (err) {
        console.log('get all products error', err);
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standart.code).json(Errors.standart)
    }
}

productController.createNewProduct = async (req: Request, res: Response) => {
    try {
        console.log("createNewProduct");
        res.send("DONE!");

    } catch (err) {
        console.log("Error, createNewProduct", err);
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standart.code).json(Errors.standart);
        // res.send(err);
    }
}

productController.updateProduct = async (req: Request, res: Response) => {
    try {
        console.log("updateChosenProduct");
        res.send("Update Product");
    } catch (err) {
        console.log("Error, updateChosenProduct", err);
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standart.code).json(Errors.standart);
        // res.send(err);
    }
}

export default productController;