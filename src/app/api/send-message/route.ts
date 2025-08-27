import dbconnect from "@/lib/dbConnect";
import User from "@/models/User";
import { Message } from "@/models/User";

export async function POST(request: Request) {
  await dbconnect();

  const { username, content } = await request.json();

  try {
    const user = await User.findOne({ username });
    if (!user) {
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

    // is user accepting messages?

    if (!user.isAcceptingMessage) {
      return Response.json(
        {
          success: false,
          message: "User is not accepting messages",
        },
        {
          status: 403,
        }
      );
    }

      const newMessage = { content, createdAt: new Date() };
      
      user.messages.push(newMessage as Message);
      user.save();

    return Response.json(
      {
        success: true,
        message: "Message sent successfully!",
      },
      {
        status: 200
      }
    );
  } catch (error) {
    console.log("An unxpected error ocurred", error);

    return Response.json(
      {
        success: false,
        message: "Error while adding messages",
      },
      {
        status: 500,
      }
    );
  }
}
