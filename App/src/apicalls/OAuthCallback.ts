// The following Oauthcallback can be used if you want to implement your own Oauth for more control

// import {
//     IConfigurationExtend,
//     IPersistence,
//     IRead,
//     IHttp,
// } from "@rocket.chat/apps-engine/definition/accessors";
// import { IUser } from "@rocket.chat/apps-engine/definition/users";
// import {
//     RocketChatAssociationRecord,
//     RocketChatAssociationModel,
// } from "@rocket.chat/apps-engine/definition/metadata";

// export async function handleOAuthCallback(
//     user: IUser,
//     code: string,
//     http: IHttp,
//     persis: IPersistence
// ): Promise<void> {
//     try {
//         const response = await http.post(this.config.accessTokenUri, {
//             headers: {
//                 "Content-Type": "application/x-www-form-urlencoded",
//             },
//             data: `code=${code}&client_id=${this.config.clientId}&client_secret=${this.config.clientSecret}&redirect_uri=${this.config.redirectUri}&grant_type=authorization_code`,
//         });

//         if (response.statusCode === 200 && response.data) {
//             const tokenData = response.data;
//             this.app
//                 .getLogger()
//                 .debug(
//                     `Token data to be stored for user ${user.username}:`,
//                     tokenData
//                 );
//             const association = new RocketChatAssociationRecord(
//                 RocketChatAssociationModel.USER,
//                 user.id
//             );
//             await persis.updateByAssociation(association, tokenData, true);
//             this.app
//                 .getLogger()
//                 .info(`Access token stored for user: ${user.username}`);
//         } else {
//             this.app
//                 .getLogger()
//                 .error(`Failed to get access token: ${response.content}`);
//         }
//     } catch (error) {
//         this.app
//             .getLogger()
//             .error(
//                 `Failed to handle OAuth callback for user: ${user.username}`,
//                 error
//             );
//     }
// }
