import {
    ISetting,
    SettingType,
} from "@rocket.chat/apps-engine/definition/settings";

export enum AppSettingsEnum {
    LlmProviderId = "llm_provider_id",
    LlmProviderLabel = "LLM Provider URL",
    LLMProviderPackageValue = "https://api.deepinfra.com/v1/openai/chat/completions",
    LlmModelId = "llm_model_id",
    LlmModelLabel = "LLM Model Name",
    LlmModelPackageValue = "meta-llama/Llama-3.3-70B-Instruct",
    LlmApiKeyId = "llm_api_key_id",
    LlmApiKeyLabel = "LLM Api Key",
}
export const settings: ISetting[] = [
    {
        id: AppSettingsEnum.LlmProviderId,
        i18nLabel: AppSettingsEnum.LlmProviderLabel,
        type: SettingType.STRING,
        required: true,
        public: false,
        packageValue: AppSettingsEnum.LLMProviderPackageValue,
    },
    {
        id: AppSettingsEnum.LlmModelId,
        i18nLabel: AppSettingsEnum.LlmModelLabel,
        type: SettingType.STRING,
        required: true,
        public: false,
        packageValue: AppSettingsEnum.LlmModelPackageValue,
    },
    {
        id: AppSettingsEnum.LlmApiKeyId,
        i18nLabel: AppSettingsEnum.LlmApiKeyLabel,
        type: SettingType.PASSWORD,
        required: true,
        public: false,
        packageValue: "",
    },
];
