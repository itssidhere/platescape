import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface CustomRequest extends Request {
    user?: any;
}

const authMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            res.status(401).json({ message: "You are not authorized" });
        }

        const decodedToken = jwt.verify(token!, process.env.JWT_SECRET!);

        req.user = decodedToken;

        next();
    } catch (err) {
        res.status(500).json({ message: 'An error occured' });
    }
}

export default authMiddleware;