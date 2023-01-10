This project contains my solution to the tech task proposed by NordSecurity

## Overview
This node project uses cypress as the main testing FW to automate FE and BE (API) tests. These tests are independent, but having both automation on the same project generates the opportunity to eventually create big testing flows or cover complete e2e scenarios.

+ Ide used: vsCode
+ Language: JavaScript with Node (v19.0.0)
+ Package manager: npm (v8.19.2)
+ Testing FW: Cypress (9.7.0)

## Project Layers
### FE
The frontend automation was implemented using BDD tests with 3 main logic layers. Its main responsibility are:

1-Features: Contains the tests, they were wrote using gherkin language (cypress\integration\features\*.feature).
2-Definitions: Connects the gherkin tests with its js implementation (cypress\integration\features\checkout\*.js).
3-Pages: Allows interaction with web elements (cypress\integration\pages\*.js).

Normally, it is necessary to have a layer between the definitions and the pages, something similar to a "business actions layer", having business-oriented actions improve code reuse, makes easier the maintenance tasks, and makes the project more readable. For this challenge, adding this layer will not add value but make the project bigger and more complex, so I skipped it.

### BE
The backend automation was implemented using one more traditional approach (raw test without gherkin). On this case, it is only one layer (cypress\integration\apitest\insightApi.spec.js) that contains the api consumption and the verifications. 

Additionally, I added a couple validation on a postman request to have basic validations during manual testing and save time, the postman collection is on the root of the project with the name 'nord.postman_collection.json'

## Execution
Before execute the command, install the dependencies with the 'npm install' command.
+ To execute the first task (API test), run the following command'npm run cypress:runTask1'.
+ To execute the second task (FE test), run the following command to headless execution 'npm run cypress:runTask2' or 'npm run cypress:runTask2withBrowser' to execute launching the browser.
+ I split the FE test in 2 smaller test to implement an example of the use of tags on the features, to run all FE tests on headless execute 'npm run cypress:feTests' or 'npm run cypress:feTestswithBrowser' to execute them launching the browser.
+ The cypress UI can be opened using the 'npx cypress open' command, on this interface you can decide which test execute.

## Notes
+ For the commands cypress:runTask2 and cypress:feTests (tests with gherkin), an html report is generated on this path: reports\cucumber-report.html\index.html and a video is saved on the videos folder.
+ As the next improvements/implementations to the project, we can add an html report to the BE test and customize the FE report, configure a container to execute the tests (i.e. Docker), and add an external logger to have more information in case of failures.