# Android Native App — Appium + WebdriverIO Test Suite

Automated test suite for the Android-NativeDemoApp, built with [WebdriverIO](https://webdriver.io/) and [Appium](https://appium.io/). Tests can run either against a local Android emulator or against real devices on [BrowserStack App Automate](https://www.browserstack.com/app-automate).

## Tech Stack

- WebdriverIO v8 (`@wdio/cli`, `@wdio/local-runner`, `@wdio/mocha-framework`, `@wdio/spec-reporter`)
- Appium v3 + UiAutomator2 driver
- Mocha (BDD) test framework
- Page Object Model

## Project Structure

```
├── test/
│   ├── pageObjects/
│   │   ├── base.screen.js        # shared base class: menu access, scroll/swipe/drag helpers
│   │   ├── login.screen.js
│   │   ├── form.screen.js
│   │   ├── drag.screen.js
│   │   ├── swipe.screen.js
│   │   └── components/
│   │       └── menu.screen.js    # shared nav menu, available on every screen
│   └── specs/
│       ├── login.e2e.js
│       ├── form.e2e.js
│       ├── drag.e2e.js
│       └── swipe.e2e.js
├── wdio.conf.cjs                       # local emulator config
├── wdio.browserstack.pixel.conf.cjs    # BrowserStack — Google Pixel 8 Pro
├── wdio.browserstack.samsung.conf.cjs  # BrowserStack — Samsung Galaxy S22 Ultra
├── Android-NativeDemoApp-0.4.0.apk
├── .env                                 # local credentials (not committed)
└── package.json
```

## Prerequisites

- Node.js and npm
- For **local** runs: Android SDK + an emulator created via Android Studio's Virtual Device Manager, with `platform-tools` on your PATH and `ANDROID_HOME`/`ANDROID_SDK_ROOT` set
- For **BrowserStack** runs: a [BrowserStack](https://www.browserstack.com/) account (username + access key)

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Install the Appium UiAutomator2 driver (only needed for local runs):
   ```bash
   npx appium driver install uiautomator2
   ```

3. Create a `.env` file in the project root:
   ```
   BROWSERSTACK_USERNAME=your_username
   BROWSERSTACK_ACCESS_KEY=your_access_key
   BROWSERSTACK_APP_ID=bs://your_uploaded_app_id
   ```

## Uploading the app to BrowserStack

The `.apk` must be uploaded once per BrowserStack account before cloud runs will work:

```bash
curl -u "USERNAME:ACCESS_KEY" -X POST "https://api-cloud.browserstack.com/app-automate/upload" -F "file=@Android-NativeDemoApp-0.4.0.apk" -F "custom_id=native_demo_app"
```

Copy the returned `app_url` (`bs://...`) into `BROWSERSTACK_APP_ID` in `.env`.

## Running the tests

**Locally, against an emulator** (start the emulator first via Android Studio's Device Manager):
```bash
npm run wdio:local
```

**On BrowserStack, Pixel 8 Pro / Android 14:**
```bash
npm run wdio:pixel
```

**On BrowserStack, Samsung Galaxy S22 Ultra / Android 12:**
```bash
npm run wdio:samsung
```

## Finding locators

Locators were identified using [Appium Inspector](https://github.com/appium/appium-inspector/releases), connected either to a local Appium server or to a BrowserStack cloud session, using the app's uploaded `bs://` id and BrowserStack credentials.

## Test cases

| Spec | Covers |
|---|---|
| `login.e2e.js` | Navigating to the login form and validating the invalid-email error message |
| `form.e2e.js` | Text input, switch toggle, dropdown selection, and a native alert dialog |
| `drag.e2e.js` | Drag-and-drop of a draggable element onto a drop target |
| `swipe.e2e.js` | Vertical scroll and horizontal swipe through screens where target elements are not rendered until scrolled/swiped into view |

## Notable implementation details

- **`base.screen.js`** exposes reusable `scrollUntilVisible()` / `swipeUntilVisible()` helpers that repeatedly perform a gesture and re-check for the target element, since off-screen elements in lazily-rendered lists don't exist in the accessibility tree until scrolled into view — a plain `scrollIntoView()` can't target something that isn't there yet.
- **Drag and drop** uses `mobile: dragGesture` (rather than WebdriverIO's built-in `dragAndDrop()` or raw W3C `performActions`) for more reliable, precisely-targeted behavior across both local and BrowserStack real devices.
- **`beforeTest`** in each config resets app state before every test (via `mobile: terminateApp` + `mobile: activateApp`) so tests don't leak state (e.g. scroll position) into one another.

## CI/CD

A GitHub Actions workflow runs the BrowserStack suite on push, using `BROWSERSTACK_USERNAME` and `BROWSERSTACK_ACCESS_KEY` stored as [GitHub encrypted secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets) rather than committed credentials.
