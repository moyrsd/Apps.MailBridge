import {
    IUIKitResponse,
    UIKitBlockInteractionContext,
} from "@rocket.chat/apps-engine/definition/uikit";
import {
    IHttp,
    IModify,
    IPersistence,
    IRead,
} from "@rocket.chat/apps-engine/definition/accessors";
import { CreateNewContactButtonEnum } from "../enums/ui/contextualbar/CreateNewContactButtonEnum";
import { CreateNewContactModal } from "../ui/modals/CreateNewContactModal";
import { App } from "@rocket.chat/apps-engine/definition/App";

export class ExecuteBlockActionHandler {
    private context: UIKitBlockInteractionContext;
    constructor(
        protected readonly app: App,
        protected readonly read: IRead,
        protected readonly http: IHttp,
        protected readonly persis: IPersistence,
        protected readonly modify: IModify,
        context: UIKitBlockInteractionContext
    ) {
        this.context = context;
    }

    public async handleActions(): Promise<IUIKitResponse> {
        const {
            actionId,
            user,
            container,
            blockId,
            value,
            triggerId,
            message,
        } = this.context.getInteractionData();
        let { room } = this.context.getInteractionData();

        switch (actionId) {
            case CreateNewContactButtonEnum.ACTION_ID: {
                if (room) {
                    await CreateNewContactModal(
                        this.app,
                        user,
                        this.read,
                        this.persis,
                        this.modify,
                        room,
                        triggerId
                    );
                } else {
                    throw new Error("Room is undefined");
                }
                break;
            }
        }
        return this.context.getInteractionResponder().successResponse();
    }
}
