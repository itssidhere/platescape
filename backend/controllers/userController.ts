import { Request, Response } from "express";
import pool from "../backend";

export const register = async (req: Request, res: Response) => {
    try {

        const query = `INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`;

        const values = [req.body.name, req.body.email, req.body.password];

        const { rows } = await pool.query(query, values);

        const newUser = rows[0];

        res.status(201).json(newUser);

    }
    catch (err) {
        res.status(500).json({ message: err });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        res.status(200).json({ message: "User logged in sucessfully" });
    }
    catch (err) {
        res.status(500).json({ message: 'An error occured' });
    }
};

export const updateProfile = async (req: Request, res: Response) => {
    try {
        res.status(200).json({ message: "Profle updated successfully" });
    }
    catch (err) {
        res.status(500).json({ message: 'An error occured' });
    }
}
