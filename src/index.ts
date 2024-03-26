import dotenv from 'dotenv';
import { env, getJsonFromFile } from './env/parseEnv';
import { GlobalConfig, HostsConfig, PagesConfig } from './env/global';

dotenv.config({ path: env('COMMON_CONFIG_FILE')});

const hostsConfig: HostsConfig = getJsonFromFile(env('HOSTS_URLS_PATH'));
const pagesConfig: PagesConfig = getJsonFromFile(env('PAGES_URLS_PATH'));

const worldParameters: GlobalConfig = {
        hostsConfig,
        pagesConfig
}

const common = `./src/features/**/*.feature \
        --require-module ts-node/register \
        --require ./src/step-definitions/**/**/*.ts \
        -f json:./reports/report.json \
        --world-parameters ${JSON.stringify(worldParameters)} \
        --format progress-bar `;

const dev = `${common} --tags '@dev'`,
      smoke = `${common} --tags '@smoke'`,
      regression = `${common} --tags '@regression'`;

console.log('🥒🥒🥒🥒 CUCUMBER IS COMING 🥒🥒🥒🥒');

export { dev, smoke, regression }