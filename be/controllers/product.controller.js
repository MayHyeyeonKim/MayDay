const mongoose = require("mongoose");

const Product = require("../models/Product");

const PAGE_SIZE = 3;
const productController = {};

productController.createProduct = async (req, res) => {
	try {
		const {
			sku,
			name,
			size,
			image,
			category,
			description,
			price,
			stock,
			status,
		} = req.body;
		const product = new Product({
			sku,
			name,
			size,
			image,
			category,
			description,
			price,
			stock,
			status,
		});
		await product.save();
		res.status(200).json({ status: "success", product });
	} catch (error) {
		res.status(400).json({ status: "fail", error: error.message });
	}
};

productController.getProducts = async (req, res) => {
	try {
		const { page, name, category } = req.query;
		const cond = name ? { name: { $regex: name, $options: "i" } } : {};
		if (category) {
            cond.category = category
		}
		let query = Product.find(cond);
		let response = { status: "success" };
		if (page) {
			query.skip((page - 1) * PAGE_SIZE).limit(PAGE_SIZE);
			const totalItemNum = await Product.find(cond).count();
			const totalPageNum = Math.ceil(totalItemNum / PAGE_SIZE);
			response.totalPageNum = totalPageNum;
		}
		const productList = await query.exec();
		response.data = productList;
		res.status(200).json(response);
	} catch (error) {
		res.status(400).json({ status: "fail", error: error.message });
	}
};

productController.deleteProduct = async (req, res) => {
	try {
		const id = req.params.id;
		console.log("Product ID to delete: ", id);
		console.log("1");
		const product = await Product.findByIdAndDelete(
			id,
			{ isDeleted: true },
			{ new: true }
		);
		console.log("product: ", product);
		if (!product) throw new Error("The item does not exist!");
		res.status(200).json({ status: "success", data: product });
	} catch (error) {
		res.status(400).json({ status: "fail", message: error.message });
	}
};

productController.updateProduct = async (req, res) => {
	try {
		const id = req.params.id;
		const {
			sku,
			brand,
			name,
			option,
			image,
			category,
			description,
			price,
			salePrice,
			stock,
			status,
			choice,
			isNew,
			detail,
		} = req.body;

		const product = await Product.findByIdAndUpdate(
			{ _id: id },
			{
				sku,
				brand,
				name,
				option,
				image,
				category,
				description,
				price,
				salePrice,
				stock,
				status,
				choice,
				isNew,
				detail,
			},
			{ new: true }
		);
		if (!product) throw new Error("The item does not exist!");
		res.status(200).json({ status: "success", data: product });
	} catch (error) {
		res.status(400).json({ status: "fail", message: error.message });
	}
};

productController.getProductById = async (req, res) => {
	try {
		const id = req.params.id;
		if (!mongoose.Types.ObjectId.isValid(id)) {
			throw new Error("Invalid ID format");
		}
		const product = await Product.findById(id);
		if (!product) throw new Error("No item found");
		res.status(200).json({ status: "success", data: product });
	} catch (error) {
		return res.status(400).json({ status: "fail", error: error.message });
	}
};

// productController.checkStock = async (item) => {

// 	const product = await Product.findById(item.productId);

// 	if (product.stock[item.size] < item.qty) {
// 		return {
// 			isVarify: false,
// 			message: `The inventory for ${product.name} in ${item.size} is low.`,
// 		};
// 	}


// 	const newStock = { ...product.stock };
// 	newStock[item.size] -= item.qty;
// 	product.stock = newStock;
// 	await product.save();
// 	return { isVerify: true };
// };

productController.checkStock = async (item) => {
    const product = await Product.findById(item.productId);
    if (!product) {
        return {
            isVerify: false,
            message: `Product not found for ID: ${item.productId}`,
        };
    }
    if (product.stock[item.size] < item.qty) {
        return {
            isVerify: false,
            message: `The inventory for ${product.name} in ${item.size} is low.`,
        };
    }
    return { isVerify: true, product };
};

productController.processStock = async (item) => {
    const product = await Product.findById(item.productId);
    const newStock = { ...product.stock };
    newStock[item.size] -= item.qty;
    product.stock = newStock;
    await product.save();
};

productController.checkItemListStock = async (itemList) => {
    const insufficientStockItems = [];
    const validItems = [];

    await Promise.all(
        itemList.map(async (item) => {
            const stockCheck = await productController.checkStock(item);
            if (!stockCheck.isVerify) {
                insufficientStockItems.push({ item, message: stockCheck.message });
            } else {
                validItems.push(item);
            }
        })
    );

    if (insufficientStockItems.length === 0) {
        await Promise.all(
            validItems.map(async (item) => {
                await productController.processStock(item);
            })
        );
    }

    return insufficientStockItems;
};

// productController.checkItemListStock = async (itemList) => {
// 	const insufficientStockItems = [];
// 	await Promise.all(
// 		itemList.map(async (item) => {
// 			const stockCheck = await productController.checkStock(item);
// 			if (!stockCheck.isVerify) {
// 				insufficientStockItems.push({ item, message: stockCheck.message });
// 			}
// 			return stockCheck;
// 		})
// 	);
// 	return insufficientStockItems;
// };

module.exports = productController;
