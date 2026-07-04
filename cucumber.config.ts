import { IConfiguration } from '@cucumber/cucumber/api';

const config: Partial<IConfiguration> = {
  paths: ['features/**/*.feature'],
  require: ['src/hooks/*.ts', 'src/steps/**/*.ts'],
  requireModule: ['ts-node/register'],
  format: [
    'progress-bar',
    '@cucumber/pretty-formatter',
    'json:reports/cucumber-report.json',
    'html:reports/cucumber-report.html',
  ],
  formatOptions: { snippetInterface: 'async-await' },
  publishQuiet: true,
};

export default config;
