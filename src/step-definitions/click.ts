import { When } from '@cucumber/cucumber';
import { ScenarioWorld } from './setup/world';
import { clickElement, clickElementAtIndex, clickElementWithText } from '../support/html-behaviour';
import { waitFor, waitForSelector, waitForSelectorWithText, waitForSelectors } from '../support/wait-for-behaviour';
import { getElementLocator } from '../support/web-element-helper';
import { ElementKey, ElementPosition } from '../env/global';

When(
    /^I click the "([^"]*)" (?:button|link)$/,
    async function (this: ScenarioWorld, elementKey: ElementKey) {
        const {
            screen: { driver },
            globalConfig
        } = this;

        console.log(`I click the ${elementKey} button|link`);

        const elementIdentifier = await getElementLocator(driver, elementKey, globalConfig);

        await waitFor(async () => {
            const elementStable = await waitForSelector(driver, elementIdentifier);

            if (elementStable) {
                await clickElement(driver, elementIdentifier);
            }

            return elementStable;
        });
    }
)

When(
    /^I click the ([0-9]+(?:st|nd|rd|th)) "([^"]*)" (?:button|link)$/,
    async function(this: ScenarioWorld, elementPosition: ElementPosition, elementKey: ElementKey) {
        const {
            screen: { driver },
            globalConfig
        } = this;

        console.log(`I click ${elementPosition} ${elementKey} button|link`);

        const elementIdentifier = await getElementLocator(driver, elementKey, globalConfig);

        const elementIndex = Number(elementPosition.match(/\d/g)?.join('')) - 1;

        await waitFor(async () => {

            const elementStable = await waitForSelectors(driver, elementIdentifier);

            if (elementStable) {
                await clickElementAtIndex(driver, elementIdentifier, elementIndex);
            }

            return elementStable;
        });
    }
)

When(
    /^I click the element with text "([^"]*)"$/,
    async function (this: ScenarioWorld, elementKey: ElementKey) {
        const {
            screen: { driver },
            globalConfig
        } = this;

        console.log(`I click the element with text ${elementKey}`);

        const elementIdentifier = await getElementLocator(driver, elementKey, globalConfig);

        await waitFor(async () => {
            const elementStable = await waitForSelectorWithText(driver, elementIdentifier);

            if (elementStable) {
                await clickElementWithText(driver, elementIdentifier);
            }

            return elementStable;
        });
    }
)