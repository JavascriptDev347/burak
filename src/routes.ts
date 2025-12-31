import express from "express";
import memberController from "./controller/member.controller";
import makeUploader from "./lib/utils/uploader";
import productController from "./controller/product.controller";
import orderController from "./controller/order.controller";

const router = express.Router();
router.get("/member/restaurant", memberController.getRestaurant);
router.post("/member/login", memberController.login);
router.post("/member/signup", memberController.signup);
router.post("/member/logout", memberController.verifyAuth, memberController.logout);
router.get("/member/detail", memberController.verifyAuth, memberController.getMemberDetail)
router.post("/member/update", memberController.verifyAuth, makeUploader("members").single("memberImage"), memberController.updateMember);
router.get("/member/top-users", memberController.getTopUsers);
router.get("/product/all", productController.getProducts);
router.get("/product/:id", memberController.retrieveAuth, productController.getProduct);
router.post("/order/create", memberController.verifyAuth, orderController.createOrder);
router.get("/order/all", memberController.verifyAuth, orderController.getMyOrders);
router.get("/order/:id", (req, res) => {
    res.send("hello world")
})
export default router;