### full-stack-automation-test-framework ###
This framework solves the challenge of maintaining separate test suites for different layers of an application. This framework leverage Playwright with Typescript. 
It provides a unified solution for both API and UI test automation, it enables developers and QA engineers to build scalable and reliable end-2-end test coverage. The goal is to streamline testing efforts and catch bugs earlier, shift left in the dev cycle.


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

## Future Enhancements
 TBD - adding Page Object design patern tests for sample application
 TBD - test tagging for selective test execution



