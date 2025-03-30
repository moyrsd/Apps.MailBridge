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
    }

    return response.data.choices[0].message.content;
}
