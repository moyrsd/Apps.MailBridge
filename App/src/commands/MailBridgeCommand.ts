import { notifyMessage } from "../helpers/NotifyMessage";
import {
    IHttp,
    IModify,
    IRead,
} from "@rocket.chat/apps-engine/definition/accessors";
import {
    ISlashCommand,
    SlashCommandContext,
} from "@rocket.chat/apps-engine/definition/slashcommands";
import { llmRequest } from "../helpers/CreateMail";
import { getThreadMessages, getRoomMessages } from "../helpers/GetMessages";
import { createEmailPrompt } from "../constants/Prompts";

export class MailBridgeCommand implements ISlashCommand {
    public command = "mailbridge";
    public i18nParamsExample = "";
    public i18nDescription = "";
    public providesPreview = false;

    public async executor(
        context: SlashCommandContext,
        read: IRead,
        modify: IModify,
        http: IHttp
    ): Promise<void> {
        const apiEndpoint =
            "https://api.deepinfra.com/v1/openai/chat/completions";

        const API_KEY = "4ZdqVwe3NCwBXAjuQEEe5te5rluXx5Ko";
        const user = context.getSender();
        const room = context.getRoom();
        const threadId = context.getThreadId();
        const [subcommand] = context.getArguments();

        let messages: string;
        if (!threadId) {
            messages = await getRoomMessages(room, read, user, http);
        } else {
            messages = await getThreadMessages(
                room,
                read,
                user,
                http,
                threadId
            );
        }

        if (!subcommand) {
            throw new Error("Error!");
        }
        switch (subcommand) {
            case "hello":
                // LLM hello
                const prompt1 = "Hello";
                await notifyMessage(
                    room,
                    read,
                    user,
                    "Constants read",
                    threadId
                );
                const message = JSON.stringify(
                    await llmRequest(
                        room,
                        user,
                        read,
                        modify,
                        http,
                        prompt1,
                        apiEndpoint,
                        API_KEY
                    ),
                    null,
                    2
                );
                await notifyMessage(room, read, user, "Message read", threadId);

                await notifyMessage(room, read, user, message, threadId);
                break;
            case "mail":
                const prompt2 = createEmailPrompt(messages);
                await notifyMessage(
                    room,
                    read,
                    user,
                    "Constants read",
                    threadId
                );
                const mailSummary = JSON.stringify(
                    await llmRequest(
                        room,
                        user,
                        read,
                        modify,
                        http,
                        prompt2,
                        apiEndpoint,
                        API_KEY
                    ),
                    null,
                    2
                );
                await notifyMessage(room, read, user, "Message read", threadId);

                await notifyMessage(room, read, user, mailSummary, threadId);
                break;
        }
    }
}
