import { ButtonElement } from "@rocket.chat/ui-kit";

export function CreateButton(
    appId: string,
    buttonName: string,
    buttonText: string,
    actionId: string,
    blockId: string,
    value?: string
): ButtonElement {
    const button: ButtonElement = {
        type: "button",
        actionId: actionId,
        appId: appId,
        blockId: blockId,
        text: {
            type: "plain_text",
            text: buttonText,
        },
        style: "primary",
        value: value,
    };
    return button;
}
