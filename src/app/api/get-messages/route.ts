import dbconnect from "@/lib/dbConnect";
import User from "@/models/User";
import { getServerSession, User as NextAuthUser } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import mongoose from "mongoose";

export async function GET(req: Request) {
  await dbconnect();

  const session = await getServerSession(authOptions);
  const user: NextAuthUser = session?.user;

  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "User not authenticated",
      },
      {
        status: 401,
      }
    );
  }

  const userId = new mongoose.Types.ObjectId(user._id);
  try {
    const user = await User.aggregate([
      { $match: { _id: userId } },
      { $unwind: "$messages" },
      { $sort: { "messages.createdAt": -1 } },
      { $group: { _id: "$_id", messages: { $push: "$messages" } } },
    ]);

    if (!user || user.length === 0) {
      return Response.json(
        {
          success: true,
          message: "No messages found",
          messages: [],
        },
        { status: 200 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Messages fetched successfully",
        messages: user[0].messages || [],
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("An unxpected error ocurred", error);
    
    return Response.json(
      {
        success: false,
        message: "Error while getting messages",
      },
      {
        status: 500,
      }
    );
  }
}
