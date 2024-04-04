import { When } from '@cucumber/cucumber';
import { ScenarioWorld } from './setup/world';
import { clickElement } from '../support/html-behaviour';
import { waitFor, waitForSelector } from '../support/wait-for-behaviour';
import { getElementLocator } from '../support/web-element-helper';
import { ElementKey } from '../env/global';
import { logger } from '../logger';

When(
    /^I (check)?(uncheck)? the "([^"]*)" (?:check box|radio button|switch)$/,
    async function (this: ScenarioWorld, checked: boolean, uncheck: boolean, elementKey: ElementKey) {
        const {
            screen: { driver },
            globalConfig
        } = this;

        logger.log(`I ${uncheck?'uncheck':'check'} the ${elementKey} check box|radio button|switch`);

        const elementIdentifier = await getElementLocator(driver, elementKey, globalConfig);

        await waitFor(async () => {
            const elementStable = await waitForSelector(driver, elementIdentifier);

            if (elementStable) {
                await clickElement(driver, elementIdentifier);
            }

            return elementStable;
        },
            globalConfig,
            { target: elementKey }
        );
    }
)