# Notepad

This is a [Nextjs](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## Folder Structure

Description of the project files and directories.

```bash
├── assets/                    # Supplemental assets
├── public/                    # Files that will write to dist on build
├── src/                       # All Notepad app source files
│   ├── pages/                 # Shared resources
│   ├── server/                # React client side code
│   │   ├── api/
│   │   │   ├── routers/
│   │   │   │   └── example.ts
│   │   │   ├── root.ts
│   │   │   └── trpc.ts
│   │   ├── auth.ts
│   │   ├── db.ts
│   └── styles/
│       └── global.css
├── .editorconfig              # Configures editor rules
├── .gitignore                 # Files ignored by git
├── .prettierrc                # Code convention enforced by Prettier
├── LICENSE                    # License for this open source project
├── pnpm-lock.json             # Package lockfile
├── package.json               # Dependencies and additional information
├── README.md
└── tsconfig.json              # Typescript configuration
```

## Scripts

An explanation of the `package.json` scripts.

| Command           | Description                                  |
| ----------------- | -------------------------------------------- |
| `start`           | Start a production server for the app        |
| `build`           | Create a production build of the app         |
| `dev`             | Run app in a development environment         |
| `test`            | Run unit and component tests                 |
| `deploy-gh-pages` | Manually deploy production build to gh-pages |
| `dx`              | (To be updated)                              |
| `db-up`           | (To be updated)                              |
| `db-seed`         | (To be updated)                              |
| `db-migrate-dev`  | (To be updated)                              |
| `dev-nuke`        | (To be updated)                              |
| `generate`        | (To be updated)                              |
| `lint`            | (To be updated)                              |
| `migrate`         | (To be updated)                              |
| `prettier`        | (To be updated)                              |
| `prepare`         | (To be updated)                              |
| `postinstall`     | (To be updated)                              |
| `studio`          | (To be updated)                              |
| `test-ct`         | (To be updated)                              |

## Technologies

This project is possible thanks to all these open source languages, libraries, and frameworks.

| Tech                                          | Description                               |
| --------------------------------------------- | ----------------------------------------- |
| [TypeScript](https://www.typescriptlang.org/) | Static type-checking programming language |
| [Next.js](https://nextjs.org/)                | Open-source Web development framework     |
| [React](https://reactjs.org/)                 | Front end user interface                  |
| [Tailwindcss](tailwindcss.com/)               | A utility-first CSS framework             |
| [NextAuth](https://next-auth.js.org/)         | Protocol for secure authorization         |
| [ESLint](https://eslint.org/)                 | TypeScript linting                        |
| [PlayWright](https://playwright.dev/)         | Unit testing framework                    |

## Styleguide

Coding conventions are enforced by [ESLint](.eslintrc.js) and [Prettier](.prettierrc).

- Single quotes
- Two tabs indentation
- Trailing commas in arrays and objects
- [Non-default exports](https://humanwhocodes.com/blog/2019/01/stop-using-default-exports-javascript-module/) are preferred for components
- Module imports are ordered and separated: **built-in** -> **external** -> **internal** -> **css/assets/other**
- TypeScript: strict mode, with no implicitly any
- React: functional style with Hooks (no classes)
- `const` preferred over `let`

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.
