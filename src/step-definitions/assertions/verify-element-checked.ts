import { Then } from '@cucumber/cucumber';
import { WaitForResult, waitFor, waitForSelector } from '../../support/wait-for-behaviour';
import { ScenarioWorld } from '../setup/world';
import { getElementLocator } from '../../support/web-element-helper';
import { ElementKey, Negate } from '../../env/global';
import { elementChecked } from '../../support/html-behaviour';
import { logger } from '../../logger';

Then(
    /^the "([^"]*)" (?:check box|radio button|switch) should( not)? be checked$/,
    async function(this: ScenarioWorld, elementKey: ElementKey, negate: Negate) {
        const {
            screen: { driver },
            globalConfig
        } = this;

        logger.log(`the ${elementKey} check box|radio button|switch should${negate ? ' not' : ''} be checked`);

        const elementIdentifier = await getElementLocator(driver, elementKey, globalConfig);

        await waitFor( async() => {
            const elementStable = await waitForSelector(driver, elementIdentifier);

            if (elementStable) {
                const isElementChecked = await elementChecked(driver, elementIdentifier);
                return isElementChecked === !negate ? WaitForResult.PASS : WaitForResult.FAIL;
            } else {
                return WaitForResult.ELEMENT_NOT_AVAILABLE;
            }
        },
            globalConfig,
            { target: elementKey,
            failureMessage: `🧨 Expected ${elementKey} to ${negate?'not ':''}be checked 🧨` }
        );
    }
)