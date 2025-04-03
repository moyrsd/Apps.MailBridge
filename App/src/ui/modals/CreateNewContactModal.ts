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
import { InputBlock, PlainTextInputElement } from "@rocket.chat/ui-kit";
import { CreateInputBlock } from "../blocks/InputBlock";
import { CreatePlainTextElement } from "../elements/PlainTextElement";
import { CreatePlainTextInputElement } from "../elements/PlainTextInput";
import { CreateContacModaltButtonEnum } from "../../enums/ui/modals/CreateContactModalEnum";
export async function CreateNewContactModal(
    app: App,
    user: IUser,
    read: IRead,
    persistence: IPersistence,
    modify: IModify,
    room: IRoom,
    triggerId?: string
) {
    const appId = app.getID();
    const blocks: InputBlock[] = [];
    const ContactNamePlaceholder = CreatePlainTextElement("Enter Contact Name");
    const ContactNameInputElement: PlainTextInputElement =
        CreatePlainTextInputElement(
            appId,
            "create_name_modal_actionId",
            "create_name_modaL_blockId",
            ContactNamePlaceholder,
            false
        );
    const NameInputBlock = CreateInputBlock(
        appId,
        "Name",
        ContactNameInputElement
    );

    const ContactEmailPlaceholder = CreatePlainTextElement(
        "Enter Contact Email Address"
    );
    const ContactEmailInputElement: PlainTextInputElement =
        CreatePlainTextInputElement(
            appId,
            "create_email_modal_actionId",
            "create_email_modaL_blockId",
            ContactEmailPlaceholder,
            false
        );
    const EmailInputBlock = CreateInputBlock(
        appId,
        "Email Address",
        ContactNameInputElement
    );

    blocks.push(NameInputBlock, EmailInputBlock);
    const modalCreateButton = CreateButton(
        app.getID(),
        CreateContacModaltButtonEnum.BUTTON_NAME,
        CreateContacModaltButtonEnum.BUTTON_TEXT,
        CreateContacModaltButtonEnum.ACTION_ID,
        CreateContacModaltButtonEnum.BLOCK_ID
    );

    const modal = modify.getUiController().openSurfaceView(
        {
            type: UIKitSurfaceType.MODAL,
            title: { text: "Create New Contact", type: "plain_text" },
            blocks: blocks,
            close: modalCreateButton,
        },
        { triggerId: triggerId || "" },
        user
    );
    return modal;
}
