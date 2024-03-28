import dotenv from 'dotenv';
import { env, getJsonFromFile } from './env/parseEnv';
import { GlobalConfig, HostsConfig, PageElementMapping, PagesConfig } from './env/global';
import * as fs from "fs"

dotenv.config({ path: env('COMMON_CONFIG_FILE')});

const hostsConfig: HostsConfig = getJsonFromFile(env('HOSTS_URLS_PATH'));
console.log('HOSTs CONFIG: ', hostsConfig);
const pagesConfig: PagesConfig = getJsonFromFile(env('PAGES_URLS_PATH'));
console.log('PAGEs CONFIG: ', pagesConfig);
const mappingFiles = fs.readdirSync(`${process.cwd()}${env('PAGE_ELEMENTS_PATH')}`);


const pageElementMappings: PageElementMapping = mappingFiles.reduce(
        (pageElementConfigAcc, file) => {
                const key = file.replace('.json', '');
                const elementMappings = getJsonFromFile(`${env('PAGE_ELEMENTS_PATH')}${file}`);
                return { ...pageElementConfigAcc, [key]: elementMappings}                
        },
        {}
);

console.log('PAGE ELEMENT MAPPINGS: ', pageElementMappings);

const worldParameters: GlobalConfig = {
        hostsConfig,
        pagesConfig,
        pageElementMappings
}

// console.log('OBJ WORLD PARAMS:\n', worldParameters);

const common = `./src/features/**/*.feature \
        --require-module ts-node/register \
        --require ./src/step-definitions/**/**/*.ts \
        -f json:./reports/report.json \
        --world-parameters ${JSON.stringify(worldParameters)} \
        /*--format progress-bar*/ `;

const dev = `${common} --tags '@dev'`,
      smoke = `${common} --tags '@smoke'`,
      regression = `${common} --tags '@regression'`;

console.log('🥒🥒🥒🥒 CUCUMBER IS COMING 🥒🥒🥒🥒');

export { dev, smoke, regression }