import mongoose from "mongoose";
const {Schema, model}= mongoose

const playerSchema = new Schema({
    nome: String,
    numero: Number,
    ruolo: String
})

const Player = model("Player", playerSchema);

export default Player;