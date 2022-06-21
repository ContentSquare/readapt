import { adaptHtmlElement } from '../src/browser'
import { buildDefaultSettings } from '@readapt/settings'

describe('visual engine tests', () => {
  it('should add data-readapt-id attribute', () => {
    const settings = buildDefaultSettings('en')
    document.body.innerHTML = `<div><p data-id="text-content">hello readapt</p></div>`
    const htmlElement = document.body.firstChild as HTMLElement

    adaptHtmlElement(htmlElement, settings, 'jsdom')

    const dataReadaptIdAttribute = htmlElement.getAttribute('data-readapt-id')
    expect(dataReadaptIdAttribute).toBeDefined()
  })

  it('should add readapt scope class to the element', () => {
    const settings = buildDefaultSettings('en')
    document.body.innerHTML = `<div><p>hello readapt</p></div>`
    const htmlElement = document.body.firstChild as HTMLElement

    adaptHtmlElement(htmlElement, settings, 'jsdom')

    expect(htmlElement.classList.contains('readapt-jsdom')).toBeTruthy()
  })

  it('should add readapt styles in the head', () => {
    const settings = buildDefaultSettings('en')
    document.body.innerHTML = `<div><p>hello readapt</p></div>`
    const htmlElement = document.body.firstChild as HTMLElement

    adaptHtmlElement(htmlElement, settings, 'jsdom')

    const readaptStyles = document.head.querySelector('[data-readapt-style=jsdom]') as HTMLStyleElement
    expect(readaptStyles.textContent).toBe(
      '.readapt-jsdom .readapt-content { font-size: inherit; } .readapt-content > span { font-size: inherit } .readapt-jsdom .readapt-bold { font-weight: bold }'
    )
  })

  it('should wrap text content in a span element', () => {
    const settings = buildDefaultSettings('en')
    document.body.innerHTML = `<div><p data-id="text-content">hello readapt</p></div>`
    const htmlElement = document.body.firstChild as HTMLElement

    adaptHtmlElement(htmlElement, settings, 'jsdom')

    const textContent = htmlElement.querySelector('[data-id=text-content]') as HTMLElement
    expect(textContent.outerHTML).toBe(`<p data-id="text-content"><span class="readapt-content">hello readapt</span></p>`)
  })

  it('should add shade lines class to text element and shade styles in the head', () => {
    const settings = buildDefaultSettings('en')
    settings.shadeAlternateLinesActive = true
    document.body.innerHTML = `<div><p data-id="text-content">hello readapt</p></div>`
    const htmlElement = document.body.firstChild as HTMLElement

    adaptHtmlElement(htmlElement, settings, 'jsdom')

    const textContent = htmlElement.querySelector('[data-id=text-content]') as HTMLElement
    const textContentClasses = textContent.classList
    expect(textContentClasses.toString()).toBe('readapt-shade-alternate-lines-NaNpx')

    const readaptStyles = document.head.querySelector('[data-readapt-style=jsdom]') as HTMLStyleElement
    expect(readaptStyles.textContent).toContain('.readapt-jsdom .readapt-shade-alternate-lines-NaNpx')
  })

  it('should add shade lines class directly in the element when adapt a p element', () => {
    const settings = buildDefaultSettings('en')
    settings.shadeAlternateLinesActive = true
    document.body.innerHTML = `<p data-id="text-content">hello readapt</p>`
    const pElement = document.body.firstChild as HTMLElement

    adaptHtmlElement(pElement, settings, 'jsdom')

    const pElementClasses = pElement.classList
    expect(pElementClasses.toString()).toBe('readapt-jsdom readapt-shade-alternate-lines-NaNpx')
  })

  it('should not adapt ban tags (STYLE, SCRIPT, ..)', () => {
    const settings = buildDefaultSettings('en')
    const pElement = `<p data-id="text-content">hello readapt</p>`
    const scriptElement = `<script>foo</script>`
    const styleElement = `<style>p{}</style>`
    document.body.innerHTML = `${pElement}${scriptElement}${styleElement}`

    adaptHtmlElement(document.body, settings, 'jsdom')

    expect(document.body.innerHTML.toString()).toContain(scriptElement)
    expect(document.body.innerHTML.toString()).toContain(styleElement)
  })

  it('should not adapt empty nodes', () => {
    const settings = buildDefaultSettings('en')
    const pElement = `<p>hello readapt</p>`
    const pEmpty = '<p>\n \t \n</p>'
    document.body.innerHTML = `${pElement}\n${pEmpty}`

    adaptHtmlElement(document.body, settings, 'jsdom')

    const adaptedElement = document.body.firstElementChild as HTMLElement
    const notAdaptedElement = document.body.lastElementChild as HTMLElement

    expect(adaptedElement.outerHTML).toBe('<p><span class="readapt-content">hello readapt</span></p>')
    expect(notAdaptedElement.outerHTML).toBe(pEmpty)
  })

  it('should adapt silent letter', () => {
    const settings = buildDefaultSettings('en')
    settings.silentLetterActive = true
    const pElement = `<p>save the whale!</p>`
    document.body.innerHTML = `${pElement}`

    adaptHtmlElement(document.body, settings, 'jsdom')

    const adaptedElement = document.body.firstElementChild as HTMLElement

    expect(adaptedElement.innerHTML).toBe('<span class="readapt-content">save the w<span class="readapt-silent-letter">h</span>ale!</span>')
  })

  it('should adapt syllables', () => {
    const settings = buildDefaultSettings('en')
    settings.syllableActive = true
    settings.syllableColor1 = '#cecece'
    settings.syllableColor1 = '#bababa'
    const pElement = `<p>hello</p>`
    document.body.innerHTML = `${pElement}`

    adaptHtmlElement(document.body, settings, 'jsdom')

    const adaptedElement = document.body.firstElementChild as HTMLElement

    expect(adaptedElement.innerHTML).toBe(
      '<span class="readapt-content"><span class="readapt-syllable-1">hel</span><span class="readapt-syllable-2">lo</span></span>'
    )
  })

  it('should adapt letters', () => {
    const settings = buildDefaultSettings('en')
    settings.lettersActive = true
    const [bLetter] = settings.letters
    bLetter.active = true
    bLetter.color = '#bababa'
    bLetter.bold = true
    const pElement = `<p>body</p>`
    document.body.innerHTML = `${pElement}`

    adaptHtmlElement(document.body, settings, 'jsdom')

    const adaptedElement = document.body.firstElementChild as HTMLElement

    expect(adaptedElement.innerHTML).toBe('<span class="readapt-content"><span class="readapt-letter-1 readapt-bold">b</span>ody</span>')
  })

  it('should adapt phonemes', () => {
    const settings = buildDefaultSettings('en')
    const [bPhoneme] = settings.phonemes
    bPhoneme.active = true
    bPhoneme.color = '#bababa'
    bPhoneme.bold = true
    const pElement = `<p>bullet</p>`
    document.body.innerHTML = `${pElement}`

    adaptHtmlElement(document.body, settings, 'jsdom')

    const adaptedElement = document.body.firstElementChild as HTMLElement

    expect(adaptedElement.innerHTML).toBe('<span class="readapt-content"><span class="readapt-phoneme-7 readapt-bold">b</span>ullet</span>')
  })

  it('should adapt liaisons', () => {
    const settings = buildDefaultSettings('fr')
    settings.liaisonsActive = true
    const pElement = `<p>les amies</p>`
    document.body.innerHTML = `${pElement}`

    adaptHtmlElement(document.body, settings, 'jsdom')

    const adaptedElement = document.body.firstElementChild as HTMLElement

    expect(adaptedElement.innerHTML).toBe(
      '<span class="readapt-content">le<span class="readapt-liaison-start readapt-liaison-z">s</span><span class="readapt-liaison-symbol"> </span><span class="readapt-liaison-end">a</span>mies</span>'
    )
  })

  it('should not colorize letters with two phonemes', () => {
    const settings = buildDefaultSettings('en')
    settings.phonemes.forEach((item) => {
      if (item.value === 'w' || item.value === 'ah') {
        item.active = true
      }
      return item
    })
    const pElement = `<p>one</p>`
    document.body.innerHTML = `${pElement}`

    adaptHtmlElement(document.body, settings, 'jsdom')

    const adaptedElement = document.body.firstElementChild as HTMLElement

    expect(adaptedElement.innerHTML).toBe('<span class="readapt-content">one</span>')
  })
})
