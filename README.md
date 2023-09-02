# RateMyLoo

Web application for users who want to share pictures of their bathrooms and rate others.

## Getting Started

First, install Node.js >=19.6 and Python 3.11.2.

Second, install the dependencies using the terminal:

```bash
# Install Next.js dependencies first
npm install
# or
yarn
# or
pnpm install

# Then, install Flask packages
pip install pipenv==2023.4.29
pipenv install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The Flask server will be running on [http://127.0.0.1:5328](http://127.0.0.1:5328) – feel free to change the port in `package.json` (you'll also need to update it in `next.config.js`).


## Resources

1.  [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
2.  [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
3.  [Flask Documentation](https://flask.palletsprojects.com/en/1.1.x/) - learn about Flask features and API.
4.  [Deployment](https://vercel.com/guides/how-to-use-python-and-javascript-in-the-same-application) - guide for deploying Next + Flask app to Vercel

Boilerplate Source: [nextjs-flask](https://github.com/vercel/examples/tree/main/python/nextjs-flask)
