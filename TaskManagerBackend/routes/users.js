import express from 'express';
import { connectToDatabase } from "../db.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const db = await connectToDatabase();
    const users = db.collection("users");

    if (!username || !password) {
      return res.status(400).json({ error: 'Username i password su obavezni' });
    }

    const postojeciUser = await users.findOne({ username });
    if (postojeciUser) {
      return res.status(400).json({ error: 'Korisnik vec postoji' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const noviUser = {
      username,
      password: hashedPassword
    };

    const result = await users.insertOne(noviUser);

    res.status(201).json({ 
        message: 'Uspjesno registriran',
        userId: result.insertedId
    });
  } catch (error) {
    console.error('Greska u registraciji', error);
    res.status(500).json({ error: 'Greska u registraciji' });
  }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const db = await connectToDatabase();
        const users = db.collection("users");

        if (!username || !password) {
            return res.status(400).json({ error: 'Username i password su obavezni' });
        }

        const user = await users.findOne({ username });
        if (!user) {
            return res.status(400).json({ error: 'Neispravno korisnicko ime ili lozinka' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Neispravno korisnicko ime ili lozinka' });
        }

        const token = jwt.sign({ userId: user._id, username: user.username }, JWT_SECRET, { expiresIn: '24h' });

        res.status(200).json({ 
            message: 'Prijava uspjesna',
            token
        });
    } catch (error) {
        console.error('Greska u prijavi', error);
        res.status(500).json({ error: 'Greska u prijavi' });
    }
})

export default router;