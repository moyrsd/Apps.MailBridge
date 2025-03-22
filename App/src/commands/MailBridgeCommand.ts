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

        switch (subcommand) {
            case "hello":
                const message: string = "Hellow There!";
                await notifyMessage(room, read, user, message, threadId);
                break;
        }
    }
}
