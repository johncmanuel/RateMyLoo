# Architecture

This project utilizes Next.js (using the Pages Router), a React framework.

## `/components/`

Contains all reusuable React components that can be utilized in building the frontend.

## `/pages/`

Contains all the pages that can be visited by the user (with the exception of `_app.tsx` and `_document.tsx`). `index.tsx` files for each folder represents an endpoint of the website (for example, `/pages/index.tsx` would represent `https://rate-my-loo.vercel.app/` in production.)  

## `/pages/api`

Contains the API routes for the website. All of the backend processing (i.e authentication, querying, etc) happens here. Because the pages use client-side rendering (except the root page, `/pages/index.tsx`), the API routes are mainly used by the pages for fetching data from the database and the image bucket and authenticating users into the website.

## `/utils/`

Contains helper functions that helps with implementing the business logic.

## `/public/`

Contains the static files for the website. Files such as images are usually stored here.

## `/styles/`

Contains the CSS that will be used by the website.

## `/docs/`

Contains the documentation for the website.

## `/tests/`

Contains E2E and integration test cases for this project. This can be run with `npm run test`, which will run the test cases using [Playwright](https://playwright.dev/).

## `playwright.config.ts`

Contains the configuration options for [Playwright](https://playwright.dev/test-configuration).

## `next.config.js`

A configuration file for managing Next.js projects. [See the docs for more information](https://nextjs.org/docs/pages/api-reference/next-config-js).

## `package.json, package-lock.json`

Files for listing the external dependencies that will be used by the project. This ensures that other developers use the same version for each external dependency when working on the project. `package-lock.json` is only to be used by the package manager.

## `tsconfig.json`

A customizable configuration file that will be used by TypeScript's compiler. This allows developers to customize the compiler. This was automatically created by [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app), with the recommended configurations, so it is best to leave it as it is.

## `middleware.ts`

Handles any code that will be executed before completing a HTTP request. This also works for HTTP responses.

## `.eslintrc`

Configuration file for linting the project's codebase. By linting, this means analyzing the codebase for any errors that may occur. This uses Next.js's base configuration under the hood.

Reference: [What is "Linting"?](https://stackoverflow.com/questions/8503559/what-is-linting)

## `.prettierrc`

Configuration file for `Prettier`, an opinionated code formatter. This allows developers to beautify the codebase and stay consistent with any code standards.

## Resources

1. Next.js website: <https://nextjs.org>
2. Next.js documentation: <https://nextjs.org/docs>
