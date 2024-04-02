import { By, WebDriver, WebElement } from 'selenium-webdriver';
import { ElementLocator, InputValue } from '../env/global';

export const getElement = async (
    driver: WebDriver,
    elementIdentifier: ElementLocator
): Promise<WebElement> => {
    const element = await driver.findElement(By.css(elementIdentifier));
    return element;
}

export const getElements = async (
    driver: WebDriver,
    elementIdentifier: ElementLocator
): Promise<WebElement[]> => {
    const elements = await driver.findElements(By.css(elementIdentifier));
    return elements;
}

export const getElementWithText = async (
    driver: WebDriver,
    elementIdentifier: ElementLocator
): Promise<WebElement> => {
    const element = await driver.findElement(By.xpath(elementIdentifier));
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
): Promise<string | null> => {
    const element = await getElement(driver, elementIdentifier);
    const elementText = await element?.getAttribute('innerText');
    return elementText;
}

export const getElementTextAtIndex = async (
    driver: WebDriver,
    elementIdentifier: ElementLocator,
    index: number
): Promise<string | null> => {
    const elements = await getElements(driver, elementIdentifier);
    return elements[index].getAttribute('innerText');
}

export const getElementValue = async (
    driver: WebDriver,
    elementIdentifier: ElementLocator
): Promise<string | null> => {
    const element = await getElement(driver, elementIdentifier);
    const elementValue = await element?.getAttribute('value');
    return elementValue;
}

export const clickElement = async (
    driver: WebDriver,
    elementIdentifier: ElementLocator
): Promise<void> => {
    const element = await getElement(driver, elementIdentifier);
    await element.click();
}

export const clickElementAtIndex = async (
    driver: WebDriver,
    elementIdentifier: ElementLocator,
    index: number
): Promise<void> => {
    const elements = await getElements(driver, elementIdentifier);
    await elements[index].click();
}

export const clickElementWithText = async (
    driver: WebDriver,
    elementIdentifier: ElementLocator
): Promise<void> => {
    const element = await getElementWithText(driver, elementIdentifier);
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

export const elementChecked = async (
    driver: WebDriver,
    elementIdentifier: ElementLocator
): Promise<boolean | null> => {
    try {
        const element = await driver.findElement(By.css(elementIdentifier));
        return await element.isSelected();
    } catch (e) {
        return false;
    }
}

export const elementEnabled = async (
    driver: WebDriver,
    elementIdentifier: ElementLocator
): Promise<boolean | null> => {
    const element = await getElement(driver, elementIdentifier);
    if (!await element.isEnabled()) {
        return false;
    } else {
        return true;
    }
}

export const scrollElementIntoView = async (
    driver: WebDriver,
    elementIdentifier: ElementLocator
): Promise<void> => {
    const element = await getElement(driver, elementIdentifier);
    await driver.executeScript("arguments[0].scrollIntoView(false)", element);
    await driver.sleep(1500);
}

export const scrollElementIntoViewAtIndex = async (
    driver: WebDriver,
    elementIdentifier: ElementLocator,
    index: number
): Promise<void> => {
    const elements = await getElements(driver, elementIdentifier);
    await driver.executeScript('arguments[0].scrollIntoView(false)', elements[index]);
    await driver.sleep(1500);
}

export const switchIframe = async (
    driver: WebDriver,
    elementIframe: ElementLocator
): Promise<void> => {
    await driver.switchTo().frame(driver.findElement(By.css(elementIframe)));
}

export const switchWindow = async (
    driver: WebDriver,
    pageIndex: number
): Promise<void> => {
    const winHandles = driver.getAllWindowHandles();
    winHandles.then(function(handles) {
        const currentWindow = handles[pageIndex];
        driver.switchTo().window(currentWindow);
    });
}

export const getTitleWithinPage = async (
    driver: WebDriver,
    pageIndex: number
): Promise<string | null> => {
    await switchWindow(driver, pageIndex);
    return driver.getTitle();
}

const retrieveTableData = (
    driver: WebDriver,
    elementIdentifier: ElementLocator
) => {
    return new Promise((resolve) => {
        const cell: string[] = [];
        driver.findElement(By.css(elementIdentifier+' tbody')).then(async function (tableBody) {
            tableBody.findElements(By.css('tr td')).then(async function (cells) {
                for (let i = 0; i < cells.length; i++) {
                    const cell_text = await cells[i].getText();
                    cell.push(cell_text);
                }
                resolve(cell);
            });
        });
    });
}

export const getTableData = async (
    driver: WebDriver,
    elementIdentifier: ElementLocator
): Promise<string> => {
    const asyncFunction = [
        await retrieveTableData(driver, elementIdentifier)
    ]

    const tableData = await Promise.all(asyncFunction);

    return tableData.toString();
}