
const orderController = {};
const Order = require("../models/Order");
const { randomStringGenerator } = require("../utils/randomStringGenerator");
const productController = require("./product.controller");


orderController.creatOrder = async (req, res) => {
    try {
        console.log("order 잘 들어 옴")
        const { userId } = req;
        const { shipTo, contact, totalPrice, orderList } = req.body;
        const insufficientStockItems = await productController.checkItemListStock(orderList);
        if (insufficientStockItems.length > 0) {
            const errorMessage = insufficientStockItems.reduce((total, item) => total += item.message, "");
            throw new Error(errorMessage);
        }
        const newOrder = new Order({
            userId,
            totalPrice,
            shipTo,
            contact,
            items: orderList,
            orderNum: randomStringGenerator(),
        });
        await newOrder.save()
        res.status(200).json({ status: "success",  orderNum: newOrder.orderNum});
    } catch (error) {
        return res.status(400).json({ status: "fail", error: error.message})
    }
}

module.exports = orderController