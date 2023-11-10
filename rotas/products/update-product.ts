import { Request, Response } from "express";
import { Product } from "../../model/produto";
export async function updateProduct(req: Request, res: Response) {
    const {id} = req.params;
    try {
        const product = await Product.findByPk(id);
        if (!product) {
            return res.json({error: 'product not found'});
        }

        const updatedProduct = await product.update(req.body);
        res.json(updatedProduct);
    }
    catch (error) {
        if (error instanceof(Error))
        res.status(500).json({ error: error.message });
    }
}