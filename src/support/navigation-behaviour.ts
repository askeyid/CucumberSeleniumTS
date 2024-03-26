import { WebDriver } from "selenium-webdriver";
import { GlobalConfig, PageId } from "../env/global";

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