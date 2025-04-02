import { PlainText } from "@rocket.chat/ui-kit";

export function CreatePlainTextElement(text: string): PlainText {
    return {
        type: "plain_text",
        text: text,
    };
}
