import { InputBlock, PlainTextInputElement } from "@rocket.chat/ui-kit";
import { CreatePlainTextElement } from "../elements/PlainTextElement";

export function CreateInputBlock(
    appId: string,
    labelText: string,
    element: PlainTextInputElement,
    blockId?: string,
    hintText?: string,
    optional?: boolean
): InputBlock {
    return {
        type: "input",
        label: CreatePlainTextElement(labelText),
        appId: appId,
        element: element,
        blockId: blockId,
    };
}
