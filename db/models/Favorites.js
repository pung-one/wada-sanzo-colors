import mongoose from "mongoose";

const { Schema } = mongoose;

const favoriteSchema = new Schema({
  user: { type: String, required: true },
  favoriteColors: { type: Array, required: true },
  favoritePalettes: { type: Array, required: true },
});

const Favorite =
  mongoose.models.Favorite || mongoose.model("Favorite", favoriteSchema);

export default Favorite;
