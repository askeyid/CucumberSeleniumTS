import { Builder, WebDriver } from 'selenium-webdriver'
import { World, IWorldOptions, setWorldConstructor } from '@cucumber/cucumber'
import { Options as FirefoxOptions } from 'selenium-webdriver/firefox'
import { Options as ChromeOptions } from 'selenium-webdriver/chrome'
import { env, envNumber } from '../../env/parseEnv'
import { GlobalConfig, GlobalVariables } from '../../env/global'
import { stringIsOfOptions } from '../../support/option-helper'
import { logger } from '../../logger'

export type Screen = {
    driver: WebDriver
}

export class ScenarioWorld extends World {
    constructor(options: IWorldOptions) {
        super(options);

        this.globalConfig = options.parameters as GlobalConfig;

        this.globalVariables = {}
    }

    globalConfig: GlobalConfig;

    globalVariables: GlobalVariables;
    
    screen!: Screen;

    async init(): Promise<Screen> {
        const browser = await this.newBrowser();
        const browserBuilder = await this.browserBuilder(browser);
        const driver = browserBuilder.build();
        const browserDimensions = await this.browserDimensions();
        
        if(Number.isNaN(browserDimensions.height) || Number.isNaN(browserDimensions.width)) {
            await driver.manage().window().maximize();
        } else {
            await driver.manage().window().setRect(browserDimensions);
        }

        this.screen = { driver }
        
        return this.screen;
    }

    private browserDimensions = async (): Promise<{ width: number; height: number }> => {
        return {
            width: envNumber('BROWSER_WIDTH'),
            height: envNumber("BROWSER_HEIGHT")
        }
    }

    private newBrowser = async(): Promise<string> => {
        const automationBrowser = env('UI_AUTOMATION_BROWSER')
        const automationBrowsers = ['chrome', 'firefox']
        const validAutomationBrowser = stringIsOfOptions(automationBrowser, automationBrowsers);
        return validAutomationBrowser;
    }

    private browserBuilder = async(browser: string): Promise<Builder> => {
        logger.log(`Executing on ${browser} browser`);

        let builder: Builder;
        
        if (env('SELENIUM_GRID_ENABLED') === 'true') {
            builder = new Builder().usingServer((env('SELENIUM_GRID_URL')));
        } else {
            builder = new Builder();
        }

        switch(browser) {
            case 'chrome': {
                const chromeOptions = new ChromeOptions();
                chromeOptions.addArguments(env('CHROME_BROWSER_ARGUMENTS'));
                return builder.forBrowser(browser).withCapabilities(chromeOptions);
            }
            case 'firefox': {
                const firefoxOptions = new FirefoxOptions();
                firefoxOptions.addArguments(env('FIREFOX_BROWSER_ARGUMENTS'));
                firefoxOptions.set('acceptInsecureCerts', true);
                return builder.forBrowser(browser).setFirefoxOptions(firefoxOptions);
            }
            default: {
                return builder.forBrowser(browser);
            }
        }
    }
}

setWorldConstructor(ScenarioWorld);