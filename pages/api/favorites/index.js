import dbConnect from "@/db/connect";
import Favorite from "@/db/models/Favorites";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const favorites = await Favorite.findOne();
    return response.status(200).json(favorites);
  }

  if (request.method === "PUT") {
    const updateFavorites = await Favorite.replaceOne(
      { user: "admin" },
      request.body
    );
    return response.status(200).json(updateFavorites);
  }
}
