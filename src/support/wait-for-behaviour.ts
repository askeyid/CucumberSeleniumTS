import { By, WebDriver } from "selenium-webdriver";
import { ElementLocator, GlobalConfig, PageIndex, WaitForTarget, WaitForTargetType } from "../env/global";
import { switchIframe, switchWindow } from "./html-behaviour";
import { logger } from "../logger";
import { envNumber } from "../env/parseEnv";

export const waitFor = async<T>(
    predicate: () => T | Promise<T>,
    globalConfig: GlobalConfig,
    options?: { timeout?: number; wait?: number; target?: WaitForTarget; type?: WaitForTargetType }
): Promise<void> => {
    const { 
        timeout = envNumber('WAITFOR_TIMEOUT'), 
        wait = envNumber('WAITFOR_POLL_WAIT'), 
        target = '', 
        type = 'element'
    } = options || {};

    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    const startDate = new Date();

    while (new Date().getTime() - startDate.getTime() < timeout) {
        const result = await predicate();
        if (result) return;

        await sleep(wait);
        logger.log(`Waiting ${wait}ms`);
    }

    throw new Error(`Wait time of ${timeout}ms for ${target} exceeded`);
}

export const waitForSelector = async (
    driver: WebDriver,
    elementIdentifier: ElementLocator
): Promise<boolean> => {
    try {
        await driver.switchTo().defaultContent();
        await driver.findElement(By.css(elementIdentifier));
        return true;
    } catch (e) {
        return false;
    }
}

export const waitForSelectors = async (
    driver: WebDriver,
    elementIdentifier: ElementLocator
): Promise<boolean> => {
    try {
        await driver.switchTo().defaultContent();
        await driver.findElements(By.css(elementIdentifier));
        return true;
    } catch (e) {
        return false;
    }
}

export const waitForSelectorWithText = async (
    driver: WebDriver,
    elementIdentifier: ElementLocator
): Promise<boolean> => {
    try {
        await driver.switchTo().defaultContent();
        await driver.findElement(By.xpath(elementIdentifier));
        return true;
    } catch (e) {
        return false;
    }
}

export const waitForSelectorInFrame = async(
    driver: WebDriver,
    elementIframe: ElementLocator,
    elementIdentifier: ElementLocator
): Promise<boolean> => {
    try {
        await switchIframe(driver, elementIframe);
        await driver.findElement(By.css(elementIdentifier));
        return true;
    } catch (e) {
        return false;
    }
}

export const waitForSelectorOnPage = async (
    driver: WebDriver,
    elementIdentifier: ElementLocator,
    pageIndex: PageIndex
): Promise<boolean> => {
    try {
        await switchWindow(driver, pageIndex);
        await driver.findElement(By.css(elementIdentifier));
        return true;
    } catch (e) {
        return false;
    }
}