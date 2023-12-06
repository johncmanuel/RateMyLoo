# RateMyLoo

<!-- TODO: add a screenshot of the main page here -->

A web application for users who want to share pictures of their bathrooms and rate others.

## About

We wanted to create something simple and funny at the same time, so that is how RateMyLoo came to be.

In RateMyLoo, users are able to create an account using an email and password. After a successful login, users are presented with two pictures of bathrooms that other users have uploaded. Users can click on the bathroom they think is nicer than the other. This repeats until the user has seen all the images available in the website. From there, the user will have to wait for other users to upload more pictures of their bathrooms.

## Tech Stack

1. Fullstack: Next.js, React
2. Database: Google Firestore
3. Image Bucket: Google Cloud Storage

## Contributing

See `CONTRIBUTING.md` under `/.github`.

## Deployment

We use [Vercel](https://vercel.com/) to deploy our website. [Vercel](https://vercel.com/) handles auto-deployments for production and preview environments whenever changes are pushed in the main branch and non-main branches, respectively.

## Getting Started

First, install packages:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, head over to `/docs` and follow the guide for setting up your Firebase project.

Next, create your `.env.local` and paste in your for values as seen in `.env.local.example`.

Finally, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Maintainers

1. Zohair Mamdani (frontend, design),
2. Kyle Lee (frontend, design),
3. John Carlo Manuel (frontend, backend, database)
