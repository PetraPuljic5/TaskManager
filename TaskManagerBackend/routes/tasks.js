import express from "express";

const router = express.Router();

let tasks = [
    { id: 1, naslov: "Kupiti kruh", opis: "Idi kupiti kruh danas", zavrsen: false },
    { id: 2, naslov: "Naučiti Vue.js", opis: "Prouči malo Vue.js dokumentaciju", zavrsen: false },
    { id: 3, naslov: "Riješi zadaću iz UPP-a", opis: "Natjeraj se riješiti zadaću!", zavrsen: false },
];

router.get("/", (req, res) => {
    res.json(tasks);
  });
  
export default router;