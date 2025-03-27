import { IHttp, IRead } from "@rocket.chat/apps-engine/definition/accessors";
import { IRoom } from "@rocket.chat/apps-engine/definition/rooms";
import { IUser } from "@rocket.chat/apps-engine/definition/users";
import { notifyMessage } from "./NotifyMessage";
import { IMessageRaw } from "@rocket.chat/apps-engine/definition/messages";

export async function getRoomMessages(
    room: IRoom,
    read: IRead,
    user: IUser,
    http: IHttp
): Promise<string> {
    const messages: IMessageRaw[] = await read
        .getRoomReader()
        .getMessages(room.id, {
            limit: 100,
            sort: { createdAt: "asc" },
        });

    const messageTexts: string[] = [];
    for (const message of messages) {
        if (message.text) {
            messageTexts.push(
                `Message at ${message.createdAt}\n${message.sender.name}: ${message.text}\n`
            );
        }
    }
    return messageTexts.join("\n");
}

export async function getThreadMessages(
    room: IRoom,
    read: IRead,
    user: IUser,
    http: IHttp,
    threadId: string
): Promise<string> {
    const threadReader = read.getThreadReader();
    const thread = await threadReader.getThreadById(threadId);

    if (!thread) {
        await notifyMessage(room, read, user, "Thread not found");
        throw new Error("Thread not found");
    }

    const messageTexts: string[] = [];
    for (const message of thread) {
        if (message.text) {
            messageTexts.push(`${message.sender.name}: ${message.text}`);
        }
    }

    // threadReader repeats the first message once, so here we remove it
    messageTexts.shift();
    return messageTexts.join("\n");
}
