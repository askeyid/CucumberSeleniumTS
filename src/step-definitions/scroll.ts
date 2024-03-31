import { Then } from '@cucumber/cucumber';
import { ScenarioWorld } from './setup/world';
import { waitFor, waitForSelector } from '../support/wait-for-behaviour';
import { getElementLocator } from '../support/web-element-helper';
import { ElementKey } from '../env/global';
import { scrollElementIntoView } from '../support/html-behaviour';

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