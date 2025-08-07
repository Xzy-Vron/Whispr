import { z } from "zod";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { usernameValidation } from "@/schemas/signUp";
import { check } from "zod/v4";

const checkValidUsernameSchema = z.object({
  username: usernameValidation,
});

export async function GET(request: Request) {
  await dbConnect();
  try {
    const { searchParams } = new URL(request.url);

    const queryUsername = {
      username: searchParams.get("username"),
    };

    // validate the username with zod
    const parsed = checkValidUsernameSchema.safeParse(queryUsername);

    console.log(parsed);

    if (!parsed.success) {
      const usernameErrors = parsed.error.format().username?._errors || [];
      return Response.json(
        {
          success: false,
          message:
            usernameErrors.length > 0
              ? usernameErrors[usernameErrors.length -1]
              : "Invalid username",
        },
        {
          status: 400,
        }
      );
    }

    const {username} = parsed.data;
    
    const existingUser =await User.findOne({ username, isVerified: true });
    if (existingUser) {
      return Response.json(
        {
          success: false,
          message: "Username already exists",
        },
        {
          status: 400,
        }
      );
    }

    return Response.json(
      {
        success: false,
        message: "Username is valid",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("error checking username", error);

    return Response.json(
      {
        success: false,
        message: "Error checking username",
      },
      {
        status: 500,
      }
    );
  }
}
