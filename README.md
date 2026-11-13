# Sourav Yadav — E-Portfolio

[View the live portfolio](https://portfolio-studio-oct26-k7m4.windymule2048.chatgpt.site/)

A personal portfolio for Financial Analyst and Finance Intern opportunities, built with HTML, CSS and JavaScript. This repository contains the complete static website, including the portrait, certificates and downloadable résumé.

## Run locally

Open `dist/index.html` in a browser, or serve the `dist` folder with a local web server. No dependency installation or build step is required.

## Main files

- `dist/index.html` — page content and structure.
- `dist/portfolio.css` — base portfolio design.
- `dist/readability.css` — current typography, responsive spacing and layered cover.
- `dist/motion-studio.css` and `dist/motion.js` — animations and motion preferences.
- `dist/app.js` — navigation, project dialogs, filters and certificate previews.
- `dist/assets/` — portfolio images and certificates.

The live website is hosted separately. Uploading changes to this repository does not automatically update the published website.

## Design and features

A red-and-black editorial portfolio inspired by the user-supplied template, tailored to Financial Analyst and Finance Intern opportunities. The supplied transparent portrait (122.png) retains its full framing and overlays the oversized PORTFOLIO lettering at the centre of the cover, matching the supplied reference, with a gentle fade at the bottom of the jacket. Name lettering and surrounding space have been loosened. The name remains compact, and an attributed finance quote appears beside the portrait.

Open `dist/index.html` in a browser. No installation is needed. The site includes searchable project stories, category filters, reading times, paired project cards, keyboard-operated tabs, mobile navigation, email copying, the original résumé download, and certificate image previews with downloads. Section links use fade-and-slide view transitions in supporting browsers, with an equivalent fade-and-slide fallback where the View Transitions API is unavailable. A sticky navigation bar, animated story dialogs and tabs, scroll reveals, a hero entrance, and project hover effects add motion. The Pause motion control stores a local preference, and device reduced-motion settings are respected.

## Included work

- Hyundai Motor India Ltd. Financial Dashboard — published financial research workspace: https://hyundai-india-financial-lens.windymule2048.chatgpt.site/. Project text is based on the visible dashboard sections and controls; no investment results or impact claims are made.
- Delhi Hospital ICU Finder — project story and the dashboard URL supplied by Sourav. Technical details, data sources, refresh method, validation, and measured impact are still to be added. The dashboard could not be independently inspected from this environment.

## Included credentials

- Using the Time Value of Money to Make Financial Decisions — LinkedIn Learning, 19 October 2026.
- Ultimate Job-Ready AI-Powered Data Analytics Course — CodeWithHarry, 25 March 2026.
- First Place, Corporate Crisis Room — FIIB Finance Stock Exchange Club, 21 July 2026.
- Best AI Build Solution — FIIB Sankalp 2026, 17–18 September 2026.

The original supplied images are included as evidence. The repeated CodeWithHarry image appears once. Issuer verification URLs have not been supplied. The awards are shown independently from the projects; no relationship between the ICU project and an award is assumed.

## Editing

Edit the text in `dist/index.html`; the current theme and responsive layouts are in `dist/portfolio.css`. Earlier theme stylesheets are retained but no longer loaded. Interactions are in `dist/app.js`; animation controls and reading times are in `dist/motion.js`. Original credential images are in `dist/assets/`.

The project covers are illustrations, not screenshots or actual data. A professional profile photo is included. A PDF résumé, additional projects, and further project evidence remain to be added. The full FIIB framework was not supplied, so the checklist is provisional.

The résumé download contains the original contact details. The portfolio is public at https://portfolio-studio-oct26-k7m4.windymule2048.chatgpt.site/ following Sourav’s request to publish it.

The homepage quote is attributed to Benjamin Graham and linked to Warren Buffett’s 2008 shareholder letter, where the quotation is cited.

## Reference-inspired motion

The two supplied videos informed a staggered blur-to-sharp hero entrance, delayed portrait entrance, circular color spotlight on portrait hover, progressive statement emphasis, staggered card reveals, expandable approach rows, and floating certificate previews. Project covers open their corresponding stories with mouse, Enter, or Space. The portrait uses the original supplied cutout; it does not animate or replace facial expressions. Fine-pointer effects are omitted on touch devices. Pause motion and device reduced-motion preferences disable decorative movement while retaining navigation and expandable content.

Current animation styles are in `dist/motion-studio.css`; behavior is in `dist/motion.js`. The two reference videos are not published as site assets.

## Readability update

`dist/readability.css` sets the current typography and spacing: larger body text, prominent headings, clear labels, a centred portrait layered in front of the PORTFOLIO lettering, responsive project cards and full-width certificate previews. Foreground name and quote text have dedicated space. The original résumé remains unchanged. The portfolio’s Excel Sales Dashboard card and story were replaced by the Hyundai Motor India Ltd. Financial Dashboard.
