import { streamText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const config = {
  runtime: "edge",
};

export async function POST(req: Request) {
  
  try {
    const { conversationContext } = await req.json();
    console.log(conversationContext);

    const prompt =
      conversationContext && conversationContext.length > 0? 
        `Based on this conversation context, suggest 3 relevant follow-up questions or topics the user might want to explore:
      
        Context: ${conversationContext}

        Generate 3 short, engaging questions (max 20 words each) that would naturally continue the conversation context provided above (The questions should strictly be related to the context).
        These questions are for an anonymous social messaging platform, like Qooh.me and should be suitable for diverse audience. Avoid personal or sensitive topics, focusing instead on universal theme that engages friendly interaction.

        for example your output should be structured like this: 
        What's a hobby you have recently started? ||
        If you could have any superpower, what would it be? ||
        What's a simple thing that makes you happy?
        
        (The pipe character || should be use in between different questions to separate the questions)

        Ensure the questions are intriguing, foster curiosity and contribute to a positive and welcoming conversational environment.`

        : 
        
        `Create a list of three open-ended engaging questions formatted as a single string. Each question should be separated by "||". These questions are for an anonymous social messaging platform, like Qooh.me and should be suitable for diverse audience. Avoid personal or sensitive topics, focusing instead on universal theme that engages friendly interaction. for example your output should be structured like this: 
        What's a hobby you have recently started? ||
        If you could have any superpower, what would it be? ||
        What's a simple thing that makes you happy?

        (The pipe character || should be use in between different questions to separate the questions)
        
        Ensure the questions are intriguing, foster curiosity and contribute to a positive and welcoming conversational environment.`;

    const response = streamText({
      model: google("models/gemini-2.5-flash-lite"), 
      prompt,
      temperature: 1,
      maxOutputTokens: 200,
    });

    if(!response) {
      return Response.json({ error: "Failed to generate suggestions due to an error" }, { status: 500 });
    }
    

    // // Parse the suggestions from the response
    // const suggestions = (await text)
    //   .split("||")
    //   .map((suggestion) => suggestion.trim());


    return response.toUIMessageStreamResponse();

  } catch (error) {
    if (error instanceof Error) {
      
      console.error("Error generating suggestions:", error);

      return Response.json(
        { error: "Failed to generate suggestions due to an error" },
        { status: 500 }
      );

    } else {
      console.error("An unexpected error occurred:", error);
      throw error;
    }
  }
}
