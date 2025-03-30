import { IConfigurationExtend } from "@rocket.chat/apps-engine/definition/accessors";
import { OAuth2Service } from "./src/services/OAuth2Service";
import { OAuthCommand } from "./src/commands/OauthCommand";
import { App } from "@rocket.chat/apps-engine/definition/App";
import { MailBridgeCommand } from "./src/commands/MailBridgeCommand";
import { GoogleoauthConfig } from "./src/config/GoogleOauthconfig";
import { settings } from "./src/settings/settings";
export class OAuthApp extends App {
    private oauth2Service: OAuth2Service;

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
                new MailBridgeCommand(this.oauth2Service, this.getLogger())
            ),

            configuration.slashCommands.provideSlashCommand(
                new OAuthCommand(this.oauth2Service, this.getLogger())
            ),
        ]);
    }
}
