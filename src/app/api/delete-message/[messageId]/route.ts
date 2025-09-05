import dbconnect from "@/lib/dbConnect";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { User as NextAuthUser } from "next-auth";
import mongoose from "mongoose";

export async function DELETE(
  request: Request,
  {params} : { params: { messageId: string } }
): Promise<Response> {
  await dbconnect();

  const { messageId } = params;
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

  try {
    const updateResult = await User.updateOne(
      { _id: user._id },
      {
        $pull: {
          messages: {
            _id: new mongoose.Types.ObjectId(messageId),
          },
        },
      }
    );

    if (!updateResult.modifiedCount) {
      return Response.json(
        {
          success: false,
          message: "Message not found or already deleted",
        },
        {
          status: 404,
        }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Message deleted successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("eror in delete message route", error);
    return Response.json(
      {
        success: false,
        message: "Error deleting message",
      },
      {
        status: 500,
      }
    );
  }
}
