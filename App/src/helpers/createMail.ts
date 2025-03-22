import {
    IHttp,
    IModify,
    IRead,
} from "@rocket.chat/apps-engine/definition/accessors";
import { IRoom } from "@rocket.chat/apps-engine/definition/rooms";
import { IUser } from "@rocket.chat/apps-engine/definition/users";
import {
    ISlashCommand,
    SlashCommandContext,
} from "@rocket.chat/apps-engine/definition/slashcommands";
import { notifyMessage } from "./notifyMessage";
function createBody() {
    return {
        model: "meta-llama/Llama-3.2-11B-Vision-Instruct",
        messages: [
            {
                role: "user",
                content: "Hello!",
            },
        ],
    };
}

export async function llmRequest(
    room: IRoom,
    user: IUser,
    read: IRead,
    modify: IModify,
    http: IHttp,
    apiEndpoint: string,
    apiKey: string,
    threadId?: string
) {
    const response = await http.post(apiEndpoint, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
        },
        data: createBody(),
    });

    if (response.statusCode !== 200) {
        await notifyMessage(
            room,
            read,
            user,
            `API error: ${response.statusCode}`,
            threadId
        );
    }

    return response.data.choices[0].message.content;
}
