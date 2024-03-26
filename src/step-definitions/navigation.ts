import { Given } from '@cucumber/cucumber'
import { ScenarioWorld } from './setup/world';
import { PageId } from '../env/global';
import { navigateToPage } from '../support/navigation-behaviour';

Given(
    /^I am on the "([^"]*)" page$/,
    async function(this: ScenarioWorld, pageId: PageId) {
        const { 
            screen: { driver },
            globalConfig
        } = this;

        console.log(`I am on the ${pageId} page`);
        await navigateToPage(driver, pageId, globalConfig);
    }
)