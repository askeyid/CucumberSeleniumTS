import { WebDriver } from "selenium-webdriver";
import { GlobalConfig, PageId, PagesConfig } from "../env/global";

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
): Promise<boolean> => {
    const currentURL: string = await driver.getCurrentUrl();
    const {pathname: currentPath} = new URL(currentURL);

    return pathMatchesPageId(currentPath, pageId, globalConfig);
}

const pathMatchesPageId = (
    path: string,
    pageId: PageId,
    { pagesConfig }: GlobalConfig
): boolean => {
    const pageRegexString = pagesConfig[pageId].regex;
    const pageRegex = new RegExp(pageRegexString);

    return pageRegex.test(path);
}

export const getCurrentPageId = async (
    driver: WebDriver,
    globalConfig: GlobalConfig
): Promise<PageId> => {

    const { pagesConfig } = globalConfig;
    console.log('pagesconfig: ', pagesConfig);

    const currentURL: string = await driver.getCurrentUrl();

    const pageConfigPageIds = Object.keys(pagesConfig);
    console.log('pageConfigPageIds: ', pageConfigPageIds)

    const { pathname: currentPath } = new URL(currentURL);
    console.log('currentPath: ', currentPath);

    const currentPageId = pageConfigPageIds.find(pageId =>
        pathMatchesPageId(currentPath, pageId, globalConfig)
    );
    console.log('currentPageId: ', currentPageId);

    if (!currentPageId) {
        throw Error(
            `🧨 Failed to get page name from current route ${currentPath}, \
            possible pages: ${JSON.stringify(pagesConfig)} 🧨`
        );
    }

    return currentPageId;
}