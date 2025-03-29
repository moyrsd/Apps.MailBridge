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
import { notifyMessage } from "../helpers/NotifyMessage";
function createBody(prompt: string) {
    return {
        model: "meta-llama/Llama-3.3-70B-Instruct",
        messages: [
            {
                role: "user",
                content: prompt,
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
    prompt: string,
    apiEndpoint: string,
    apiKey: string,
    threadId?: string
) {
    const response = await http.post(apiEndpoint, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
        },
        data: createBody(prompt),
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
