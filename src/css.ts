/**
 * Structural CSS injected into <head> once on first load.
 * No colors, fonts, padding, or visual opinions on header/footer content.
 * Authors supply all brand styling themselves.
 */
export const CORE_CSS = `
/* ── Host ──────────────────────────────────────────────── */
stapled-doc {
  display: block;
  position: relative;
}

/* ── Page container ─────────────────────────────────────── */
s-page {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
  margin: var(--sp-page-gap, 2rem) auto;
  box-shadow: var(--sp-frame-shadow, 0 4px 20px rgba(0,0,0,.12));
}

/* Header / footer inside s-page */
s-page > page-header,
s-page > page-footer {
  display: block;
  flex-shrink: 0;
  width: 100%;
  box-sizing: border-box;
}

/* Body slot — takes all remaining space */
s-page-body {
  flex: 1;
  min-height: 0;
  overflow: hidden;
  box-sizing: border-box;
}

/* Hide template elements (direct children of stapled-doc) until JS processes them */
stapled-doc > page-header,
stapled-doc > page-footer {
  display: none;
}

/* ── Page number placeholder ────────────────────────────── */
page-number {
  display: inline;
}

/* ── Preview print mode ────────────────────────────────── */
stapled-doc[preview="print"] {
  background: white;
}

stapled-doc[preview="print"] s-page {
  --sp-frame-shadow: none;
}

/* ── Print ──────────────────────────────────────────────── */
@media print {
  body {
    background: white !important;
  }

  s-page {
    page-break-after: always;
    break-after: page;
    box-shadow: none !important;
    margin: 0 !important;
  }

  stapled-doc {
    height: auto !important;
  }
}
`
