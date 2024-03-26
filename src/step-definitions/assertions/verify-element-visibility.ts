import { Then } from '@cucumber/cucumber'
import { expect } from 'chai'
import { By } from 'selenium-webdriver'
import { ScenarioWorld } from '../setup/world';

Then(
    /^the "(.*)" should contain the text "([^"]*)"$/,
    async function(this: ScenarioWorld, elementKey: string, expectedElementText: string) {
        const {
            screen: { driver }
        } = this;

        console.log(`the ${elementKey} should contain the text ${expectedElementText}`);
        const element = await driver.findElement(By.css(elementKey));        
        const elementText = await element.getAttribute('innerText');
        expect(elementText).to.contain(expectedElementText);
    }
);

Then(
    /^the "([^"]*)" should be displayed$/,
    async function (this: ScenarioWorld, elementSelector: string) {
        const {
            screen: { driver }
        } = this;

        console.log(`\the ${elementSelector} should be displayed`);
        const element = await driver.findElement(By.css(`${elementSelector}`));
        expect(await element.isDisplayed()).to.be.true;
    }
);
