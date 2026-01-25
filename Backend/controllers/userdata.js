import Product from "../schema/Product.js";
 export const userData = async (req, res) => {
    try {
        const products = await Product.find({ email: req.user.email });
        res.status(200).json(products);
    } 
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

