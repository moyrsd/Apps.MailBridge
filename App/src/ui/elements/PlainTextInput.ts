import { PlainText, PlainTextInputElement } from "@rocket.chat/ui-kit";

export function CreatePlainTextInputElement(
    appId: string,
    actionId: string,
    blockId: string,
    placeholder: PlainText,
    multiline: boolean
): PlainTextInputElement {
    return {
        type: "plain_text_input",
        appId: appId,
        actionId: actionId,
        blockId: blockId,
        placeholder: placeholder,
        multiline: multiline,
    };
}
