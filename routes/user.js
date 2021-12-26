const express = require("express")
const router = express.Router();

const ctrProduct = require('../controller/Product')

//Various EndPoint to Create , Retrive, Update and Delete Products and Category From Database
router.post("/create", ctrProduct.CreatProduct)
router.get("/readAll", ctrProduct.ReadAllProuct);

router.get("/read", ctrProduct.GetSpecificProduct)

router.patch("/update", ctrProduct.updateProduct)

router.delete("/delete", ctrProduct.deleteProduct);

//Export router
module.exports = router
