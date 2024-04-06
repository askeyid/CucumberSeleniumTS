import { WebDriver } from "selenium-webdriver";
import { getCurrentPageId } from './navigation-behaviour';
import { ElementKey, ElementLocator, GlobalConfig } from "../env/global";

export const getElementLocator = async (
    driver: WebDriver,
    elementKey: ElementKey,
    globalConfig: GlobalConfig
): Promise<ElementLocator> => {
    const { pageElementMappings } = globalConfig;

    const currentPage = await getCurrentPageId(driver, globalConfig);

    const elementIdentifier = pageElementMappings[currentPage]?.[elementKey] || pageElementMappings.common?.[elementKey];

    if (!elementIdentifier) {
        throw Error(`🧨 Unable to find the ${elementKey} mapping 🧨`);
    }

    return elementIdentifier;
} 