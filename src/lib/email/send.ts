import  EmailTemplate  from "./template";
import { EmailResponse } from "@/types/emailResponse";
import resend from "./resend";



export async function sendEmail (
    email : string,
    username : string,
    verifyCode : string
) : Promise<EmailResponse> {
    try {
        await resend.emails.send({
          from: "onboarding@resend.dev",
          to: email,
          subject: "Whispr | Verification Code",
          react: EmailTemplate({ username, otp: verifyCode })
        });
        return {success:true, message:"Verification email sent successfully!"}
    } catch (error) {
        console.log("Error sending verification email", error);
        return {success:false, message: "failed to send verification email"};
        
    }
}