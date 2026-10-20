# DeskPixie landing page

Marketing site for [DeskPixie](https://github.com/sihekuang/deskpixie), modeled on the structure of heard.dev.

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # / is prerendered as static HTML
```

- `app/page.tsx`: all sections (hero, features 01–05, pixie picker, closing CTA, footer)
- `app/globals.css`: design tokens and styles (navy and pixie green from the app icon, Geist Pixel display font)
- `components/`: client islands (hero demo, session picker, pixie picker, nav, motion toggle) and the CSS sprite
- `lib/site.ts`: download URL, requirements line, pixie names
- `public/pixies/*.png`: sprite sheets copied from `deskpixie/pixies/<id>/sheet.png` (32px cells, 8 frames per row)
