# TransLoc Architect
An automation testing repository for TransLoc's Architect product using Cypress.io, Cypress-Cucumber-Preprocessor, and ES6.

## Why Cypress?
Cypress is a robust and lightweight automation tool which allows a developer or QA engineer to build automation into their projects with little downtime.

## Installation
Clone this repository, then enter the following command:

```
npm install -f
```

We use force install due to the dependency 'fsevents' creating run errors on Windows terminals. Since 'fsevents' is not supported on Windows, the dependency will be considered optional and will break a child dependency, 'chokidar'. The end result is the 'cypress-cucumber-preprocessor' package will not run properly.

## Running a Test
Once installed, run one of the following commands:

```
npm run test
```

Cypress will run tests through Chrome. A test readout will print to your terminal.

```
npm run test-headless
```

This will run tests in a headless format using Electron browser. A test readout will print to your terminal.

```
npm run test-ui
```

Use this command to open the Cypress.io test runner UI. From here, users may select the browser (Chrome or Electron) and what spec they would like to run. In addition, users may select 'Run all specs' to perform a full run of the testing suite.

A test readout will be featured in the left rail of the test runner UI. 
