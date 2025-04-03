import {
    IHttp,
    IModify,
    IPersistence,
    IRead,
} from "@rocket.chat/apps-engine/definition/accessors";
import { IRoom } from "@rocket.chat/apps-engine/definition/rooms";
import { IUser } from "@rocket.chat/apps-engine/definition/users";
import { ContactsContextualBar } from "../ui/contextualbar/ContactsContextualBar";
import { App } from "@rocket.chat/apps-engine/definition/App";

export async function HandleContact(
    app: App,
    room: IRoom,
    read: IRead,
    user: IUser,
    modify: IModify,
    http: IHttp,
    persis: IPersistence,
    triggerId?: string,
    threadId?: string
) {
    await ContactsContextualBar(
        app,
        user,
        read,
        persis,
        modify,
        room,
        triggerId
    );
}
