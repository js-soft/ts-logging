set -e

npm ci
npm run build
npm run lint:eslint
npm run lint:prettier
npm run --workspaces cdep
npx --workspaces license-check
npx better-npm-audit audit
