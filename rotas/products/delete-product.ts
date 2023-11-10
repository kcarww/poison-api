import { Request, Response } from "express";
import { Product } from "../../model/produto";

export async function deleteProduct(request: Request, response: Response) {
    const { id } = request.params;
    try {
        const product = await Product.findByPk(id);
        if (!product) {
            return response.json({ error: 'Product not found' });
        }

        await product.destroy();
        response.status(204).send();
    }
    catch (error) {
        if (error instanceof (Error))
            response.status(500).json({ error: error.message });
    }
}