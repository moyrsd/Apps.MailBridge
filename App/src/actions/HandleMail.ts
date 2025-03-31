import { notifyMessage } from "../helpers/NotifyMessage";
import { llmRequest } from "../services/LLMRequest";
import {
    IHttp,
    IModify,
    IPersistence,
    IRead,
} from "@rocket.chat/apps-engine/definition/accessors";
import { IRoom } from "@rocket.chat/apps-engine/definition/rooms";
import { IUser } from "@rocket.chat/apps-engine/definition/users";
import { createEmailPrompt } from "../constants/prompts/EmailSummaryPrompt";
import { OAuth2Service } from "../services/OAuth2Service";
import { sendMail } from "../services/SendMail";
export async function HandleMail(
    room: IRoom,
    read: IRead,
    user: IUser,
    modify: IModify,
    http: IHttp,
    emailAddress: string,
    messages: string,
    oauth2Service: OAuth2Service,
    persis: IPersistence,
    threadId?: string
) {
    if (!emailAddress) {
        await notifyMessage(
            room,
            read,
            user,
            "Please provide a email Adrress",
            threadId
        );
        return;
    }
    const prompt = createEmailPrompt(messages);
    await notifyMessage(room, read, user, "Constants read", threadId);
    const mailSummary = JSON.stringify(
        await llmRequest(room, user, read, modify, http, prompt),
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
                    subject: ${data.subject}
                    body: ${data.body}`,
        threadId
    );
    const accessToken = await GetAuthToken(
        room,
        read,
        user,
        oauth2Service,
        threadId
    );

    await MailResponse(
        room,
        read,
        user,
        modify,
        http,
        emailAddress,
        accessToken,
        data.subject,
        data.body
    );
}

async function GetAuthToken(
    room: IRoom,
    read: IRead,
    user: IUser,
    oauth2Service: OAuth2Service,
    threadId?: string
) {
    const tokenData = await oauth2Service.getAccessTokenForUser(user, read);
    if (!tokenData || !tokenData.token) {
        await notifyMessage(
            room,
            read,
            user,
            `Pleas login with your gmail account`,
            threadId
        );
        return;
    }
    return tokenData.token;
}

async function MailResponse(
    room: IRoom,
    read: IRead,
    user: IUser,
    modify: IModify,
    http: IHttp,
    emailAddress: string,
    accessToken: string,
    subject: string,
    body: string,
    threadId?: string
) {
    const mailResponse = JSON.stringify(
        await sendMail(
            room,
            user,
            read,
            modify,
            http,
            accessToken,
            emailAddress,
            subject,
            body
        )
    );
    await notifyMessage(
        room,
        read,
        user,
        `${mailResponse} Mail Service Completed`,
        threadId
    );
}
