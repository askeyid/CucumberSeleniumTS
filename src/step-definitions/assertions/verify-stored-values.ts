import { Then } from '@cucumber/cucumber'
import { ScenarioWorld } from '../setup/world';
import { ElementKey, GlobalVariableKey, Negate } from '../../env/global';
import { getElementLocator } from '../../support/web-element-helper';
import { WaitForResult, waitFor, waitForSelector } from '../../support/wait-for-behaviour';
import { getElementText } from '../../support/html-behaviour';
import { logger } from '../../logger';

Then(
    /^the "([^"]*)" should( not)? equal the "([^"]*)" stored in global variables$/,
    async function(this: ScenarioWorld, elementKey: ElementKey, negate: Negate, globalVariableKey: GlobalVariableKey) {
        const {
            screen: { driver },
            globalConfig,
            globalVariables
        } = this;

        logger.log(`the ${elementKey} should ${negate?'not ':''}equal the ${this.globalVariables[globalVariableKey]} stored in global variables`);

        const elementIdentifier = await getElementLocator(driver, elementKey, globalConfig);

        await waitFor(async () => {
            const elementStable = await waitForSelector(driver, elementIdentifier);
            const variableText = globalVariables[globalVariableKey];

            if (elementStable) {
                const elementText = await getElementText(driver, elementIdentifier);
                return (elementText === variableText === !negate) ? WaitForResult.PASS : WaitForResult.FAIL;

            } else {
                return WaitForResult.ELEMENT_NOT_AVAILABLE;
            }
        },
            globalConfig,
            { target: elementKey,
            failureMessage: `🧨 Expected ${elementKey} to ${negate?'not ':''}equal the ${this.globalVariables[globalVariableKey]} stored in global variables 🧨` }
        );
    }
)

Then(
    /^the "([^"]*)" should( not)? contain the "([^"]*)" stored in global variables$/,
    async function(this: ScenarioWorld, elementKey: ElementKey, negate: Negate, globalVariableKey: GlobalVariableKey) {
        const {
            screen: { driver },
            globalConfig,
            globalVariables
        } = this;

        logger.log(`the ${elementKey} should ${negate?'not ':''}contain the ${this.globalVariables[globalVariableKey]} stored in global variables`);

        const elementIdentifier = await getElementLocator(driver, elementKey, globalConfig);

        await waitFor(async () => {
            const elementStable = await waitForSelector(driver, elementIdentifier);
            const variableText = globalVariables[globalVariableKey];

            if (elementStable) {
                const elementText = await getElementText(driver, elementIdentifier);
                return (elementText?.includes(variableText) === !negate) ? WaitForResult.PASS : WaitForResult.FAIL;
            } else {
                return WaitForResult.ELEMENT_NOT_AVAILABLE;
            }
        },
            globalConfig,
            { target: elementKey,
            failureMessage: `🧨 Expected ${elementKey} to ${negate?'not ':''}contain the ${this.globalVariables[globalVariableKey]} stored in global variables 🧨` }
        );
    }
)