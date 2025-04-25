import clientPromise from "@/db/mongodb";
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

    const favData = await favorites.findOne({
      user: user,
    });

    //revalidatePath("/adminaogwgzsrm");

    return Response.json(favData);
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
        { user: user, "favoriteColors.name": request.colorName },
        {
          $bit: {
            "favoriteColors.$.isFavorite": { xor: 1 },
          },
        }
      );
    } else if (request.type === "favCombinationUpdate") {
      await favorites.updateOne(
        { user: user, "favoriteCombinations.id": request.id },
        {
          $bit: {
            "favoriteCombinations.$.isFavorite": { xor: 1 },
          },
        }
      );
    } else {
      return new Response("Internal Server Error", { status: 500 });
    }

    //revalidatePath("/adminaogwgzsrm");

    return new Response("Favorite status updated.", {
      status: 200,
    });
  } catch (e) {
    console.error(e);
    return new Response("Internal Server Error", { status: 500 });
  }
}
