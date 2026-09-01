exports.config = {
  
    updateJob: false,
    maxInstances: 1,
    specs: [
      './test/specs/**.e2e.js'
    ],
    exclude: [],
  
      services: ['appium'], 
      port: 4723,
      path: '/',
      capabilities: [{
      maxInstances: 1,
      platformName: 'Android',
      'appium:deviceName': 'emulator-5554',
      'appium:automationName': 'UiAutomator2',
      'appium:app': 'D:/testProject/task_8_mobile/browserstack_test/Android-NativeDemoApp-0.4.0.apk',
      'appium:appWaitActivity': 'com.wdiodemoapp.MainActivity',
      'appium:appWaitDuration': 30000,
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