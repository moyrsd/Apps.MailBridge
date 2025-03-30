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
import { llmRequest } from "../services/LLMRequest";
import { getThreadMessages, getRoomMessages } from "../helpers/GetMessages";
import { createEmailPrompt } from "../constants/prompts/EmailSummaryPrompt";
import { OAuth2Service } from "../services/OAuth2Service";
import { ILogger } from "@rocket.chat/apps-engine/definition/accessors";
import { sendMail } from "../services/SendMail";
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
                const prompt1 = "Hello";
                await notifyMessage(
                    room,
                    read,
                    user,
                    "Constants read",
                    threadId
                );
                const message = JSON.stringify(
                    await llmRequest(room, user, read, modify, http, prompt1),
                    null,
                    2
                );
                await notifyMessage(room, read, user, message, threadId);

                break;
            case "mail":
                if (!emailAddress) {
                    await notifyMessage(
                        room,
                        read,
                        user,
                        "Please provide a email Adrress",
                        threadId
                    );
                    break;
                }
                const prompt2 = createEmailPrompt(messages);
                await notifyMessage(
                    room,
                    read,
                    user,
                    "Constants read",
                    threadId
                );
                const mailSummary = JSON.stringify(
                    await llmRequest(room, user, read, modify, http, prompt2),
                    null,
                    2
                );
                const jsonString = JSON.parse(mailSummary);
                const data = JSON.parse(jsonString);
                await notifyMessage(
                    room,
                    read,
                    user,
                    `Sending the following mail to ${emailAddress}
                    subject: ${data.subject}`,
                    threadId
                );
                await notifyMessage(
                    room,
                    read,
                    user,
                    `body: ${data.body}`,
                    threadId
                );

                //////////////////////////////////////////////////////////
                // Sending Mail

                const tokenData =
                    await this.oauth2Service.getAccessTokenForUser(user, read);
                if (!tokenData || !tokenData.token) {
                    await modify
                        .getNotifier()
                        .notifyUser(
                            user,
                            modify
                                .getCreator()
                                .startMessage()
                                .setText(`Pleas login with your gmail account`)
                                .setRoom(context.getRoom())
                                .getMessage()
                        );
                }
                const accessToken = tokenData.token;
                const mailResponse = JSON.stringify(
                    await sendMail(
                        room,
                        user,
                        read,
                        modify,
                        http,
                        accessToken,
                        emailAddress,
                        data.subject,
                        data.body
                    )
                );
                await modify
                    .getNotifier()
                    .notifyUser(
                        user,
                        modify
                            .getCreator()
                            .startMessage()
                            .setText(`${mailResponse} Mail Service Completed`)
                            .setRoom(context.getRoom())
                            .getMessage()
                    );

                break;
        }
    }
}
