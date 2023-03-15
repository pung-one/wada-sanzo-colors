import dbConnect from "@/db/connect";
import Favorite from "@/db/models/Favorites";

export default async function handler(request, response) {
  await dbConnect();

  const { name } = request.query;
  console.log(name);

  if (request.method === "PUT") {
    const updateFavorites = Favorite.findOneAndReplace({}, { request: body });
    return response.status(200).json(updateFavorites);
  }
}
