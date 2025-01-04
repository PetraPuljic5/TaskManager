import express from "express";
import cors from "cors";

const PORT = 8000;

const app = express();
app.use(cors());
app.use(express.json());

let tasks = [
  { id: 1, naslov: "Kupiti kruh", opis: "Idi kupiti kruh danas", zavrsen: false },
  { id: 2, naslov: "Naučiti Vue.js", opis: "Prouči malo Vue.js dokumentaciju", zavrsen: false },
  { id: 3, naslov: "Riješi zadaću iz UPP-a", opis: "Natjeraj se riješiti zadaću!", zavrsen: false },
];

app.get("/tasks", (req, res) => {
  console.log("GET /tasks pozvan");
  res.json(tasks);
});

app.get("/", (req, res) => {
  res.send("TaskManagerBackend");
});

app.listen(PORT, () => {
  console.log(`Poslužitelj sluša na http://localhost:${PORT}`);
});
