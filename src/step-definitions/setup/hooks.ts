import { Before, After, setDefaultTimeout } from "@cucumber/cucumber"
import * as fs from "fs"
import { ScenarioWorld } from "./world";
import { env, envNumber } from "../../env/parseEnv";

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
                    
                    const screenshotFolderPath = env('SCREENSHOT_PATH');

                    if (!fs.existsSync(screenshotFolderPath)) {
                        fs.mkdirSync(screenshotFolderPath);
                    }

                    fs.writeFileSync(`${env('SCREENSHOT_PATH')}${scenario.pickle.name}${new Date().toISOString().replace(/[:.]/g, '-')}.png`, image, 'base64');
                }
            )
        }

        await driver.quit();
    }
);

// taskkill /f /im chromedriver*