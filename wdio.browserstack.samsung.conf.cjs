require('dotenv').config();

exports.config = {
  user: process.env.BROWSERSTACK_USERNAME,
  key: process.env.BROWSERSTACK_ACCESS_KEY,

  updateJob: false,
  maxInstances: 1,
  specs: [
    './test/specs/**.e2e.js'
  ],
  exclude: [],

  protocol: 'https',
  hostname: 'hub-cloud.browserstack.com',
  path: '/wd/hub',
  port: 443,

  capabilities: [{
    platformName: 'Android',
    'appium:deviceName': 'Samsung Galaxy S21',
    'appium:platformVersion': '12.0',
    'appium:automationName': 'UiAutomator2',
    'appium:app': process.env.BROWSERSTACK_APP_ID,
    'bstack:options': {
      projectName: 'test task 8',
      buildName: 'build-galaxy-s21',
      sessionName: 'Galaxy S21  run',
    },
  }],

  logLevel: 'warn',
  coloredLogs: true,
  screenshotPath: './errorShots/',
  baseUrl: '',
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,

  framework: 'mocha',
  reporters: ['spec'],
  mochaOpts: {
    ui: 'bdd',
    timeout: 20000
  }
};