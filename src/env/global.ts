export type PageId = string;
export type ElementKey = string;
export type ElementLocator = string;
export type InputValue = string;
export type IframeKey = string;
export type Negate = boolean;
export type PagePosition = string;
export type PageIndex = number;
export type ElementPosition = string;
export type ElementIndex = number;
export type ExpectedElementText = string;
export type ExpectedElementValue = string;
export type GlobalVariableKey = string;
export type PageElementMapping = Record<PageId, Record<ElementKey, ElementLocator>>
export type PagesConfig = Record<PageId, Record<string, string>>;
export type HostsConfig = Record<string, string>;
export type EmailsConfig = Record<string, string>;
export type GlobalVariables = { [key: string]: string };
export type WaitForTargetType = string;
export type WaitForTarget = PageId | ElementKey;

export type GlobalConfig = {
    hostsConfig: HostsConfig;
    pagesConfig: PagesConfig;
    pageElementMappings: PageElementMapping
    emailsConfig: EmailsConfig
};