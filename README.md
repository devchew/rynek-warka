# Rynek Kawiarnia Galeria Warka

Modern website for Rynek Kawiarnia Galeria - a cozy cafe and art gallery located in Warka, Poland. This site has been modernized from the original rynek-warka.pl website.

## 🚀 Project Structure

Inside of this Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |

## 📦 Deployment with Nixpack

This project supports Nixpack for simplified deployment. Nixpack helps standardize build processes across platforms.

### Nixpack Setup

A `nixpacks.toml` configuration file is included that defines:
1. Setup phase - installs Node.js and npm 
2. Install phase - installs project dependencies
3. Build phase - builds the application
4. Start command - runs the preview server on the specified port

### Deployment

To deploy using Nixpack:

1. Make sure Nixpack is installed
2. Run: `nixpacks build .`
3. Deploy the resulting image to your preferred hosting platform

For platforms that support Procfile (like Heroku), a Procfile is also included.

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
