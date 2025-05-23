import { IConfigurationExtend, IHttp, IModify, IPersistence, IRead } from "@rocket.chat/apps-engine/definition/accessors";
import { OAuth2Service } from "./src/services/OAuth2Service";
import { App } from "@rocket.chat/apps-engine/definition/App";
import { MailBridgeCommand } from "./src/commands/MailBridgeCommand";
import { GoogleoauthConfig } from "./src/config/GoogleOauthconfig";
import { settings } from "./src/settings/settings";
import { IUIKitResponse, UIKitBlockInteractionContext, UIKitInteractionContext } from "@rocket.chat/apps-engine/definition/uikit";
import { ExecuteBlockActionHandler } from "./src/handlers/ExecuteBlockActionHandler";
export class MailBridgeApp extends App {
    private oauth2Service: OAuth2Service;
    private context: UIKitInteractionContext;

    protected async extendConfiguration(
        configuration: IConfigurationExtend
    ): Promise<void> {
        this.oauth2Service = new OAuth2Service(this, GoogleoauthConfig);
        await this.oauth2Service.setup(configuration);
        await Promise.all([
            ...settings.map((setting) =>
                configuration.settings.provideSetting(setting)
            ),
            configuration.slashCommands.provideSlashCommand(
                new MailBridgeCommand(
                    this,
                    this.oauth2Service,
                    this.getLogger()
                )
            ),
        ]);
    }
    public async executeBlockActionHandler(
        context: UIKitBlockInteractionContext,
        read: IRead,
        http: IHttp,
        persistence: IPersistence,
        modify: IModify
    ): Promise<IUIKitResponse> {
        const handler = new ExecuteBlockActionHandler(
            this,
            read,
            http,
            persistence,
            modify,
            context
        );

        return await handler.handleActions();
    }
}
