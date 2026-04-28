# Stapler — AI authoring guide

Stapler renders multi-page documents in the browser. Drop in one script tag; no npm, no build step.
Each page is a **fixed-size, hard-clipped container** — content that overflows is hidden.
**You control what goes on each page. Stapler does not reflow content.**

---

## Script tag

```html
<script src="https://cdn.jsdelivr.net/gh/rlnorthcutt/stapler@main/dist/stapler.min.js"></script>
```

---

## Minimal document

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <script src="https://cdn.jsdelivr.net/gh/rlnorthcutt/stapler@main/dist/stapler.min.js"></script>
  <style>
    /* Style body slot via CSS — never write <s-page-body> in HTML (JS creates it) */
    s-page-body {
      padding: 2rem 2.5rem;
      overflow-y: hidden;
    }

    page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 1.5rem;
      font-size: 10px;
      border-bottom: 1px solid #ddd;
    }

    page-footer {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding: 0 1.5rem;
      font-size: 10px;
      color: #888;
    }
  </style>
</head>
<body>

<stapled-doc page-width="6in" page-height="9in" page-gap="2rem">

  <!-- Header template — cloned into every page automatically -->
  <page-header height="36px">
    <span>My Book</span>
    <page-number format="n of total"></page-number>
  </page-header>

  <!-- Footer template — optional -->
  <page-footer height="24px">
    <span>© 2026 Author Name</span>
  </page-footer>

  <!-- Cover — no header or footer -->
  <s-page skip-header skip-footer>
    <h1>My Book</h1>
    <p>By Author Name</p>
  </s-page>

  <!-- Chapter page — header and footer stamped automatically -->
  <s-page>
    <h2>Chapter 1: The Beginning</h2>
    <p>Content here. Fit all text within the available body height.</p>
  </s-page>

  <!-- Another page -->
  <s-page>
    <p>Page 3 content…</p>
  </s-page>

</stapled-doc>

</body>
</html>
```

---

## Rules you must follow

| Rule | Detail |
|------|--------|
| `page-width` and `page-height` required | On `<stapled-doc>`. Accept `px`, `in`, `cm`, `mm`, `pt`, `rem`, `em`. |
| `height` required | On every `<page-header>` and `<page-footer>`. |
| Content must fit | Each page clips at its boundary. You are responsible for how much text goes on each page. |
| CSS-first body styling | Style `s-page-body` in CSS. **Never write `<s-page-body>` in HTML** unless you need a different padding on one specific page. |
| No inline padding on `<s-page>` | Put padding on `s-page-body` via CSS instead. |

---

## Elements

### `<stapled-doc>` — root wrapper

| Attribute | Required | Description |
|-----------|----------|-------------|
| `page-width` | yes | Page width, e.g. `8.5in`, `210mm`, `816px` |
| `page-height` | yes | Page height |
| `page-gap` | no | Gap between pages on screen (default `2rem`) |
| `preview="print"` | no | Removes gap and shadows — useful while laying out |

### `<page-header>` and `<page-footer>` — doc-level templates

Defined **once** as direct children of `<stapled-doc>`. JS clones them into every page.

| Attribute | Required | Description |
|-----------|----------|-------------|
| `height` | yes | e.g. `40px` |
| `skip-first` | no | Suppress on page 1 |
| `skip-pages` | no | e.g. `"1,3"` — 1-indexed page numbers to suppress |

### `<s-page>` — one page

| Attribute | Description |
|-----------|-------------|
| `skip-header` | Suppress header on this page |
| `skip-footer` | Suppress footer on this page |
| `page-width` / `page-height` | Per-page size override (e.g. landscape insert) |

### `<page-number>` — inline placeholder inside headers/footers

| `format` | Output |
|----------|--------|
| `n` (default) | `3` |
| `n of total` | `3 of 8` |
| `n/total` | `3 / 8` |
| `total` | `8` |

---

## Common page sizes

| Format | `page-width` | `page-height` |
|--------|-------------|--------------|
| US Letter | `8.5in` | `11in` |
| A4 | `210mm` | `297mm` |
| Trade paperback (6×9) | `6in` | `9in` |
| Half-letter booklet | `5.5in` | `8.5in` |
| Digest (5.5×8.5) | `5.5in` | `8.5in` |

---

## How to calculate content that fits

Available body height = `page-height` − `header-height` − `footer-height`

A page with `page-height="9in"`, `header height="36px"`, `footer height="24px"`:
- `9in = 864px` − `36px` − `24px` = **804px** of body space
- At `font-size: 16px; line-height: 1.6` → ~31 lines per page

When in doubt, put less on each page. Overflow is silently clipped.

---

## Print to PDF

Browser → Cmd/Ctrl+P → set:
- Paper size: match your `page-width` × `page-height`
- Margins: **None**
- Background graphics: **on**

Stapler auto-injects `@page { size: …; margin: 0; }` — no manual `@page` rule needed.

---

## What Stapler is NOT for

Long-form prose where the content length is unknown. You must decide what goes on each page.
For reflowing documents, use Google Docs, Word, or LaTeX.
