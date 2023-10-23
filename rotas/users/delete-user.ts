import { Request, Response } from "express";
import { User } from "../../model/usuario";

export async function deleteUser(request: Request, response: Response) {
    const { id } = request.params;
    try {
        const user = await User.findByPk(id);
        if (!user) {
            return response.json({ error: 'User not found' });
        }

        await user.destroy();
        response.status(204).send();
    }
    catch (error) {
        if (error instanceof (Error))
            response.status(500).json({ error: error.message });
    }
}