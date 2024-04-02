import { clickAcceptOnDialog, clickDismissOnDialog } from '../support/html-behaviour';
import { ScenarioWorld } from './setup/world';
import { When } from '@cucumber/cucumber'

When(
    /^I click (accept)?(dismiss)? on the alert dialog$/,
    async function(this: ScenarioWorld, acceptDialog: boolean, dismissDialog: boolean) {
        const {
            screen: { driver }
        } = this;

        console.log(`I click ${dismissDialog?'dismiss ':'accept '}on the alert dialog`);

        if (dismissDialog) {
            await clickDismissOnDialog(driver);
        } else {
            await clickAcceptOnDialog(driver);
        }
    }
)