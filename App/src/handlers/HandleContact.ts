import { notifyMessage } from "../helpers/NotifyMessage";
import { llmRequest } from "../services/LLMRequest";
import {
    IHttp,
    IModify,
    IRead,
} from "@rocket.chat/apps-engine/definition/accessors";
import { IRoom } from "@rocket.chat/apps-engine/definition/rooms";
import { IUser } from "@rocket.chat/apps-engine/definition/users";

import { UIKitSurfaceType } from "@rocket.chat/apps-engine/definition/uikit";

export async function HandleContact(
    room: IRoom,
    read: IRead,
    user: IUser,
    modify: IModify,
    http: IHttp,
    triggerId?: string,
    threadId?: string
) {
    modify.getUiController().openSurfaceView(
        {
            type: UIKitSurfaceType.CONTEXTUAL_BAR,
            title: { text: "Contacts", type: "plain_text" },
            blocks: [
                {
                    type: "section",
                    blockId: "section_1",
                    text: {
                        type: "plain_text",
                        text: "lorem ipsum 🚀",
                        emoji: true,
                    },
                },
            ],
        },
        { triggerId: triggerId || "" },
        user
    );
}
