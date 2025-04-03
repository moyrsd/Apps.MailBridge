import {
    IHttp,
    IModify,
    IPersistence,
    IRead,
} from "@rocket.chat/apps-engine/definition/accessors";
import { IRoom } from "@rocket.chat/apps-engine/definition/rooms";
import { IUser } from "@rocket.chat/apps-engine/definition/users";

import { UIKitSurfaceType } from "@rocket.chat/apps-engine/definition/uikit";
import { App } from "@rocket.chat/apps-engine/definition/App";
import { CreateButton } from "../elements/ButtonElement";
import { ActionsBlock } from "@rocket.chat/ui-kit";
import { CreateActionBlock } from "../blocks/ActionBlock";
import { CreateNewContactButtonEnum } from "../../enums/ui/contextualbar/CreateNewContactButtonEnum";
export async function ContactsContextualBar(
    app: App,
    user: IUser,
    read: IRead,
    persistence: IPersistence,
    modify: IModify,
    room: IRoom,
    triggerId?: string
) {
    const blocks: ActionsBlock[] = [];
    const createNewContactButton = CreateButton(
        app.getID(),
        CreateNewContactButtonEnum.BUTTON_NAME,
        CreateNewContactButtonEnum.BUTTON_TEXT,
        CreateNewContactButtonEnum.ACTION_ID,
        CreateNewContactButtonEnum.BLOCK_ID
    );
    const createButtonAction = CreateActionBlock([createNewContactButton]);
    blocks.push(createButtonAction);

    const contextualBar = modify.getUiController().openSurfaceView(
        {
            type: UIKitSurfaceType.CONTEXTUAL_BAR,
            title: { text: "List of contacts", type: "plain_text" },
            blocks: blocks,
        },
        { triggerId: triggerId || "" },
        user
    );
    return contextualBar;
}
