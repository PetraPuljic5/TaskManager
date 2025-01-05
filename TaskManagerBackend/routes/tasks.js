import express from "express";
import { connectToDatabase } from "../db.js";

const router = express.Router();

let tasks = [
    { id: 1, naslov: "Kupiti kruh", opis: "Idi kupiti kruh danas", zavrsen: false },
    { id: 2, naslov: "Naučiti Vue.js", opis: "Prouči malo Vue.js dokumentaciju", zavrsen: false },
    { id: 3, naslov: "Riješi zadaću iz UPP-a", opis: "Natjeraj se riješiti zadaću!", zavrsen: false },
];

router.get("/", async (req, res) => {
    try {
      const db = await connectToDatabase();
      const collection = db.collection("tasks");
      const tasks = await collection.find({}).toArray();
      res.json(tasks);
    } catch (error) {
      console.error("Greska u dohvacanju", error);
      res.status(500).send("Greska u dphvacanju.");
    }
});

router.post("/", async (req, res) => {
    try {
      const db = await connectToDatabase();
      const collection = db.collection("tasks");
  
      const tasks = req.body;
  
      if (!Array.isArray(tasks)) {
        return res.status(400).json({ error: "Nije polje." });
      }
      for (const task of tasks) {
        if (!task.naslov || !task.opis || typeof task.zavrsen !== "boolean" || !Array.isArray(task.tags)) {
          return res
            .status(400)
            .json({ error: "Nedostaju podaci" });
        }
      }
  
      await collection.insertMany(tasks);
      res.status(201).json({ message: "Zadaci uspjesno dodani" });
    } catch (error) {
      console.error("Greska u dodavanju", error);
      res.status(500).send("Greska u dodavanju.");
    }
  });
  
export default router;