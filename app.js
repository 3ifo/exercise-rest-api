import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import Player from "./models/player.js";
import dotenv from "dotenv"

dotenv.config()
const MONGO_URI= process.env.MONGO_URI

mongoose.connect(MONGO_URI)


const app = express();

app.listen(3000, () => {
  console.log("Il server è attivo sulla porta 3000");
});
app.use(express.json());
app.use(morgan("dev"));

app.get("/players", async(req, res) => {
    try{
    const player = await Player.find();
    res.send(player)
    }catch (error) {
      res.status(500).send(error.message);
    }
});

app.post("/players", async(req, res) => {
  try{
    const newPlayer = req.body;
    const player= await Player.create(newPlayer);
    res.send(player)
  }catch(error){
    res.status(404).send(error.message);
  }
});

app.delete("/players/:id", async(req, res) => {
  const { id } = req.params;
  await Player.findByIdAndDelete(id);
  res.send ("Book deleted successfully")
 
})

