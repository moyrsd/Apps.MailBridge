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
import { OAuth2Service } from "../services/OAuth2Service";
import { ILogger } from "@rocket.chat/apps-engine/definition/accessors";
import { sendMail } from "../services/SendMail";

export class OAuthCommand implements ISlashCommand {
    public command = "oauth";
    public i18nParamsExample = "";
    public i18nDescription = "OAuth command for testing";
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
        const args = context.getArguments();

        try {
            if (args[0] === "token") {
                // Retrieve and display the access token
                const tokenData =
                    await this.oauth2Service.getAccessTokenForUser(user, read);
                if (tokenData && tokenData.token) {
                    await modify
                        .getNotifier()
                        .notifyUser(
                            user,
                            modify
                                .getCreator()
                                .startMessage()
                                .setText(`Access token: ${tokenData.token}`)
                                .setRoom(context.getRoom())
                                .getMessage()
                        );
                } else {
                    await modify
                        .getNotifier()
                        .notifyUser(
                            user,
                            modify
                                .getCreator()
                                .startMessage()
                                .setText(
                                    "No access token found. Please authorize the app first."
                                )
                                .setRoom(context.getRoom())
                                .getMessage()
                        );
                }
            } else if (args[0] === "refresh") {
                await this.oauth2Service.refreshUserAccessToken(user, persis);
                await modify
                    .getNotifier()
                    .notifyUser(
                        user,
                        modify
                            .getCreator()
                            .startMessage()
                            .setText("Access token refreshed successfully.")
                            .setRoom(context.getRoom())
                            .getMessage()
                    );
            } else if (args[0] === "revoke") {
                await this.oauth2Service.revokeUserAccessToken(user, persis);
                await modify
                    .getNotifier()
                    .notifyUser(
                        user,
                        modify
                            .getCreator()
                            .startMessage()
                            .setText("Access token revoked successfully.")
                            .setRoom(context.getRoom())
                            .getMessage()
                    );
            } else {
                const authUrl =
                    await this.oauth2Service.getUserAuthorizationUrl(user);
                await modify
                    .getNotifier()
                    .notifyUser(
                        user,
                        modify
                            .getCreator()
                            .startMessage()
                            .setText(
                                `Please authorize the app by visiting: ${authUrl}`
                            )
                            .setRoom(context.getRoom())
                            .getMessage()
                    );
            }
        } catch (error) {
            this.logger.error("Error executing OAuth command:", error);
            await modify
                .getNotifier()
                .notifyUser(
                    user,
                    modify
                        .getCreator()
                        .startMessage()
                        .setText(
                            `An error occurred while processing the OAuth command: ${error.message}`
                        )
                        .setRoom(context.getRoom())
                        .getMessage()
                );
        }
    }
}
