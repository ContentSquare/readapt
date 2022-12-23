# Readapt

[![readapt ci](https://github.com/ContentSquare/readapt/actions/workflows/main.yaml/badge.svg)](https://github.com/ContentSquare/readapt/actions/workflows/main.yaml)

## Introduction

Created by [Contentsquare Foundation](https://contentsquare-foundation.org/), Readapt is a software platform that aims
to help those with reading challenges like dyslexia to more easily read digital text.
Experts estimate anywhere between 10-15% of the world’s population is dyslexic.
Readers with such challenges, especially children, can find it extremely difficult to excel in school because they spend
more time trying to read which delays their comprehension of what they read. Their non-dyslexic classmates, on the other
hand, learn much faster because they don’t need to spend as much time reading.

Children and students with dyslexia can often face emotional and psychological issues due to their slower learning. This
can be the case leading into their adulthood. But dyslexia is not a question of intelligence. Some of the most
intelligent and creative people in our modern time and in history who have made large contributions to society are or
were dyslexic. Leonardo Da Vinci, Albert Einstein, Walt Disney, Whoopi Goldberg, and Steven Spielberg just to name a
few. Dyslexic people just process things differently, and Readapt can help with that.

## How Readapt helps
Reading challenges can be very different across dyslexic people. Readapt uses techniques known to help with specific
challenges. Since every reader could have their unique challenges, users can configure their reading preferences to
accommodate their very specific needs.

| Challenge | Technique/feature |
| --- | --- |
| Visual discomfort / fatigue | Reading tools (screen mask, reading ruler), distinguishing lines |
| Mixing letters from other lines | Reading tools (screen mask, reading ruler), distinguishing lines |
| Losing their place after finishing a line | Reading ruler, distinguishing lines |
| Difficulty breaking down words into sounds|Syllable breakdown, colouring phonemes|
| Distinguishing similar sounding phonemes (e.g. the sound “g” and “k” are very similar and some can confuse these) | Colouring phonemes |
|Mixing up letters|Font, font size, spacing between letters, words and lines of text|
|Difficulty with “sight” words (words that are pronounced different from how they are spelled. For example we do not pronounce the “gh” in “night”.)|Mark silent letters, show liaisons (French only)|
|Confusing letters that look similar (b with d, p with q etc.)|Colouring specific letters|

# Structure

This is a monorepo which contains many apps and packages:

## Packages

| Name | Description | Depends on |
| --- | --- | --- |
| [@readapt/dictionaries](./packages/dictionaries) | Available dictionaries | -
| [@readapt/settings](./packages/settings) | User settings interface | -
| [@readapt/shared-components](./packages/shared-components) | Shared components library | @readapt/settings
| [@readapt/text-engine](./packages/text-engine) | Text Engine | @readapt/dictionaries
| [@readapt/visual-engine](./packages/visual-engine) | Visual Engine | @readapt/text-engine <br> @readapt/settings

## Apps

| Name | Description | Link
|--- | --- | --- |
| [chrome-extension](./apps/chrome-extension) | Chrome web extension | [link](https://chrome.google.com/webstore/detail/readapt/emgfmfgandmhbgleikkoaebngboghfpe)
| [ms-word-addin](./apps/ms-word-addin) | MS Word Add-in | [link](https://appsource.microsoft.com/en-us/product/office/WA200004098)

# Development Setup

### Prerequisites

 - node.js 16 (strict)
 - npm 8+

### Technologies

- **Yarn** and **Lerna** monorepo
- **TypeScript** source code
- **Vue.js** frontend framework for the apps
- **jest** unit test
- **parcel** and **rollup** build packages

## First setup

1. Git clone this repo
2. Run `yarn`
3. Build `@readapt` dependencies running `yarn build-deps`

### Build an app

Run `yarn build-chrome-extension` to build Chrome extension

or `yarn build-ms-word-addin` to build MS Word add-in plugin

### Lint

Fix eslint running script `yarn lint --fix`

### Clean workspace

To clean all packages and return to a fresh state run `yarn workspaces run clean`.

### How to release

1. Build the tag and packages using `Release a new version/tag` action workflow with a version number. This workflow will :
    - build and add a new tag
    - create a Github release
    - publish packages to npm
2. Publish new Chrome extension release in Chrome Web Store
3. Create another PR to merge master into `ms-word-addin` to update the ms-word addin

## Contributors

[Contentsquare Foundation](https://contentsquare-foundation.org/)

- [Elias Boukamza](https://github.com/eboukamza)
- [Farouk Osmani](https://github.com/farouk-osmani-cs)
- [Ahmed Radjdi](https://github.com/aradjdi)
- [Sylvain Zimmer](https://github.com/sylvinus)
- [Taze Young](https://github.com/TazeYoung)

## License

All code and dictionaries are published under [Apache License, Version 2.0](https://choosealicense.com/licenses/apache-2.0/), except for the French dictionary which is published under [Creative Commons BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).
