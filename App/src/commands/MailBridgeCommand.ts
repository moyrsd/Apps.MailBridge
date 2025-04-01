import {
    IHttp,
    IModify,
    IPersistence,
    IRead,
} from "@rocket.chat/apps-engine/definition/accessors";
import {
    ISlashCommand,
    SlashCommandContext,
} from "@rocket.chat/apps-engine/definition/slashcommands";
import { getThreadMessages, getRoomMessages } from "../helpers/GetMessages";
import { OAuth2Service } from "../services/OAuth2Service";
import { ILogger } from "@rocket.chat/apps-engine/definition/accessors";
import { HelloWorld } from "../handlers/HelloWorld";
import { HandleMail } from "../handlers/HandleMail";
import { HandleAuth } from "../handlers/HandleAuth";
import { HandleContact } from "../handlers/HandleContact";
import { App } from "@rocket.chat/apps-engine/definition/App";
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
        http: IHttp,
        persis: IPersistence
    ): Promise<void> {
        const user = context.getSender();
        const room = context.getRoom();
        const triggerId = context.getTriggerId();
        const threadId = context.getThreadId();
        const args = context.getArguments();
        const action = args[0];

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
                const emailAddress = args[1];
                await HandleMail(
                    room,
                    read,
                    user,
                    modify,
                    http,
                    emailAddress,
                    messages,
                    this.oauth2Service,
                    persis,
                    threadId
                );
                break;
            case "auth":
                const authAction = args[1];
                await HandleAuth(
                    room,
                    read,
                    user,
                    modify,
                    http,
                    authAction,
                    this.oauth2Service,
                    persis,
                    threadId
                );
            case "contact":
                await HandleContact(room,read,user,modify,http,triggerId,triggerId);
        }
    }
}
