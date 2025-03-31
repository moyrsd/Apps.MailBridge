import {
    IPersistence,
    IPersistenceRead,
} from "@rocket.chat/apps-engine/definition/accessors";
import {
    RocketChatAssociationModel,
    RocketChatAssociationRecord,
} from "@rocket.chat/apps-engine/definition/metadata";
import { IUser } from "@rocket.chat/apps-engine/definition/users";
import { IContacts } from "../definition/IContacts";

export class ContactsStorage {
    constructor(
        private readonly persistence: IPersistence,
        private readonly persistenceRead: IPersistenceRead
    ) {}

    public async createContact(
        user: IUser,
        name: string,
        emailAddress: string
    ): Promise<boolean> {
        try {
            const associations: Array<RocketChatAssociationRecord> = [
                new RocketChatAssociationRecord(
                    RocketChatAssociationModel.USER,
                    `${user.id}`
                ),
                new RocketChatAssociationRecord(
                    RocketChatAssociationModel.MISC,
                    "name"
                ),
                new RocketChatAssociationRecord(
                    RocketChatAssociationModel.MISC,
                    "emailAddress"
                ),
            ];
            let contactRecord: IContacts = {
                id: user.id,
                name: name,
                emailAddress: emailAddress,
            };

            await this.persistence.updateByAssociations(
                associations,
                contactRecord,
                true
            );
        } catch (error) {
            console.warn("Error Adding Contact :", error);
            return false;
        }
        return true;
    }

    public async getContacts(user: IUser): Promise<Array<IContacts>> {
        try {
            const associations: Array<RocketChatAssociationRecord> = [
                new RocketChatAssociationRecord(
                    RocketChatAssociationModel.USER,
                    `${user.id}`
                ),
            ];
            let contacts: Array<IContacts> =
                (await this.persistenceRead.readByAssociations(
                    associations
                )) as Array<IContacts>;
            return contacts;
        } catch (error) {
            console.warn("Error Fetching Contacts :", error);
            let contacts: Array<IContacts> = [];
            return contacts;
        }
    }

    public async deleteContacts(
        user: IUser,
        name: string,
        emailAddress: string
    ): Promise<boolean> {
        try {
            const associations: Array<RocketChatAssociationRecord> = [
                new RocketChatAssociationRecord(
                    RocketChatAssociationModel.USER,
                    `${user.id}`
                ),
                new RocketChatAssociationRecord(
                    RocketChatAssociationModel.MISC,
                    "name"
                ),
                new RocketChatAssociationRecord(
                    RocketChatAssociationModel.MISC,
                    "emailAddress"
                ),
            ];
            await this.persistence.removeByAssociations(associations);
        } catch (error) {
            console.warn("Delete Contact Error :", error);
            return false;
        }
        return true;
    }
}
