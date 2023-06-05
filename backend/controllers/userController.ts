import { Request, Response } from "express";
import pool from "../backend";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
    try {

        const { name, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const query = `INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`;

        const values = [name, email, hashedPassword];

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

        const { email, password } = req.body;

        // Check if the user exists in the database
        const query = `SELECT * FROM users WHERE email = $1`;
        const result = await pool.query(query, [email]);
        const user = result.rows[0];

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Compare the provided password with the hashed password in the database

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate and sign a JWT token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });

        res.status(200).json({ user, token });
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
