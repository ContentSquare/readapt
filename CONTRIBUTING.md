# Welcome to Readapt contributing guide

Thank you for your time and interest in contributing to the Readapt project. Any contrubution, either creating a bug report or coding is welcome! 

Before continuing, please read our [Contributor Code of Conduct](./CODE_OF_CONDUCT.md) to make our community respectful and welcoming for everyone.  

In this guide you'll find helpful information on how to create issues, pull requests, and understand the coding practices used in the Readapt project.  

## 1. Opening an issue

A good way to start contributing to Readapt is to create an issue: create a bug report and suggest an idea.

### 1.1 Issue: bug report

When creating an issue for a bug report, it's advisable to structure the issue from 4 main parts.  

1. *Brief description*: describe shorty the bug you've encountered;
2. *Actual behavior*: describe in more detail the buggy behavior. Bug reproduction steps, photos and/or videos of the are welcome;
3. *Expected behavior*: how the application should work if the bug wasn't present;
3. *Logs*: if you have access to application logs (e.g. any errors in the console);
4. *Running environment*: give information about the environment where the application runs: application version, browser name and version, OS name and version, and any other information that you seem relevent.

### 1.2 Issue: new feature idea

Feature ideas are great because they make Readapt more useful for the users.  

Please include the following information in a feature idea issue:

1. *Brief description*: describe shortly your idea;
2. *User benefits*: how the user benefits from this feature;
3. *Existing solutions*: please share other applications that have the new feature idea already implemented.

If you are a software developer and you'd like to implement the feature by yourself: you're welcome! But before jumping into the code, it's highly advisable to create an feature idea first to discuss it with us.  

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
4. Change active directory to Readapt project:
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

7a. Make changes to the Chrome Extension source and consult its [documentation](https://github.com/ContentSquare/readapt/tree/master/apps/chrome-extension#readapt-chrome-extension):
```bash
cd ./apps/chrome-extension
```
7b. Makes changes to the MS Word Addin source and consult its [documentation](https://github.com/ContentSquare/readapt/tree/master/apps/ms-word-addin#ms-word-add-in):
```bash
cd ./apps/ms-word-addin
```

### 3. The technical stack

Readapt core team has made made a big effort to keep the technical stack of Readapt with the latest technologies:

* [Vue 3 with composition API](https://vuejs.org/guide/introduction.html) for the frontend UI
* [Vitejs](https://vitejs.dev/) for bundling
* [Vitest](https://vitest.dev/) for unit testing
* [Tailwind](https://tailwindcss.com/) and [DaisyUI](https://daisyui.com/) for styling components

By contributing to Readapt, you have a wonderful opportunity to work with the latest technical stack.  

### 4. Still have questions?

Still having questions? No problem! We're more than happy to answer them: open an [issue](https://github.com/ContentSquare/readapt/issues/new) or contact us [readapt@contentsquare.com](mailto:readapt@contentsquare.com).