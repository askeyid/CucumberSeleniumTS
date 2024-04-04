import { Then, DataTable } from '@cucumber/cucumber'
import { ScenarioWorld } from '../setup/world';
import { ElementKey, Negate } from '../../env/global';
import { getElementLocator } from '../../support/web-element-helper';
import { waitFor, waitForSelector } from '../../support/wait-for-behaviour';
import { getTableData } from '../../support/html-behaviour';
import { logger } from '../../logger';

Then(
    /^the "([^"]*)" table should( not)? equal the following:$/,
    async function(this: ScenarioWorld, elementKey: ElementKey, negate: Negate, dataTable: DataTable) {
        const {
            screen: { driver },
            globalConfig
        } = this;

        logger.log(`the ${elementKey} table should ${negate?'not':''}equal the following:`);

        const elementIdentifier = await getElementLocator(driver, elementKey, globalConfig);

        await waitFor(async() => {
            const elementStable = await waitForSelector(driver, elementIdentifier);

            if (elementStable) {
                const tableData = await getTableData(driver, elementIdentifier);
                return tableData === dataTable.raw().toString() === !negate;
            }
        });
    }
)