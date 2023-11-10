import { Request, Response } from "express";
import { Product } from "../../model/produto";

export async function fetchOneProduct(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        if (error instanceof(Error))
        res.status(500).json({ error: error.message });
    }
}