import { WebDriver } from "selenium-webdriver";
import { ElementKey, ElementLocator, GlobalConfig, GlobalVariables } from "../env/global";

export const getElementLocator = async (
    driver: WebDriver,
    elementKey: ElementKey,
    globalVariables: GlobalVariables,
    globalConfig: GlobalConfig
): Promise<ElementLocator> => {
    const { pageElementMappings } = globalConfig;
    const currentPage = globalVariables.currentScreen;
    const elementIdentifier = pageElementMappings[currentPage]?.[elementKey] || pageElementMappings.common?.[elementKey];

    if (!elementIdentifier) {
        throw Error(`🧨 Unable to find the ${elementKey} mapping 🧨`);
    }

    return elementIdentifier;
}