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
import { getThreadMessages, getRoomMessages } from "../helpers/GetMessages";
import { OAuth2Service } from "../services/OAuth2Service";
import { ILogger } from "@rocket.chat/apps-engine/definition/accessors";
import { HelloWorld } from "../actions/HelloWorld";
import { HandleMail } from "../actions/HandleMail";
export class MailBridgeCommand implements ISlashCommand {
    public command = "mailbridge";
    public i18nParamsExample = "";
    public i18nDescription = "";
    public providesPreview = false;

    constructor(
        private readonly oauth2Service: OAuth2Service,
        private readonly logger: ILogger
    ) {}

    public async executor(
        context: SlashCommandContext,
        read: IRead,
        modify: IModify,
        http: IHttp
    ): Promise<void> {
        const user = context.getSender();
        const room = context.getRoom();
        const threadId = context.getThreadId();
        const [action, emailAddress] = context.getArguments();

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

        switch (action) {
            case "hello":
                await HelloWorld(room, read, user, modify, http, threadId);
                break;
            case "mail":
                await HandleMail(
                    room,
                    read,
                    user,
                    modify,
                    http,
                    emailAddress,
                    messages,
                    this.oauth2Service,
                    threadId
                );
                break;
        }
    }
}
