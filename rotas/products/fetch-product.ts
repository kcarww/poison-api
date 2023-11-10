import { Request, Response } from "express";
import { Product } from "../../model/produto";

export async function fetchAllProducts(req: Request, res: Response) {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        if (error instanceof(Error))
        res.status(500).json({ error: error.message });
    }
}