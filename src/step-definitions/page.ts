import { Then } from '@cucumber/cucumber';
import { ScenarioWorld } from './setup/world';
import { inputElementValue } from '../support/html-behaviour';
import { WaitForResult, waitFor, waitForSelectorOnPage } from '../support/wait-for-behaviour';
import { getElementLocator } from '../support/web-element-helper';
import { ElementKey, InputValue, PagePosition } from '../env/global';
import { logger } from '../logger';

Then(
    /^I fill in the "([^"]*)" input on the ([0-9]+(?:st|nd|rd|th)) (?:tab|window) with "(.*)"$/,
    async function(this: ScenarioWorld, elementKey: ElementKey, pagePosition: PagePosition, inputValue: InputValue) {
        const {
            screen: { driver },
            globalConfig
        } = this;

        logger.log(`I fill in the ${elementKey} input on the ${pagePosition} window|tab with ${inputValue}`);

        const pageIndex = Number(pagePosition.match(/\d/g)?.join('')) - 1;

        const elementIdentifier = await getElementLocator(driver, elementKey, globalConfig);

        await waitFor(async () => {
            const elementStable = await waitForSelectorOnPage(driver, elementIdentifier, pageIndex);

            if (elementStable) {
                await inputElementValue(driver, elementIdentifier, inputValue);
                return WaitForResult.PASS;
            } else {
                return WaitForResult.ELEMENT_NOT_AVAILABLE;
            }
        },
            globalConfig,
            { target: elementKey }
        );
    }
)