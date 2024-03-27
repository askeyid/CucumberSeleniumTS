import { Then } from '@cucumber/cucumber'
import { ScenarioWorld } from '../setup/world';
import { ElementKey } from '../../env/global';
import { getElementLocator } from '../../support/web-element-helper';
import { waitFor } from '../../support/wait-for-behaviour';
import { elementDisplayed } from '../../support/html-behaviour';

Then(
    /^the "([^"]*)" should be displayed$/,
    async function (this: ScenarioWorld, elementKey: ElementKey) {
        const {
            screen: { driver },
            globalVariables,
            globalConfig
        } = this;

        console.log(`the ${elementKey} should be displayed`);

        const elementIdentifier = await getElementLocator(driver, elementKey, globalVariables, globalConfig);

        await waitFor(async () => {
            const isElementVisible = await elementDisplayed(driver, elementIdentifier);
            return isElementVisible;
        });
    }
);
