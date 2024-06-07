const Product = require("../models/Product");

const PAGE_SIZE = 3
const productController = {}

productController.createProduct=async(req,res) => {
    try{
        const { sku, name, size, image, category, description, price, stock, status } = req.body;
        const product = new Product( { sku, name, size, image, category, description, price, stock, status });
        await product.save();
        res.status(200).json({status:"success", product})
    }catch(error){
        res.status(400).json({status:"fail", error:error.message})
    }
};

productController.getProducts=async(req,res)=>{
    try{
        const {page, name} = req.query
        const cond = name?{name:{$regex:name, $options:'i'}}:{};
        let query = Product.find(cond);
        let response = { status: "success" };
        if (page) {
            query.skip((page - 1) * PAGE_SIZE).limit(PAGE_SIZE); //mongoose function
            //최종 몇개 페이지
            // 데이터가 총 몇개 있는지
            // const totalItemNum = await product.find(cond).count();
            const totalItemNum = await Product.find(cond).count();
            // 데이터 총 개수 /PAGE_SIZE
            // console.log("백", page, name)
            const totalPageNum = Math.ceil(totalItemNum / PAGE_SIZE);
            response.totalPageNum = totalPageNum
        }
        const productList = await query.exec()
        response.data = productList
        res.status(200).json(response);
    }catch(error){
        res.status(400).json({status:"fail", error:error.message})
    }
};

// productController.deleteProduct = async(req,res)=>{
//     try{
//         const id = req.params.id;
//         console.log("Product ID to delete: ", id);
//         console.log("1")
//         const product = await Product.findByIdAndDelete(
//             id,
//             {isDeleted: true},
//             { new: true } // This option returns the updated document
//         );
//         console.log("product: ", product)
//         if(!product) throw new Error("The item does not exist!");
//         res.status(200).json({status:"success", data:product});
//     }catch(error){
//         res.status(400).json({status:"fail", message:error.message})
//     }
// };
productController.deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findByIdAndUpdate(
        { _id: productId },
        { isDeleted: true }
        );
        if (!product) throw new Error("No item found");
        res.status(200).json({ status: "success" });
    } catch (error) {
        return res.status(400).json({ status: "fail", error: error.message });
    }
    };

productController.updateProduct = async(req,res)=>{
try{
    const id = req.params.id;
    const { sku, brand, name, option, image, category, description, price, salePrice, stock, status, choice, isNew, detail } = req.body;

    const product = await Product.findByIdAndUpdate(
        {_id:id},
        { sku, brand, name, option, image, category, description, price, salePrice, stock, status, choice, isNew, detail },
        {new:true}
    );
    if (!product) throw new Error("The item does not exist!");
    res.status(200).json({status:"success", data:product})
}catch(error){
    res.status(400).json({status:"fail", message:error.message})
}
};

module.exports = productController;