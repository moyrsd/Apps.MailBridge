import { ButtonElement } from "@rocket.chat/ui-kit";

export function CreateButton(
    appId: string,
    buttonName: string,
    buttonText: string
): ButtonElement {
    const button: ButtonElement = {
        type: "button",
        actionId: `${buttonName}_actionId`,
        appId: appId,
        blockId: `${buttonName}_blockId`,
        text: {
            type: "plain_text",
            text: buttonText,
        },
        style: "primary",
        value: `${buttonName}_value`,
    };
    return button;
}
