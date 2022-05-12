# MS Word Add-In

## Introduction

Created by [Contentsquare Foundation](https://contentsquare-foundation.org/), Readapt is a software platform that aims to help those with reading challenges like dyslexia to more easily read digital text. The [Microsoft Word version](https://appsource.microsoft.com/en-us/product/office/WA200004098?tab=Overview) of Readapt allows users to set their reading preferences and see an adaptation of the Word document's text. It also provides reading tools like a screen mask and reading ruler. 

## Operating system and Microsoft Office compatibility
### MacOS 
Readapt can be used on most recent releases of MacOS and Microsoft Office.

### Microsoft Office Online
[Microsoft Office Online](www.office.com) (offered free of charge from Microsoft) can be used with Readapt.

### Microsoft Windows & Microsoft Office
Readapt can be used with certain combinations of Windows and Microsoft Office. Because Microsoft Office add-ins [use an embedded browser control](https://docs.microsoft.com/en-us/office/dev/add-ins/concepts/browsers-used-by-office-web-add-ins), the browser installed on your version of Windows can also determine if you can use Readapt. We strongly recommend installing the [latest version of Microsoft Edge](https://www.microsoft.com/en-us/edge) (free from Microsoft) for the best Readapt experience if you use Microsoft Windows. See below for a summary of what’s compatible. Unfortunately, versions of Microsoft Windows and Office not mentioned below are not compatible with Readapt.

|   | Microsoft 365 ver. >= 16.0.13530.20424 | Microsoft 365 ver. >= 16.0.11629 AND < 16.0.13530.204242 |non-subscription Office 2021 or later |
| --- | --- | ---|---|
| Windows 8.1 | Edge WebView2 must be installed | Incompatible | Incompatible |
| Windows 10 before version 1903 | Incompatible | Incompatible |Edge WebView2 must be installed|
| Windows 10 version 1903 and after OR Windows 11 | Readapt will work but Edge WebView2 installation recommended | Readapt will work but Edge WebView2 installation recommended | Edge WebView2 must be installed|


## How the Readapt Microsoft Word add-in works
Please see our [webpage](contentsquare-foundation.org/msword/) for a detailed guide.

## Development

Generate self-signed SSL certificates and deploy manifest.xml running

`yarn start`

Launch dev server

1. Launch dev server `yarn serve`

## Build

Set env var `RENDER_EXTERNAL_URL` to generate a manifest.xml with an external Url

Run `yarn build`

deploy `dist` folder il your environment


## Production deploy

Setup env var `READAPT_MSWORD_URL` before the build to generate the manifest.xml pointing to Readapt env URL.
