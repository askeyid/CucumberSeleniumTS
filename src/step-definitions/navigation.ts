import { Given, Then } from '@cucumber/cucumber'
import { ScenarioWorld } from './setup/world';
import { PageId } from '../env/global';
import { currentPathMatchesPageId } from '../support/navigation-behaviour';
import { navigateToPage } from '../support/navigation-behaviour';
import { waitFor } from '../support/wait-for-behaviour';

Given(
    /^I navigate to the "([^"]*)" page$/,
    async function(this: ScenarioWorld, pageId: PageId) {
        const { 
            screen: { driver },
            globalConfig
        } = this;

        console.log(`I navigate to the ${pageId} page`);

        await navigateToPage(driver, pageId, globalConfig);

        await waitFor(() => currentPathMatchesPageId(driver, pageId, globalConfig));
    }
)

Then(
    /^I am directed to the "([^"]*)" page$/,
    async function(this: ScenarioWorld, pageId: PageId) {
        const {
            screen: { driver },
            globalConfig
        } = this;

        console.log(`I am directed to the ${pageId} page`);

        await waitFor(() => currentPathMatchesPageId(driver, pageId, globalConfig));
    }
)