import { notifyMessage } from "../helpers/NotifyMessage";
import {
    IHttp,
    IModify,
    IRead,
    IPersistence,
} from "@rocket.chat/apps-engine/definition/accessors";
import { IRoom } from "@rocket.chat/apps-engine/definition/rooms";
import { IUser } from "@rocket.chat/apps-engine/definition/users";
import { OAuth2Service } from "../services/OAuth2Service";
export async function HandleAuth(
    room: IRoom,
    read: IRead,
    user: IUser,
    modify: IModify,
    http: IHttp,
    authAction: string,
    oauth2Service: OAuth2Service,
    persis: IPersistence,
    threadId?: string
) {
    try {
        if (authAction === "token") {
            // Retrieve and display the access token
            const tokenData = await oauth2Service.getAccessTokenForUser(
                user,
                read
            );
            if (tokenData && tokenData.token) {
                await notifyMessage(
                    room,
                    read,
                    user,
                    `Access token: ${tokenData.token}`,
                    threadId
                );
            } else {
                await notifyMessage(
                    room,
                    read,
                    user,
                    "No access token found. Please authorize the app first.",
                    threadId
                );
            }
        } else if (authAction === "refresh") {
            await oauth2Service.refreshUserAccessToken(user, persis);
            await notifyMessage(
                room,
                read,
                user,
                "Access token refreshed successfully.",
                threadId
            );
        } else if (authAction === "revoke") {
            await oauth2Service.revokeUserAccessToken(user, persis);
            await notifyMessage(
                room,
                read,
                user,
                "Access token revoked successfully.",
                threadId
            );
        } else {
            const authUrl = await oauth2Service.getUserAuthorizationUrl(user);
            await notifyMessage(
                room,
                read,
                user,
                `Please authorize the app by visiting: ${authUrl}`,
                threadId
            );
        }
    } catch (error) {
        this.logger.error("Error executing OAuth command:", error);
        await notifyMessage(
            room,
            read,
            user,
            `An error occurred while processing the OAuth command: ${error.message}`,
            threadId
        );
    }
}
