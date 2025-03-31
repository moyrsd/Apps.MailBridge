import {
    IHttp,
    IModify,
    IRead,
} from "@rocket.chat/apps-engine/definition/accessors";
import { IRoom } from "@rocket.chat/apps-engine/definition/rooms";
import { IUser } from "@rocket.chat/apps-engine/definition/users";

import { notifyMessage } from "../helpers/NotifyMessage";
import { AppSettingsEnum } from "../settings/settings";

function createBody(model: string, prompt: string) {
    return {
        model: model,
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
    threadId?: string
) {
    const model = await read
        .getEnvironmentReader()
        .getSettings()
        .getValueById(AppSettingsEnum.LlmModelId);
    const apiEndpoint = await read
        .getEnvironmentReader()
        .getSettings()
        .getValueById(AppSettingsEnum.LlmProviderId);
    const apiKey = await read
        .getEnvironmentReader()
        .getSettings()
        .getValueById(AppSettingsEnum.LlmApiKeyId);

    if (!model || !apiEndpoint || !apiKey) {
        await notifyMessage(
            room,
            read,
            user,
            "Missing LLM configuration settings.",
            threadId
        );
        throw new Error("Missing LLM configuration settings.");
    }

    const response = await http.post(apiEndpoint, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
        },
        data: createBody(model, prompt),
    });

    if (response.statusCode !== 200) {
        await notifyMessage(
            room,
            read,
            user,
            `API error: ${response.statusCode}`,
            threadId
        );
        throw new Error(`API error: ${response.statusCode}`);
    }

    return response.data.choices[0].message.content;
}
