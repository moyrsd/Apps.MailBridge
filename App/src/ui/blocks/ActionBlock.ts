import {
    ActionsBlock,
    ButtonElement,
    OverflowElement,
} from "@rocket.chat/ui-kit";

export function CreateActionBlock(
    elements: (ButtonElement | OverflowElement)[]
): ActionsBlock {
    return {
        type: "actions",
        elements: elements,
    };
}
