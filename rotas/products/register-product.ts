import { Request, Response } from "express";
import { Product } from "../../model/produto";


export async function registerProduct(req: Request, res: Response) {
    try {
        const {nome, categoria, preco} = req.body;
        const product = await Product.create({nome, categoria, preco});
        res.json(product);
    } catch (error) {
        if (error instanceof(Error))
        res.status(500).json({ error: error.message });
    }
}