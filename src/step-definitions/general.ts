import { Then } from '@cucumber/cucumber'
import { ScenarioWorld } from './setup/world'

Then(
    /^I sleep "([^"]*)" seconds?$/,
    async function(this: ScenarioWorld, waitSeconds: string) {

        const {
            screen: { driver }
        } = this;

        console.log(`I wait ${waitSeconds} seconds`);

        await driver.sleep(parseInt(waitSeconds, 10) * 1000);
    }
)