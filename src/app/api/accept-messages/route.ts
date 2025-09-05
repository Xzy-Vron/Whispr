import dbconnect from "@/lib/dbConnect";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { User as NextAuthUser } from "next-auth";

export async function POST(req: Request) {
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

  const userId = user._id;
  const { acceptMessages } = await req.json();

  try {
    const foundUser = await User.findOne({ _id: userId });
    if (!foundUser) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        {
          status: 404,
        }
      );
    }

    if (foundUser.isAcceptingMessage === acceptMessages) {
      return Response.json(
        {
          success: true,
          message: "User status is already updated",
        },
        {
          status: 200,
        }
      );
    }
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { isAcceptingMessage: acceptMessages },
      { new: true }
    );

    if (!updatedUser) {
      return Response.json(
        {
          success: false,
          message: "failed to update user status to accepting messages",
          updatedUser,
        },
        {
          status: 401,
        }
      );
    }

    return Response.json(
      {
        success: true,
        message: "User status updated successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("Error updating user status", error);

    return Response.json(
      {
        success: false,
        message: "Error updating user status",
      },
      {
        status: 500,
      }
    );
  }
}

export async function GET() {
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

  const userId = user._id;

  try {
    const foundUser = await User.findOne({ _id: userId });

    if (!foundUser) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: true,
        isAcceptingMessage: foundUser.isAcceptingMessage,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in getting message acceptance status", error);

    return Response.json(
      {
        success: false,
        message: "Error in getting message acceptance status",
      },
      {
        status: 500,
      }
    );
  }
}
