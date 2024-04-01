import { Then } from '@cucumber/cucumber';
import { ScenarioWorld } from './setup/world';
import { inputElementValue } from '../support/html-behaviour';
import { waitFor, waitForSelector, waitForSelectorInFrame } from '../support/wait-for-behaviour';
import { getElementLocator } from '../support/web-element-helper';
import { ElementKey, IframeKey, InputValue } from '../env/global';

Then(
    /^I fill in the "([^"]*)" input on the "([^"]*)" iframe with "([^"]*)"$/,
    async function(this: ScenarioWorld, elementKey: ElementKey, iframeKey: IframeKey, inputValue: InputValue) {
        const {
            screen: { driver },
            globalConfig
        } = this;

        console.log(`I fill in the ${elementKey} input on the ${iframeKey} iframe with ${inputValue}`);

        const elementIdentifier = await getElementLocator(driver, elementKey, globalConfig);
        const iframeIdentifier = await getElementLocator(driver, iframeKey, globalConfig);

        await waitFor(async () => {

            const iframeStable = await waitForSelector(driver, iframeIdentifier);

            if(iframeStable) {

                const elementStable = await waitForSelectorInFrame(driver, iframeIdentifier, elementIdentifier);

                if (elementStable) {
                    await inputElementValue(driver, elementIdentifier, inputValue);
                }

                return elementStable;
            }

            return iframeStable;
        });
    }
)