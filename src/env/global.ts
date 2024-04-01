export type PageId = string;
export type ElementKey = string;
export type ElementLocator = string;
export type InputValue = string;
export type IframeKey = string;
export type Negate = boolean;
export type ExpectedElementText = string;
export type ExpectedElementValue = string;
export type PageElementMapping = Record<PageId, Record<ElementKey, ElementLocator>>
export type PagesConfig = Record<PageId, Record<string, string>>;
export type HostsConfig = Record<string, string>;
export type GlobalVariables = { [key: string]: string }

export type GlobalConfig = {
    hostsConfig: HostsConfig;
    pagesConfig: PagesConfig;
    pageElementMappings: PageElementMapping
};