import dbconnect from "@/lib/dbConnect";
import { sendEmail } from "@/lib/email/send";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  await dbconnect();

  try {
    const body = await request.json();
    const { username, password, email } = body;

    const existingVerifiedUserByUsername = await User.findOne({
      username,
      isVerified: true,
    });

    if (existingVerifiedUserByUsername) {
      return Response.json(
        {
          success: false,
          message: "User already exists",
        },
        {
          status: 400,
        }
      );
    }

    const existingUserByEmail = await User.findOne({ email });
    const randomSixDigitCode = Math.floor(
      100000 + Math.random() * 899999
    ).toString();

    if (existingUserByEmail) {
      if (existingUserByEmail.isVerified) {
        return Response.json(
          {
            success: false,
            message: "User already exists",
          },
          {
            status: 400,
          }
        );
      } else {
        const hashedPassword = await bcrypt.hash(password, 12);
        existingUserByEmail.password = hashedPassword;
        existingUserByEmail.verifyCode = randomSixDigitCode;
        existingUserByEmail.verifyCodeExpire = new Date(
          Date.now() + 60 * 60 * 1000
        );
        await existingUserByEmail.save();
      }
    } else {
      const hashedPassword = await bcrypt.hash(password, 12);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);

      const newUser = await new User({
        username,
        password: hashedPassword,
        email,
        verifyCode: randomSixDigitCode,
        verifyCodeExpire: expiryDate,
        isVerified: false,
        isAcceptingMessage: true,
        messages: [],
      });
      newUser.save();
    }
    // Sending Verification Email

    const emailResponse = await sendEmail(email, username, randomSixDigitCode);

    if (!emailResponse.success) {
      return Response.json(
        {
          success: false,
          message: emailResponse.message,
        },
        {
          status: 500,
        }
      );
    }

    return Response.json(
      {
        success: true,
        message: "User signed up successfully. Please verify your email.",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("Error signing up user", error);
    return Response.json(
      {
        success: false,
        message: "failed to sign up user",
      },
      { status: 500 }
    );
  }
}
