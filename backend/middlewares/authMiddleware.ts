import { NextFunction, Request, Response } from "express";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const isAuth = true;
        if (isAuth) {
            next();
        }
        else {
            res.status(401).json({ message: "You are not authorized" });
        }
    } catch (err) {
        res.status(500).json({ message: 'An error occured' });
    }
}

export default authMiddleware;