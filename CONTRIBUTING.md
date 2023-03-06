# Welcome to Readapt contributing guide

Thank you for your time and interest in contributing to the Readapt project. Any contribution, either creating a bug report or coding is welcome! 

Before continuing, please read our [Contributor Code of Conduct](./CODE_OF_CONDUCT.md) to make our community respectful and welcoming for everyone.  

In this guide, you'll find helpful information on how to create issues, setup your development environment, and understand technology stack used in the Readapt project.  

## 1. Opening an issue

A good way to start contributing to Readapt is to create an issue: a bug report or a feature suggestion.

### 1.1 Issue: bug report

When creating an issue for a bug report, it's advisable to structure the issue into 4 main parts.  

1. *Brief Description*: describe shorty the bug you've encountered;
2. *Actual Behavior*: describe in more detail the buggy behavior. Reproduction steps, photos, and/or videos are welcome;
3. *Expected Behavior*: how the application should work if the bug wasn't present;
3. *Logs*: if you have access, share error logs. For example screenshots of errors in the console;
4. *Environment*: give information about the environment where the application runs: application version, browser name and version, OS name and version, and any other information that you deem relevant.

### 1.2 Issue: feature suggestion

Feature ideas are great because they increase the value of Readapt for its users.  

Please include the following information in a feature suggestion issue:

1. *Description*: describe your idea;
2. *User benefits*: how the user benefits from this feature;
3. *Existing solutions*: if other application has implement the suggested feature, please share that application.

If you are a software developer and you'd like to implement the feature by yourself &mdash; you're welcome! But before jumping into the code, it's highly advisable to create a feature idea first to discuss it with us.  

## 2. Development environment setup

Readapt repository is a [lerna](https://lerna.js.org/)-based monorepo consisting of packages and apps.

Here are the steps you need to perform to setup your environment setup:

1. Have Node.js `v16` installed (tip: [nvm](https://github.com/nvm-sh/nvm) is a good tool to install and manage differente Node.js version);
2. Have `yarn` package manager `v1.22.x` installed:
```bash
npm install -g yarn
```
3. Clone the Readapt repository (or your fork of Readapt repository):
```bash
git clone git@github.com:ContentSquare/readapt.git
```
4. Change the active directory to Readapt project:
```bash
cd ./readapt
```
5. Install the dependencies:
```bash
yarn install
```
6. Build local packages:
```
yarn build-deps
```

Now your development environment is ready.  

After that you can:

7a. Make changes to the Chrome Extension source ([documentation](https://github.com/ContentSquare/readapt/tree/master/apps/chrome-extension#readapt-chrome-extension)):
```bash
cd ./apps/chrome-extension
```
7b. Makes changes to the MS Word Addin source ([documentation](https://github.com/ContentSquare/readapt/tree/master/apps/ms-word-addin#ms-word-add-in)):
```bash
cd ./apps/ms-word-addin
```

## 3. Project structure

Readapt repository is a [lerna](https://lerna.js.org/) [monorepo](https://monorepo.tools/) containing apps and packages.  

* *An app* is a program that can be built and shipped to the user;
* *A package* is a piece of shared code used by an app or other package. 

### Packages

| Name | Description | Depends on |
| --- | --- | --- |
| [@readapt/dictionaries](./packages/dictionaries) | Language-specific dictionaries and data | -
| [@readapt/settings](./packages/settings) | User settings interface | -
| [@readapt/shared-components](./packages/shared-components) | Shared components library | @readapt/settings
| [@readapt/text-engine](./packages/text-engine) | Text Engine | @readapt/dictionaries
| [@readapt/visual-engine](./packages/visual-engine) | Visual Engine | @readapt/text-engine <br> @readapt/settings

### Apps

| Name | Description | Link
|--- | --- | --- |
| [chrome-extension](./apps/chrome-extension) | Chrome web extension | [link](https://chrome.google.com/webstore/detail/readapt/emgfmfgandmhbgleikkoaebngboghfpe)
| [ms-word-addin](./apps/ms-word-addin) | MS Word Add-in | [link](https://appsource.microsoft.com/en-us/product/office/WA200004098)

## 4. The technical stack

Readapt core team has made made a big effort to keep the technical stack of Readapt at the latest versions:

* [Vue 3 with composition API](https://vuejs.org/guide/introduction.html) for the frontend UI
* [Tailwind](https://tailwindcss.com/) and [DaisyUI](https://daisyui.com/) for styling components
* [TypeScript](https://www.typescriptlang.org/) language to use the benefits of typing
* [Vitejs](https://vitejs.dev/) for bundling
* [Vitest](https://vitest.dev/) for unit testing
* [Featured-Sliced Design](https://feature-sliced.design/) methodology is used to design the source code of apps

By contributing to Readapt, you have a wonderful opportunity to work and learn the latest technology stack.  

## 5. Have questions?

Having questions? No problem! We're more than happy to answer them: open an [issue](https://github.com/ContentSquare/readapt/issues/new) or contact us [readapt@contentsquare.com](mailto:readapt@contentsquare.com).