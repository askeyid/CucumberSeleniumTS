import { By, WebDriver } from "selenium-webdriver";
import { ElementLocator, GlobalConfig, PageIndex, WaitForTarget, WaitForTargetType } from "../env/global";
import { switchIframe, switchWindow } from "./html-behaviour";
import { logger } from "../logger";
import { envNumber } from "../env/parseEnv";

export const enum WaitForResult {
    PASS = 1,
    FAIL = 2,
    ELEMENT_NOT_AVAILABLE = 3
}

export type WaitForResultWithContext = {
    result: WaitForResult;
    replace?: string;
}

export const waitFor = async(
    predicate: () => 
    | WaitForResult 
    | Promise<WaitForResult> 
    | WaitForResultWithContext 
    | Promise<WaitForResultWithContext>,
    globalConfig: GlobalConfig,
    options?: { 
        timeout?: number; 
        wait?: number; 
        target?: WaitForTarget; 
        type?: WaitForTargetType;
        failureMessage?: string
    }
): Promise<void> => {
    const { 
        timeout = envNumber('WAITFOR_TIMEOUT'), 
        wait = envNumber('WAITFOR_POLL_WAIT'), 
        target = '', 
        type = 'element'
    } = options || {};

    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    const startDate = new Date();
    let notAvailableContext: string | undefined;
    let resultAs = WaitForResult.ELEMENT_NOT_AVAILABLE;

    while (new Date().getTime() - startDate.getTime() < timeout) {
        const result = await predicate();
        if ((result as WaitForResultWithContext).result) {
            notAvailableContext = (result as WaitForResultWithContext).replace;
            resultAs = (result as WaitForResultWithContext).result;
        } else {
            resultAs = result as WaitForResult
        }

        if (resultAs === WaitForResult.PASS) {
            return;
        }

        await sleep(wait);
        logger.log(`Waiting ${wait}ms`);
    }

    const waitForErrorMsg =
        resultAs === WaitForResult.ELEMENT_NOT_AVAILABLE
        ? `🧨 Times out after ${timeout}ms waiting for the ${notAvailableContext || target} ${type} 🧨`
        : options?.failureMessage || 'Test assertion failed';

    throw new Error(waitForErrorMsg);
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