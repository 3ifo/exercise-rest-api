import express from "express";
import fs from "fs";
import path from "path";
import morgan from "morgan";

const readPlayers = (playersName) => {
  const data = fs.readFileSync(
    path.resolve(`./database/${playersName}.json`),
    "utf-8"
  );
  const risorsa = JSON.parse(data);
  return risorsa;
};

const writeRisorsa = (playersName, resource) => {
  const data = JSON.stringify(resource);
  fs.writeFileSync(path.resolve(`./database/${playersName}.json`), data);
};

const app = express();

app.listen(3000, () => {
  console.log("Il server è attivo sulla porta 3000");
});
app.use(express.json());
app.use(morgan("dev"));

app.get("/players", (req, res) => {
  res.sendFile(path.resolve("./database/players.json"));
});

app.post("/players", (req, res) => {
  const newPlayer = req.body;
  const players = readPlayers("players");
  const ids = players.map((p) => p.id);
  for (let i = 0; i <= ids.length; i++) {
    if (!ids.includes(i)) {
      newPlayer.id = i;
      break;
    }
  }
  players.push(newPlayer);
  writeRisorsa("players", players);
  res.send(newPlayer);
});

app.delete("/players/:id", (req, res) => {
  const { id } = req.params;
  const players = readPlayers("players");
  let indexToDelete;
  for (let i = 0; i < players.length; i++) {
    const player = players[i];
    if (player.id === Number(id)) {
      indexToDelete = i;
      break;
    }
    players.splice(indexToDelete, 1);
    writeRisorsa("players", players);
    res.send("Good one");
  }
});
