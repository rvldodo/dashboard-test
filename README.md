This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Brief

### Auto-Login Approach:

I implemented a cross-origin auto-login system using Next.js and NextAuth.js. The approach leverages postMessage to securely communicate login credentials from the parent application to the embedded iframe (external dashboard). When users authenticate via NextAuth, their credentials are cached client-side. The parent component automatically sends these cached credentials to the iframe via a structured message (AUTOFILL_REQUEST), enabling seamless auto-login without manual input. The iframe (if configured to listen for messages) processes this request and populates the login form programmatically.

### Constraints and Trade-offs:

The primary constraint is the Same-Origin Policy, which prevents direct DOM manipulation of cross-origin iframes. This necessitates cooperation from the external service (dashboard) to implement a message listener for the auto-login to work. Without server-side support, the solution is non-functional. Additionally, credential caching introduces security considerations—though NextAuth manages tokens securely, transmitting credentials via postMessage requires rigorous validation on the recipient side to prevent exploitation. The solution also depends on the iframe’s load timing, requiring careful handling to ensure messages are sent only after the target is ready.

This approach optimizes for user convenience but trades off control and reliability, as it hinges on the external service’s API and security practices. It is ideal for trusted environments where both systems are under coordinated development but less suited for integrating with arbitrary third-party logins.
