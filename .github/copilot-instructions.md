### Quick context

- Project: simple static marketing site for "Suatek Multi-Link Engineering Nigeria Limited".
- Main files: `index.html`, `contact.html`, `style.css`, `contact.css`, `script.js` and `assets/` images.
- No build step: the site is static HTML/CSS/JS and is served by opening `index.html` or deploying to static hosting.

### What the agent should know (high-value facts)

- Architecture: single-page marketing site with a separate `contact.html` page. The header/nav and footer are duplicated across pages rather than imported. Keep edits consistent between `index.html` and `contact.html`.
- Client-side JS is located in `script.js`. It controls keyboard accessible mobile nav, an auto-scrolling image slider (`.slider-flex`), intersection-based fade-in animations, sticky header behavior, and client-side contact form validation. See `script.js` for exact event names and CSS class toggles (`nav.open`, `hamburger.active`, `.animated`).
- CSS conventions: global variables in `style.css` (e.g. `--primary`, `--dark`) and page-specific overrides in `contact.css`. Responsive breakpoints pivot at 900px and 480px.
- Accessibility: focusable controls use `aria-expanded`, `aria-current`, and `aria-live` for the contact form messages. Preserve these attributes when modifying the header/nav or form markup.

### Editing patterns and examples (copy-paste friendly)

- To add a new nav link: update both `index.html` and `contact.html` `#main-nav` lists and ensure mobile close behavior remains (links inside `nav` are closed by `script.js`).

- To add a new slider image: add an `<img>` inside `.slider-flex` in `index.html` and place the file under `assets/`. `script.js` will automatically animate it via IntersectionObserver.

- To change the CTA color: edit `--primary` in `style.css` (root). Many templates and components inherit this variable.

### Tests / verification steps (fast manual checks)

- Visual smoke test: open `index.html` and `contact.html` in a browser. Verify header, mobile nav toggle, slider auto-scroll, and contact form validation (try submitting blank and a valid message).
- Dev note: there is no build tool or package manager. Use a static host or local file preview. On Windows PowerShell, use: `Start-Process index.html` to open in default browser.

### Project-specific conventions

- Duplicate header/footer: file-level duplication is intentional. When changing header markup, update both pages.
- Minimal JS: prefer to add small, focused functions in `script.js` instead of introducing frameworks. Keep global names minimal and avoid polluting window scope.
- Motion: animations intentionally disabled for repeat visits using `sessionStorage.visited` and respects `prefers-reduced-motion`. Preserve that logic when adjusting animations.

### Integration points & external dependencies

- Google Fonts load via external URL in both pages. No other third-party scripts or network calls exist.
- Contact form has no backend endpoint; the current submission is client-side only and shows a success message. If adding server integration, implement progressive enhancement: keep client validation and add an asynchronous POST to the new endpoint.

### When you must ask the human

- If a header/footer change requires templating (many pages), ask whether to convert to a templating approach or keep duplication.
- If adding a backend for contact submissions, ask which API/hosting and auth method to use.

### Unsafe or out-of-scope edits

- Don't remove ARIA attributes (`aria-expanded`, `aria-current`, `aria-live`) or keyboard handlers in `script.js` without explicit human approval.

### Example editing checklist (use before PR)

1. Update both `index.html` and `contact.html` for header/footer changes.
2. Run the manual smoke checks above in a browser.
3. Keep CSS variable changes minimal and document them in this file.

---
If anything here is unclear or you'd like the agent to follow stricter rules (for example, convert duplication into a build step), tell me which approach you prefer and I will update this file.
