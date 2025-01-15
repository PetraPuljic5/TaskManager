import express from 'express';
import { connectToDatabase } from "../db.js";
import bcrypt from 'bcryptjs';

const router = express.Router();

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

    await users.insertOne(noviUser);
    res.status(201).json({ message: 'KUspjesno registriran' });
  } catch (error) {
    console.error('Greska u registraciji', error);
    res.status(500).json({ error: 'Greska u registraciji' });
  }
});

export default router;