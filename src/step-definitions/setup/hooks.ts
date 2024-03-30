import { Before, After, setDefaultTimeout, AfterAll } from "@cucumber/cucumber"
import * as fs from "fs"
import { ScenarioWorld } from "./world";
import { env, envNumber } from "../../env/parseEnv";
import { execSync } from 'child_process';
import { wait } from "../../support/wait-for-behaviour";

setDefaultTimeout(envNumber('SCRIPT_TIMEOUT'));

Before(
    async function(this: ScenarioWorld, scenario) {
        console.log(`\nRunning scenario: "${scenario.pickle.name}"`)

        const ready = await this.init();

        return ready;
    }
);

After(
    async function(this: ScenarioWorld, scenario) {
        const {
            screen: { driver }
        } = this;

        const scenarioStatus = scenario.result?.status;
        
        if (scenarioStatus === 'FAILED') {
            driver.takeScreenshot().then(
                (image) => {
                    this.attach(Buffer.from(image, 'base64'), 'image/png');
                    fs.mkdirSync(env('SCREENSHOT_PATH'));
                    fs.writeFileSync(`${env('SCREENSHOT_PATH')}${scenario.pickle.name}.png`, image, 'base64');
                }
            )
        }
        await driver.quit();
    }
);

AfterAll(killBrowsersProcesses);

function killBrowsersProcesses(): void {
    const browser = env('UI_AUTOMATION_BROWSER');

    let process: string;

    switch (browser) {
        case 'chrome':
            process = 'chromedriver';
            break;
        case 'firefox':
            process = 'geckodriver';
            break;
        default:
            throw Error('not implemented');                
    }

    try {
        const tasklist = execSync('tasklist').toString();
        const regex = new RegExp(`${process}\\..*`, 'g');
        const matches = tasklist.match(regex);

        if (matches && matches.length > 0) {
            const stdout = execSync(`taskkill /f /im ${process}*`);
            console.log(`\nKilling ${process} processes:\n${stdout}`);
        }
    } catch (error) {
        console.error(`\nError: ${(error as Error).message}`)
    }
}
