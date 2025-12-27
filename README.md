### full-stack-automation-test-framework ###
This framework provides a single, scalable solution for e2e automation across API and UI layers using Playwright with Typescript.
It elimnates the need for maintaining separate test suites and enables true shift-left testing, allowing bugs to be identified earlier in the development cycle.

Is is ideal for teams that want:
1. Consistenent testing across layers
2. Mocked BE + UI flows
3. Scalable automation atchitecture
4. Fast, maintable test code
5. CI/CD readiness with Allure reporting

#Features
  Unified Test Architecture
  Single framework for API + UI + E2E
  Modular design with reusable utilities
  Mocking backend responses using page.route()
  
#API Test Capabilities
  CRUD operation testing
  Auth & authorization flows
  Robust error-handling scenarios
  Data validation + JSON schema checks

#UI Test Capabilities
  User registration flow
  Transaction creation
  UI error/assertion validations
  Mock-driven UI simulation

#Utilities & Helpers
  Test data factories
  Custom API assertions
  Logger utilities
  Environment variable handling

#Reporting
  HTML reports with screenshots & videos
  Allure advanced reports
  Formatted API debug logs

##Tech Stack
  Automation Framework = Playwright (TypeScript)
  API Handling =	Playwright mocks + custom API utils
  Test Runner =	Playwright Test
  Reporting	= HTML Reports, Allure
  Environment Config =	dotenv
  Data Factories =TypeScript modules



## Installing 
1. Install node.js (https://nodejs.org/en/download)
2. Install Playwright- "npm init playwright@latest"
3. Uncomment the following lines in playwright.config.ts
    import dotenv from 'dotenv';
    import path from 'path';
    dotenv.config({ path: path.resolve(__dirname, '.env') });
4. Install the dotenv dependency- "npm install dotenv --save" 

## Instructions

1. Change the extension of this file ".env.example" to .env and enter the config URL, tokens in the .env file.

2. This framework uses the following sample API endpoints
    POST /api/users - Create user
    GET /api/users/:id - Get user details
    POST /api/transactions - Create transaction
    GET /api/transactions/:userId - Get user transactions

3. It also uses these sample API responses 
    
    // User Creation
    POST /api/users
    {
      "name": "John Doe",
      "email": "john@example.com",
      "accountType": "premium"
    }

    // Transaction Creation
    POST /api/transactions
    {
      "userId": "123",
      "amount": 100.50,
      "type": "transfer",
      "recipientId": "456"
    }

4. Framework includes 
     API Test Suite (page.route is used to mock API responses (since these is no live backend/frontend))
        -CRUD operations testing
        -Error scenario handling
        -Data validation tests

    Authentication/authorization tests
      UI Test Suite (UI elements (#name, #email, #accountType, #amount, etc.) are assumed as I am also mocking the UI)
        -User registration flow
        -Transaction creation flow
        -Error message validation

    Test Utilities
      Reporting
        -Test data factories (lib/datafactory/transactiondata.ts & userdata.ts - The respective sample json data )
        -Helper functions (lib/helpers/logger.ts - Prints status, URL, and body in a formatted way. 
                            Also lib/helpers/apiUtils.ts - Pasrese the response json and also sets the auth header)

    Environment configuration
        -Custom assertions (lib/assertions/apiAssertions.ts - Asserts the response status code and that a JSON response has a      specific field/value)

    Test results (multiple formats)
        -Screenshots for UI failures (video and screenshots are retained on failure & includedin HTML report at http://localhost:55051)
        -API response logging (Formatter console logs are displayed)
        -Allure report is also generated - see test execution instructions below to open allure report
  
    
## Test execution
 After you configure your env variables - see point #3 and #4 from the Installaing section. And point #1 from instructions section above
1. Use following commands to run the tests and open allure reports
    npx playwright test 
    npx allure generate ./allure-results --clean
    npx allure open ./allure-report

2. Use the following cmd to run only API tests
    npx playwright tests/api


## Contributing 
Contributions, suggestions, and improvements are welcome!
Feel free to open issues or submit PRs. 

## Like This Framework?
If you found it useful, give the repo a star ⭐ to support continued improvements!

