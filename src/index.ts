import dotenv from 'dotenv';
import { env } from './env/parseEnv';

dotenv.config({ path: env('COMMON_CONFIG_FILE')});

const common = './src/features/**/*.feature \
        --require-module ts-node/register \
        --require ./src/step-definitions/**/**/*.ts \
        -f json:./reports/report.json \
        --format progress-bar ';

const dev = `${common} --tags '@dev'`,
      smoke = `${common} --tags '@smoke'`,
      regression = `${common} --tags '@regression'`;

console.log('CUCUMBER IS COMING');

export { dev, smoke, regression }