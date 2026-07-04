module.exports = {
  default: {
    paths: ['features/**/*.feature'],
    require: ['src/utils/world.ts', 'src/hooks/*.ts', 'src/steps/**/*.ts'],
    requireModule: ['ts-node/register'],
    format: [
      'progress-bar',
      'json:reports/cucumber-report.json',
    ],
    formatOptions: { snippetInterface: 'async-await' },
    publish: true,
  },
};
