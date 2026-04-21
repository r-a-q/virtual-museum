import Anthropic from "@anthropic-ai/sdk"

const SYSTEM_PROMPT =
    `You will be given a url for a painting. You will generate alternative text of the image. Follow the best practices: 
    1) Keep it short, usually 1-2 sentences. Don’t overthink it
    2) Consider key elements of why you chose this image, instead of describing every little detail.
    3) No need to say “image of” or “picture of.”
    4) End the alt text sentence with a period.`

const anthropic = new Anthropic({
    apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY,
    dangerouslyAllowBrowser: true,
})

export async function getAltTextFromClaude(base64Data) {

    const msg = await anthropic.messages.create({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages: [
            {
                role: "user",
                content: [
                    {
                        type: "image",
                        source: {
                            type: "base64",
                            media_type: "image/jpeg",
                            data: base64Data
                        }
                    },
                    {
                        type: "text",
                        text: "You will be given a url for a painting. You will generate alternative text of the image. Include the painting style in the description" +
                            "Follow the best practices:" +
                            "1) Keep it short, usually 1-2 sentences. Don’t overthink it" +
                            "2) Consider key elements of why you chose this image, instead of describing every little detail." +
                            "3) No need to say “image of” or “picture of.”" +
                            "4) End the alt text sentence with a period."
                        //improve prompt for more accurate/relevant information for alternative text
                    }
                ]
            }
        ]
    })
    return msg.content[0].text
}
