import { Before, After } from "@cucumber/cucumber"
import * as fs from "fs"
import { ScenarioWorld } from "./world";
import { env } from "../../env/parseEnv";


Before(
    async function(this: ScenarioWorld, scenario) {
        console.log(`Running cucumber scenario ${scenario.pickle.name}`)

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
                    fs.writeFileSync(`${env('SCREENSHOT_PATH')}${scenario.pickle.name}.png`, image, 'base64');
                }
            )
        }

        await driver.quit();
    }
);
