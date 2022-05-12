# @readapt/visual-engine

## Installation

### npm

1. Install `@readapt/visual-engine` package:

```bash
     npm install @readapt/visual-engine
```

## Usage

```javascript
//import analyse function from text-engine
import { analyse } from "@readapt/text-engine"
// import the builder function
import { buildAdaptHtmlElement } from '@readapt/visual-engine'

// build the adaptHtmlElement function
const adaptHtmlElement: AdaptHtmlElementFn = buildAdaptHtmlElement(analyse)

// pass as param the HTMLElement to be adapted and the user settings
adaptHtmlElement(element, settings)
```

