import { Then } from '@cucumber/cucumber'
import { ScenarioWorld } from './setup/world'
import { logger } from '../logger';
import { browserSleep } from '../support/html-behaviour';

Then(
    /^I sleep "([^"]*)" seconds?$/,
    async function(this: ScenarioWorld, waitSeconds: string) {

        const {
            screen: { driver }
        } = this;

        logger.log(`I wait ${waitSeconds} seconds`);

        await browserSleep(driver, waitSeconds);
    }
)