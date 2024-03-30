import { By, WebDriver, WebElement } from 'selenium-webdriver';
import { ElementLocator, InputValue } from '../env/global';

export const getElement = async (
    driver: WebDriver,
    elementIdentifier: ElementLocator
): Promise<WebElement> => {
    const element = await driver.findElement(By.css(elementIdentifier));
    return element;
}

export const elementDisplayed = async (
    driver: WebDriver,
    elementIdentifier: ElementLocator
) : Promise<boolean | null> => {
    try {
        const element = await driver.findElement(By.css(elementIdentifier));
        return element.isDisplayed();
    } catch (e) {
        return false;
    }
}

export const getElementText = async (
    driver: WebDriver,
    elementIdentifier: ElementLocator
) : Promise<string | null> => {
    const element = await getElement(driver, elementIdentifier);
    const elementText = await element?.getAttribute('innerText');
    return elementText;
}

export const clickElement = async (
    driver: WebDriver,
    elementIdentifier: ElementLocator
): Promise<void> => {
    const element = await getElement(driver, elementIdentifier);
    await element.click();
}

export const inputElementValue = async (
    driver: WebDriver,
    elementIdentifier: ElementLocator,
    inputValue: InputValue
): Promise<void> => {
    const element = await getElement(driver, elementIdentifier);
    await element.clear();
    await element.sendKeys(inputValue);
}

const getElementWithOptions = async (
    driver: WebDriver,
    elementIdentifier: ElementLocator,
    option: string
): Promise<WebElement> => {
    const element = await driver.findElement(By.css(`${elementIdentifier} > option[value=${option}]`));
    return element;
}

export const selectElementValue = async (
    driver: WebDriver,
    elementIdentifier: ElementLocator,
    option: string
): Promise<void> => {
    const element = await getElementWithOptions(driver, elementIdentifier, option);
    await element.click();
}
