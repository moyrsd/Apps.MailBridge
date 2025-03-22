import { notifyMessage } from "../helpers/notifyMessage";
import {
    IHttp,
    IModify,
    IRead,
} from "@rocket.chat/apps-engine/definition/accessors";
import {
    ISlashCommand,
    SlashCommandContext,
} from "@rocket.chat/apps-engine/definition/slashcommands";
import { llmRequest } from "../helpers/createMail";
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
        const user = context.getSender();
        const room = context.getRoom();
        const threadId = context.getThreadId();
        const [subcommand] = context.getArguments();

        if (!subcommand) {
            throw new Error("Error!");
        }

        if (subcommand == "hello") {
            // LLM hello
            const apiEndpoint =
                "https://api.deepinfra.com/v1/openai/chat/completions";

            const API_KEY = "agfxrb2BuLl0tUQBfGfkY0q3Lw7UtMVe";
            await notifyMessage(room, read, user, "Constants read", threadId);
            const message = JSON.stringify(
                await llmRequest(
                    room,
                    user,
                    read,
                    modify,
                    http,
                    apiEndpoint,
                    API_KEY
                ),
                null,
                2
            );
            await notifyMessage(room, read, user, "Message read", threadId);

            await notifyMessage(room, read, user, message, threadId);
        }
    }
}
