import { Then } from '@cucumber/cucumber'
import { ScenarioWorld } from '../setup/world';
import { ElementKey, ExpectedElementText, IframeKey, Negate } from '../../env/global';
import { getElementLocator } from '../../support/web-element-helper';
import { WaitForResult, waitFor, waitForSelector, waitForSelectorInFrame,  } from '../../support/wait-for-behaviour';
import { elementDisplayed, getElementText } from '../../support/html-behaviour';
import { logger } from '../../logger';

Then(
    /^the "([^"]*)" on the "([^"]*)" iframe should( not)? be displayed$/,
    async function(this: ScenarioWorld, elementKey: ElementKey, iframeKey: IframeKey, negate: Negate) {
        const {
            screen: { driver },
            globalConfig
        } = this;

        logger.log(`the ${elementKey} on the ${iframeKey} iframe should ${negate?'not ':''}be displayed`);

        const elementIdentifier = await getElementLocator(driver, elementKey, globalConfig);
        const iframeIdentifier = await getElementLocator(driver, iframeKey, globalConfig);

        await waitFor(async () => {
            const iframeStable = await waitForSelector(driver, iframeIdentifier);

            if (iframeStable) {
                const elementStable = await waitForSelectorInFrame(driver, iframeIdentifier, elementIdentifier)

                if (elementStable) {
                    const isElementVisible = await elementDisplayed(driver, elementIdentifier);
                    return (isElementVisible === !negate) ? { result: WaitForResult.PASS } : { result: WaitForResult.FAIL, replace: elementKey };
                } else {
                    return { result: WaitForResult.ELEMENT_NOT_AVAILABLE, replace: elementKey };
                }
            } else {
                return { result: WaitForResult.ELEMENT_NOT_AVAILABLE, replace: iframeKey };
            }
        },
            globalConfig,
            { target: elementKey,
                failureMessage: `🧨 Expected ${elementKey} on the ${iframeKey} iframe to ${negate?'not ':''}be displayed 🧨` }
        );
    }
)

Then(
    /^the "([^"]*)" on the "([^"]*)" iframe should( not)? contain the text "(.*)"$/,
    async function(this: ScenarioWorld, elementKey: ElementKey, iframeKey: IframeKey, negate: Negate, expectedElementText: ExpectedElementText) {
        const {
            screen: { driver },
            globalConfig
        } = this;

        logger.log(`the ${elementKey} on the ${iframeKey} should ${negate?'not ':''}contain the text ${expectedElementText}`);

        const elementIdentifier = await getElementLocator(driver, elementKey, globalConfig);
        const iframeIdentifier = await getElementLocator(driver, iframeKey, globalConfig);

        await waitFor(async () => {
            const iframeStable = await waitForSelector(driver, iframeIdentifier);

            if (iframeStable) {
                const elementStable = await waitForSelectorInFrame(driver, iframeIdentifier, elementIdentifier);

                if (elementStable) {
                    const elementText = await getElementText(driver, elementIdentifier);
                    return (elementText?.includes(expectedElementText) === !negate) ? { result: WaitForResult.PASS } : { result: WaitForResult.FAIL, replace: elementKey };
                } else {
                    return { result: WaitForResult.ELEMENT_NOT_AVAILABLE, replace: elementKey };
                }
            } else {
                return { result: WaitForResult.ELEMENT_NOT_AVAILABLE, replace: iframeKey };
            }
        },
            globalConfig,
            { target: elementKey,
                failureMessage: `🧨 Expected ${elementKey} on the ${iframeKey} to ${negate?'not ':''}contain the text ${expectedElementText} 🧨` }
        );
    }
)

Then(
    /^the "([^"]*)" on the "([^"]*)" iframe should( not)? equal the text "(.*)"$/,
    async function(this: ScenarioWorld, elementKey: ElementKey, iframeKey: IframeKey, negate: Negate, expectedElementText: ExpectedElementText) {
        const {
            screen: { driver },
            globalConfig
        } = this;

        logger.log(`the ${elementKey} on the ${iframeKey} should ${negate?'not ':''}equal the text ${expectedElementText}`);

        const elementIdentifier = await getElementLocator(driver, elementKey, globalConfig);
        const iframeIdentifier = await getElementLocator(driver, iframeKey, globalConfig);

        await waitFor(async () => {
            const iframeStable = await waitForSelector(driver, iframeIdentifier);

            if (iframeStable) {
                const elementStable = await waitForSelectorInFrame(driver, iframeIdentifier, elementIdentifier);

                if (elementStable) {
                    const elementText = await getElementText(driver, elementIdentifier);
                    return (elementText === expectedElementText === !negate) ? { result: WaitForResult.PASS } : { result: WaitForResult.FAIL, replace: elementKey };
                } else {
                    return { result: WaitForResult.ELEMENT_NOT_AVAILABLE, replace: elementKey };
                }
            } else {
                return { result: WaitForResult.ELEMENT_NOT_AVAILABLE, replace: iframeKey };
            }
        },
            globalConfig,
            { target: elementKey,
                failureMessage: `🧨 Expected ${elementKey} on the ${iframeKey} to ${negate?'not ':''}equal the text ${expectedElementText} 🧨` }
        );
    }
)