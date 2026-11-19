This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## SEO configuration

- The canonical production origin is `https://www.coreelectricmep.com`. Company details, language metadata, and JSON-LD are maintained in `lib/seo.js`.
- `/` and `/ko` have separate canonical URLs and reciprocal `en`, `ko`, and `x-default` language links.
- `/robots.txt` allows crawling and points to `/sitemap.xml`. The sitemap lists the two canonical pages.
- `/opengraph-image` generates the branded 1200 × 630 sharing image from the existing hero photograph.
- The previous Wix paths `/services`, `/projects`, `/about-us`, and `/get-a-quote` redirect permanently to their corresponding homepage sections.

After deployment, verify that the primary domain serves the new site, submit `https://www.coreelectricmep.com/sitemap.xml` in Google Search Console, and inspect both language URLs. Search Console verification and indexing requests require the domain owner's account. Vercel preview deployments can retain Vercel's own `noindex` header; check the primary production domain when verifying indexing settings.

## Contact form / Resend

- Set the server-only RESEND_API_KEY in the ignored .env.local and separately in Vercel Production. Never give it a NEXT_PUBLIC_ prefix.
- Fixed recipient: info@coreelectricmep.com. Default sender: Core Electric MEP <info@coreelectricmep.com>. Optional server-only RESEND_FROM overrides the sender.
- The visitor email is Reply-To only; visitors cannot select recipients, CC, or sender.
- Origin, input limits, a honeypot and best-effort per-instance throttling protect the route. The five-attempt/ten-minute limit is not shared across serverless instances.
- Run node --test tests/contact.test.mjs to test validation and transport with mocked Resend responses.
- Local secrets do not configure Vercel; production needs its environment variable and a subsequent deployment.
