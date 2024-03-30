import { Then } from '@cucumber/cucumber'
import { ScenarioWorld } from '../setup/world';
import { ElementKey, ExpectedElementText, Negate } from '../../env/global';
import { getElementLocator } from '../../support/web-element-helper';
import { waitFor } from '../../support/wait-for-behaviour';
import { getElementText } from '../../support/html-behaviour';

Then(
    /^the "(.*)" should( not)? contain the text "([^"]*)"$/,
    async function(this: ScenarioWorld, elementKey: ElementKey, negate: Negate, expectedElementText: ExpectedElementText) {
        const {
            screen: { driver },
            globalConfig
        } = this;

        console.log(`the ${elementKey} should${negate ? ' not' : ''} contain the text ${expectedElementText}`);

        const elementIdentifier = await getElementLocator(driver, elementKey, globalConfig);

        await waitFor(async() => {
            const elementText = await getElementText(driver, elementIdentifier);
            return elementText?.includes(expectedElementText) === !negate;
        });
    }
);

Then(
    /^the "(.*)" should( not)? equal the text "([^"]*)"$/,
    async function(this: ScenarioWorld, elementKey: ElementKey,  negate: Negate, expectedElementText: ExpectedElementText) {
        const {
            screen: { driver },
            globalConfig
        } = this;

        console.log(`the ${elementKey} should${negate ? ' not' : ''} equal the text ${expectedElementText}`);

        const elementIdentifier = await getElementLocator(driver, elementKey, globalConfig);

        await waitFor(async() => {
            const elementText = await getElementText(driver, elementIdentifier);
            console.log('elementText: ', elementText);
            console.log('expectedElementText: ', expectedElementText);
            return (elementText === expectedElementText) === !negate;
        });
    }
);