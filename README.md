# README

## Table of Contents

- [Details](#details)
- [Requirements](#requirements)
- [Installation](#installation)
- [Build](#build)
- [Usage](#usage)
- [Testing](#testing)
- [Support](#support)
- [Contributing](#contributing)
- [Credits](#credits)
- [Suggestions](#suggestions)


## Details
### Name
Node JS Seed

### Description


### Author
Roberto Sousa <betos.sousa22@gmail.com>


## Requirements
- Install [Node.js](https://nodejs.org/en/)
- Install [MongoDB](https://docs.mongodb.com/manual/installation/)
- Install [VS Code](https://code.visualstudio.com/)


## Installation
- Install dependencies
```
yarn
```
- Start mongoDB locally
```
mongod
```
- Start the local project
```
yarn develop
```

Navigate to `http://localhost:8080`

##Build
| Yarn Script | Description |
| ------------------------- | ------------------------------------------------------------------------------------------------- |
| `start`                   | Does the same as 'npm run serve'. Can be invoked with `npm start`                                 |
| `build`                   | Full build. Runs ALL build tasks (`build-ts`, `tslint`)                                           |
| `serve`                   | Runs node on `dist/server.js` which is the apps entry point                                       |
| `watch`                   | Runs all watch tasks (TypeScript, Node). Use this if you're not touching static assets.           |
| `test`                    | Runs tests using Jest test runner                                                                 |
| `build-ts`                | Compiles all source `.ts` files to `.js` files in the `dist` folder                               |
| `watch-ts`                | Same as `build-ts` but continuously watches `.ts` files and re-compiles when needed               |
| `tslint`                  | Runs TSLint on project files                                                                      |
| `develop`                 | Start the project with the dev options on                                                         |


## Testing
To run the tests just run `yarn test` and it will run then and generate a report that can be checked here `~/coverage/lcov-report/index.html`

## Support
Please [open an issue]() for support.

## Credits
This repository was created based on the Microsoft repository provided [here](https://github.com/Microsoft/TypeScript-Node-Starter).

## Suggestions
- [TSLint](https://marketplace.visualstudio.com/items?itemName=eg2.tslint)
- [Import Cost](https://marketplace.visualstudio.com/items?itemName=wix.vscode-import-cost)