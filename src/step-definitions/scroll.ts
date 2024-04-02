import { Then } from '@cucumber/cucumber';
import { ScenarioWorld } from './setup/world';
import { waitFor, waitForSelector, waitForSelectors } from '../support/wait-for-behaviour';
import { getElementLocator } from '../support/web-element-helper';
import { ElementKey, ElementPosition } from '../env/global';
import { scrollElementIntoView, scrollElementIntoViewAtIndex } from '../support/html-behaviour';

Then(
    /^I scroll to the "([^"]*)" (?:.*?)$/,
    async function (this: ScenarioWorld, elementKey: ElementKey) {
        const {
            screen: { driver },
            globalConfig
        } = this;

        console.log(`I scroll to the ${elementKey}`);

        const elementIdentifier = await getElementLocator(driver, elementKey, globalConfig);

        await waitFor(async () => {
            const elementStable = await waitForSelector(driver, elementIdentifier);

            if (elementStable) {
                await scrollElementIntoView(driver, elementIdentifier);
            }

            return elementStable;
        });
    }
)

Then(
    /^I scroll to the ([0-9]+(?:st|nd|rd|th)) "([^"]*)" (?:.*?)$/,
    async function (this: ScenarioWorld, elementPosition: ElementPosition, elementKey: ElementKey) {
        const {
            screen: { driver },
            globalConfig
        } = this;

        console.log(`I scroll to the ${elementPosition} ${elementKey}`);

        const elementIdentifier = await getElementLocator(driver, elementKey, globalConfig);

        const elementIndex = Number(elementPosition.match(/\d/g)?.join('')) - 1;

        await waitFor(async () => {
            const elementStable = await waitForSelectors(driver, elementIdentifier);

            if (elementStable) {
                await scrollElementIntoViewAtIndex(driver, elementIdentifier, elementIndex);
            }

            return elementStable;
        });
    }
)