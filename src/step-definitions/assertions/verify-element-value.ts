import { Then } from '@cucumber/cucumber'
import { ScenarioWorld } from '../setup/world';
import { ElementKey, ExpectedElementText } from '../../env/global';
import { getElementLocator } from '../../support/web-element-helper';
import { waitFor } from '../../support/wait-for-behaviour';
import { getElementText } from '../../support/html-behaviour';

Then(
    /^the "(.*)" should contain the text "([^"]*)"$/,
    async function(this: ScenarioWorld, elementKey: ElementKey, expectedElementText: ExpectedElementText) {
        const {
            screen: { driver },
            globalConfig
        } = this;

        console.log(`the ${elementKey} should contain the text ${expectedElementText}`);

        const elementIdentifier = await getElementLocator(driver, elementKey, globalConfig);

        await waitFor(async() => {
            const elementText = await getElementText(driver, elementIdentifier);
            return elementText?.includes(expectedElementText);
        });
    }
);