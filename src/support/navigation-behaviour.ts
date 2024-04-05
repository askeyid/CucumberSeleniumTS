import { WebDriver } from "selenium-webdriver";
import { GlobalConfig, PageId } from "../env/global";
import { WaitForResult } from "./wait-for-behaviour";

export const navigateToPage = async (
    driver: WebDriver,
    pageId: PageId,
    { pagesConfig, hostsConfig } : GlobalConfig
): Promise<void> => {
    const {
        UI_AUTOMATION_HOST: hostName = 'localhost'
    } = process.env

    const hostPath = hostsConfig[`${hostName}`];

    const url = new URL(hostPath);

    const pageConfigItem = pagesConfig[pageId];

    url.pathname = pageConfigItem.route;

    await driver.get(url.href);
}

export const currentPathMatchesPageId = async (
    driver: WebDriver,
    pageId: PageId,
    globalConfig: GlobalConfig
): Promise<WaitForResult> => {
    const currentURL: string = await driver.getCurrentUrl();
    const {pathname: currentPath} = new URL(currentURL);

    if(pathMatchesPageId(currentPath, pageId, globalConfig)) {
        return WaitForResult.PASS;
    } else {
        return WaitForResult.ELEMENT_NOT_AVAILABLE;
    }
}

const pathMatchesPageId = (
    path: string,
    pageId: PageId,
    { pagesConfig }: GlobalConfig
): boolean => {
    let pageRegexString;
    
    try{
        pageRegexString = pagesConfig[pageId].regex;
    } catch {
        throw Error(`🧨 Unable to find the ${pageId} page mapping 🧨`);
    }

    const pageRegex = new RegExp(pageRegexString);

    return pageRegex.test(path);
}

export const getCurrentPageId = async (
    driver: WebDriver,
    globalConfig: GlobalConfig
): Promise<PageId> => {

    const { pagesConfig } = globalConfig;

    const currentURL: string = await driver.getCurrentUrl();

    const pageConfigPageIds = Object.keys(pagesConfig);

    const { pathname: currentPath } = new URL(currentURL);

    const currentPageId = pageConfigPageIds.find(pageId =>
        pathMatchesPageId(currentPath, pageId, globalConfig)
    );

    if (!currentPageId) {
        throw Error(
            `🧨 Failed to get page name from current route ${currentPath}, \
            possible pages: ${JSON.stringify(pagesConfig)} 🧨`
        );
    }

    return currentPageId;
}

export const reloadPage = async (
    driver: WebDriver
): Promise<void> => {
    await driver.navigate().refresh();
}