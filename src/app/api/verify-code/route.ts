import { z } from "zod";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { usernameValidation } from "@/schemas/signUp";
import { check } from "zod/v4";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const {username, code} = await request.json();

    const user = await User.findOne({username});

    if (!user) {
      return Response.json({
        success: false,
        message: "User not found",
      },{
        status: 500
      })
    }
    
    const isCodeValid = user.verifyCode === code;
    const isCodeNotExpired = new Date(user.verifyCodeExpire) > new Date();

    if(isCodeValid && isCodeNotExpired) {
      user.isVerified = true;
      await user.save();
      return Response.json({
        success: true,
        message: "Code verified successfully",
      },{
        status: 200
      });
    } else if (!isCodeNotExpired) {
      return Response.json({
        success: false,
        message: "Code expired. Please signup again to get a new code",
      },{
        status: 400
      });
    } else {
      return Response.json({
        success: false,
        message: "Invalid code",
      },{
        status: 400
      });
    }

  } catch (error) {
    console.error("error verifying code", error);

    return Response.json(
      {
        success: false,
        message: "Error verifying code",
      },
      {
        status: 500,
      }
    );
  } 
}