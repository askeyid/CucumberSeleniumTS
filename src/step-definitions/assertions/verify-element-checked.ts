import { Then } from '@cucumber/cucumber';
import { waitFor } from '../../support/wait-for-behaviour';
import { ScenarioWorld } from '../setup/world';
import { getElementLocator } from '../../support/web-element-helper';
import { ElementKey, Negate } from '../../env/global';
import { elementChecked } from '../../support/html-behaviour';

Then(
    /^the "([^"]*)" radio button should( not)? be checked$/,
    async function(this: ScenarioWorld, elementKey: ElementKey, negate: Negate) {
        const {
            screen: { driver },
            globalConfig
        } = this;

        console.log(`the ${elementKey} radio button should${negate ? ' not' : ''} be checked`);

        const elementIdentifier = await getElementLocator(driver, elementKey, globalConfig);

        await waitFor( async() => {
            const isElementChecked = await elementChecked(driver, elementIdentifier);
            return isElementChecked === !negate;
        });
    }
)