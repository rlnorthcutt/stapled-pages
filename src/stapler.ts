import { CORE_CSS } from './css.js'
import { Stapler } from './components/StapledPages.js'
import { PageHeader } from './components/PageHeader.js'
import { PageFooter } from './components/PageFooter.js'
import { SPage } from './components/SPage.js'
import { SPageBody } from './components/SPageBody.js'
import { PageNumber } from './components/PageNumber.js'

if (!document.getElementById('sp-core-styles')) {
  const style = document.createElement('style')
  style.id = 'sp-core-styles'
  style.textContent = CORE_CSS
  document.head.appendChild(style)
}

customElements.define(Stapler.TAG, Stapler)
customElements.define(PageHeader.TAG, PageHeader)
customElements.define(PageFooter.TAG, PageFooter)
customElements.define(SPage.TAG, SPage)
customElements.define(SPageBody.TAG, SPageBody)
customElements.define(PageNumber.TAG, PageNumber)
