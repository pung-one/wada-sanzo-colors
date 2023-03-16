import mongoose from "mongoose";

const { Schema } = mongoose;

const favoriteSchema = new Schema({
  user: { type: String, required: true },
  favoriteColors: [
    {
      name: { type: String, required: true },
      isFavorite: { type: Boolean, default: false },
    },
  ],
  favoritePalettes: [
    {
      id: { type: Number, required: true },
      isFavorite: { type: Boolean, default: false },
    },
  ],
});

const Favorite =
  mongoose.models.Favorite || mongoose.model("Favorite", favoriteSchema);

export default Favorite;
