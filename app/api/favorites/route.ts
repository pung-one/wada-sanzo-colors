import clientPromise from "@/db/mongodb";
import { ObjectId } from "mongodb";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const user = searchParams.get("user");

  if (!user || user === "public") {
    return new Response("User not found", { status: 400 });
  }

  try {
    const client = await clientPromise;
    const database = client.db("colors");
    const favorites = database.collection("favorites");

    let favData = await favorites.findOne({
      user: user,
    });

    if (!favData) {
      const defaultFavData = {
        _id: new ObjectId(),
        user: user,
        favoriteColors: [],
        favoriteCombinations: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await favorites.insertOne(defaultFavData);

      favData = { ...defaultFavData };
    }

    const { createdAt, updatedAt, ...responseData } = favData;

    return Response.json(responseData);
  } catch (e) {
    console.error(e);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function PUT(req: Request) {
  const request = await req.json();

  const user = request.user;

  if (!user || user === "public") {
    return new Response("User not found", { status: 400 });
  }

  try {
    const client = await clientPromise;
    const database = client.db("colors");
    const favorites = database.collection("favorites");

    if (request.type === "favColorUpdate") {
      await favorites.updateOne(
        { user: user },
        {
          $set: {
            favoriteColors: request.favoriteColorsData,
            updatedAt: new Date(),
          },
        },
        { upsert: true }
      );
    } else if (request.type === "favCombinationUpdate") {
      await favorites.updateOne(
        { user: user },
        {
          $set: {
            favoriteCombinations: request.favoriteCombinationsData,
            updatedAt: new Date(),
          },
        },
        { upsert: true }
      );
    } else {
      return new Response("Internal Server Error", { status: 500 });
    }

    return new Response("Favorite status updated.", {
      status: 200,
    });
  } catch (e) {
    console.error(e);
    return new Response("Internal Server Error", { status: 500 });
  }
}
