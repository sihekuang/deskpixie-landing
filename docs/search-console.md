# Google Search Console setup for deskpixie.ai

The site already ships the SEO basics (title, description, Open Graph and Twitter tags, canonical URL,
`/robots.txt`, `/sitemap.xml`, JSON-LD). What is left is proving ownership and submitting the sitemap.
`deskpixie.ai` is registered and DNS-hosted on Vercel, so use the **Domain** property with a DNS TXT record.

## Steps

1. Open <https://search.google.com/search-console> and sign in with the Google account that should own the property.
2. **Add property** → choose **Domain** (left card) → enter `deskpixie.ai` → **Continue**.
3. Google shows a TXT record that looks like `google-site-verification=XXXXXXXX...`. Copy the whole value
   and keep the dialog open (or come back later via Settings → Ownership verification).
4. Add it as a TXT record in Vercel DNS for `deskpixie.ai`:
   - Dashboard: Vercel → Domains → `deskpixie.ai` → DNS Records → Add.
   - Or CLI: `vercel dns add deskpixie.ai @ TXT "google-site-verification=XXXXXXXX..."`
   - Type `TXT`, name `@` (blank/root), value exactly as Google shows it, default TTL.
   - The coordinator can add this once given the value.
5. Back in Search Console click **Verify**. DNS can take a few minutes; if it fails, wait and retry
   (it can take up to a day). Leave the TXT record in place permanently, or ownership is lost.
6. Open **Sitemaps** → enter `https://deskpixie.ai/sitemap.xml` → **Submit**. Status should become "Success".
7. Open **URL Inspection**, paste `https://deskpixie.ai/`, wait for the result, then click **Request indexing**.

## Alternative: HTML tag

If DNS verification is not possible, add a URL-prefix property for `https://deskpixie.ai/` and choose the
HTML tag method. Put the `content` value of the tag in `GOOGLE_SITE_VERIFICATION` in `lib/site.ts`
(empty by default, so nothing is emitted), deploy, then click Verify.
