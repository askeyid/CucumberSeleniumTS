import { Then } from '@cucumber/cucumber'
import { ScenarioWorld } from './setup/world'
import { logger } from '../logger';

Then(
    /^I sleep "([^"]*)" seconds?$/,
    async function(this: ScenarioWorld, waitSeconds: string) {

        const {
            screen: { driver }
        } = this;

        logger.log(`I wait ${waitSeconds} seconds`);

        await driver.sleep(parseInt(waitSeconds, 10) * 1000);
    }
)