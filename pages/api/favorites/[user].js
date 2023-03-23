import dbConnect from "@/db/connect";
import Favorite from "@/db/models/Favorites";

export default async function handler(request, response) {
  const { user } = request.query;
  if (user !== "public") {
    await dbConnect();

    if (request.method === "GET") {
      let favorites = await Favorite.findOne({ user: user });

      if (!favorites) {
        favorites = await Favorite.create({
          user: user,
          favoriteColors: [],
          favoritePalettes: [],
        });
      }

      return response.status(200).json(favorites);
    }

    if (request.method === "PUT") {
      const updateFavorites = await Favorite.replaceOne(
        { user: user },
        request.body
      );
      return response.status(200).json(updateFavorites);
    }
  }
}
