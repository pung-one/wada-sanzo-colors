import dbConnect from "@/db/connect";
import Favorite from "@/db/models/Favorites";

export default async function handler(request, response) {
  await dbConnect();

  const { user } = request.query;

  if (request.method === "GET") {
    const favorites = await Favorite.findOne({ user: user });
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
