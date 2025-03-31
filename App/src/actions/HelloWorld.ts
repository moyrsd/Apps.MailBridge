import { notifyMessage } from "../helpers/NotifyMessage";
import { llmRequest } from "../services/LLMRequest";
import {
    IHttp,
    IModify,
    IRead,
} from "@rocket.chat/apps-engine/definition/accessors";
import { IRoom } from "@rocket.chat/apps-engine/definition/rooms";
import { IUser } from "@rocket.chat/apps-engine/definition/users";

export async function HelloWorld(
    room: IRoom,
    read: IRead,
    user: IUser,
    modify: IModify,
    http: IHttp,
    threadId?: string
) {
    const Prompt = "Hello";
    await notifyMessage(room, read, user, "Constants read", threadId);

    const response = await llmRequest(room, user, read, modify, http, Prompt);
    const message = JSON.stringify(response, null, 2);

    await notifyMessage(room, read, user, message, threadId);
}
