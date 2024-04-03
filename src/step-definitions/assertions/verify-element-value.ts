import { Then } from '@cucumber/cucumber'
import { ScenarioWorld } from '../setup/world';
import { ElementKey, ElementPosition, ExpectedElementText, ExpectedElementValue, Negate } from '../../env/global';
import { getElementLocator } from '../../support/web-element-helper';
import { waitFor, waitForSelector } from '../../support/wait-for-behaviour';
import { getAttributeText, getElementText, getElementTextAtIndex, getElementValue } from '../../support/html-behaviour';
import { parseInput } from '../../support/input-helper';

Then(
    /^the "([^"]*)" should( not)? contain the text "(.*)"$/,
    async function(this: ScenarioWorld, elementKey: ElementKey, negate: Negate, expectedElementText: ExpectedElementText) {
        const {
            screen: { driver },
            globalConfig
        } = this;

        console.log(`the ${elementKey} should${negate ? ' not' : ''} contain the text ${expectedElementText}`);

        const elementIdentifier = await getElementLocator(driver, elementKey, globalConfig);

        await waitFor(async() => {

            const elementStable = await waitForSelector(driver, elementIdentifier);

            if (elementStable) {
                const elementText = await getElementText(driver, elementIdentifier);
                return elementText?.includes(expectedElementText) === !negate;    
            }

            return elementStable;
        });
    }
);

Then(
    /^the "([^"]*)" should( not)? equal the text "(.*)"$/,
    async function(this: ScenarioWorld, elementKey: ElementKey,  negate: Negate, expectedElementText: ExpectedElementText) {
        const {
            screen: { driver },
            globalConfig
        } = this;

        console.log(`the ${elementKey} should${negate ? ' not' : ''} equal the text ${expectedElementText}`);

        const elementIdentifier = await getElementLocator(driver, elementKey, globalConfig);

        await waitFor(async() => {

            const elementStable = await waitForSelector(driver, elementIdentifier);

            if (elementStable) {
                const elementText = await getElementText(driver, elementIdentifier);
                return elementText === expectedElementText === !negate;
            }

            return elementStable;
        });
    }
);

Then(
    /^the "([^"]*)" should( not)? contain the value "(.*)"$/,
    async function(this: ScenarioWorld, elementKey: ElementKey, negate: Negate, expectedElementValue: ExpectedElementValue) {
        const {
            screen: { driver },
            globalConfig
        } = this;
        
        const parsedInput = parseInput(expectedElementValue, globalConfig);
        console.log(`the ${elementKey} should${negate ? ' not' : ''} contain the value ${parsedInput}`);

        const elementIdentifier = await getElementLocator(driver, elementKey, globalConfig);

        await waitFor(async() => {

            const elementStable = await waitForSelector(driver, elementIdentifier);

            if (elementStable) {
                const elementValue = await getElementValue(driver, elementIdentifier);
                return elementValue?.includes(parsedInput) === !negate;
            }

            return elementStable;
        });
    }
)

Then(
    /^the "([^"]*)" should( not)? equal the value "(.*)"$/,
    async function(this: ScenarioWorld, elementKey: ElementKey, negate: Negate, expectedElementValue: ExpectedElementValue) {
        const {
            screen: { driver },
            globalConfig
        } = this;
        
        console.log(`the ${elementKey} should${negate ? ' not' : ''} contain the value ${expectedElementValue}`);

        const elementIdentifier = await getElementLocator(driver, elementKey, globalConfig);

        await waitFor(async() => {

            const elementStable = await waitForSelector(driver, elementIdentifier);

            if (elementStable) {
                const elementValue = await getElementValue(driver, elementIdentifier);
                return (elementValue === expectedElementValue) === !negate;
            }

            return elementStable;
        });
    }
)

Then(
    /^the ([0-9]+(?:st|nd|rd|th)) "([^"]*)" should( not)? contain the text "(.*)"$/,
    async function(this: ScenarioWorld, elementPosition: ElementPosition, elementKey: ElementKey, negate: Negate, expectedElementText: ExpectedElementText) {
        const {
            screen: { driver },
            globalConfig
        } = this;

        console.log(`the ${elementPosition} ${elementKey} should${negate ? ' not' : ''} contain the text ${expectedElementText}`);
    
        const elementIdentifier = await getElementLocator(driver, elementKey, globalConfig);

        const elementIndex = Number(elementPosition.match(/\d/g)?.join('')) - 1;

        await waitFor(async () => {

            const elementStable = await waitForSelector(driver, elementIdentifier);

            if (elementStable) {
                const elementText = await getElementTextAtIndex(driver, elementIdentifier, elementIndex);
                return elementText?.includes(expectedElementText) === !negate;
            }

            return elementStable;
        });
    }
)

Then(
    /^the "([^"]*)" "([^"]*)" attribute should( not)? contain the text "(.*)"$/,
    async function(this: ScenarioWorld, elementKey: ElementKey, attribute: string, negate: Negate, expectedElementText: ExpectedElementText) {
        const {
            screen: { driver },
            globalConfig
        } = this;

        console.log(`the ${elementKey} ${attribute} attribute should ${negate?'not ':''}contain the text ${expectedElementText}`);

        const elementIdentifier = await getElementLocator(driver, elementKey, globalConfig);

        await waitFor( async () => {

            const elementStable = await waitForSelector(driver, elementIdentifier);

            if (elementStable) {
                const attributeText = await getAttributeText(driver, elementIdentifier, attribute);
                return attributeText?.includes(expectedElementText) === !negate;
            }

            return elementStable;
        })
    }
)