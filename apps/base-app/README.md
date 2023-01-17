# Readapt Chrome extension

## Introduction

Created by [Contentsquare Foundation](https://contentsquare-foundation.org/), Readapt is a software platform that aims to help those with reading challenges like dyslexia to more easily read digital text. The [Chrome extension](https://chrome.google.com/webstore/detail/readapt/emgfmfgandmhbgleikkoaebngboghfpe) version of Readapt allows users to set their reading preferences and adapt text on websites. It also provides reading tools like a screen mask and reading ruler.

This Chrome extension is compatible with many Chromium-based browsers like Google Chrome and Microsoft Edge (web view 2). It is available in English and French.

## How the Readapt Chrome extension works
After installing the extension, you can click on the extension to either create your profile from scratch or select from one of our reading templates. After saving your preferences, you can start to adapt text on websites by holding the control (Windows) or command ⌘ key (Mac) and left-clicking on your target text. To remove the text adaptation, you can either click on the extension and click on "Reset text on page", or right-click on the webpage and select "Readapt > Reset all text".

The reading tools (screen mask and reading ruler) can be activated on a webpage by webpage basis by right-clicking on the webpage and selecting "Readapt > Activate mask" or "Activate ruler". To deactivate these tools, hit ESCAPE. To modify the thickness and opacity of these tools, click on the extension and use the sliders.

## Project setup

```
yarn install
```

### Setup env var

After install an `.env` file will be generated, please fill missing values

### Compiles and hot-reloads for development
```
yarn dev
```

### Run your unit tests
```
yarn test:unit
```

### Lints and fixes files
```
yarn lint
```

## Build a release
Please ensure all @readapt dependencies are been built before build a release

```bash
yarn build
```

Run to generate a zip file inside the /dist directory

```bash
yarn package
```

## Install extension in development mode

After build, you can load an unpacked version in your browser following this instructions

https://developer.chrome.com/docs/extensions/mv3/getstarted/#unpacked

and selecting `dist/` directory

## Autobuild of a release

When creating a pull request, the CI build job creates automatically a release zip file of the extension. To access the release zip file:

1. On the Pull Request page click the "Checks" tab
2. On the "Checks" tab click "Readapt CI" from the left sidebar
3. On the "Readapt CI" page scroll to the bottom to the "Artifacts" section and click "Chrome Extension" to download.
