import { waitFor, waitForSelector } from "../support/wait-for-behaviour";
import { Then } from "@cucumber/cucumber";
import { getElementLocator } from "../support/web-element-helper";
import { ScenarioWorld } from "./setup/world";
import { ElementKey, GlobalVariableKey } from "../env/global";
import { getElementText } from "../support/html-behaviour";
import { logger } from "../logger";

Then(
    /^I retrieve the "([^"]*)" text and store it as "([^"]*)" in global variables$/,
    async function(this: ScenarioWorld, elementKey: ElementKey, globalVariableKey: GlobalVariableKey){
        const {
            screen: { driver },
            globalConfig,
            globalVariables
        } = this;

        logger.log(`I retrive the ${elementKey} text and store it as ${globalVariableKey} in global variables`);

        const elementIdentifier = await getElementLocator(driver, elementKey, globalConfig);

        await waitFor(async () => {

            const elementStable = await waitForSelector(driver, elementIdentifier);

            if (elementStable) {
                const elementText = await getElementText(driver, elementIdentifier);
                if (elementText != null) {
                    globalVariables[globalVariableKey] = elementText;
                }
            }

            return elementStable;
        })
    }
)