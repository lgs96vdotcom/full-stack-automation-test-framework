import { test, expect } from "@playwright/test";
import { userjsondataFactory } from "../../lib/datafactory/userdata";
import { parseJson, getAuthHeaders } from "../../lib/helpers/apiUtils";
import { expectStatus, expectJsonField } from "../../lib/assertions/apiAssertions";
import { logApiResponse } from "../../lib/helpers/logger";

test.describe("User API tests", () => {
        
        // Environment variables
        const baseURL = process.env.BASE_URL!;
        const authToken = process.env.AUTH_TOKEN!;

        // Test data
        const mockedUser = userjsondataFactory();
        let userId: string;

        // Common headers
        const authHeaders = getAuthHeaders(authToken);
        
    test("Get the json from api and add John Dee's name, email and accounttype json", async ({ page }) => {
        // Get the response and add to it
       await page.route("*/**//api/users", async route => {
            const response = await route.fetch();
            const json = await response.json();
            json.push(mockedUser);
            // Fulfill using the original response, while patching the response body
            // with the given mock json.
            await route.fulfill({ 
                response, 
                json 
            });
        });

        // Go to the page
        await page.goto("baseURL");

        // Assert that the sample json values are displayed
        await expect(page.getByText('John Doe', { exact: true })).toBeVisible();
        await expect(page.getByText('john@example.com', { exact: true })).toBeVisible();
        await expect(page.getByText('premium', { exact: true })).toBeVisible();
      
    });

  // ---------- CRUD Tests ----------

    test("User Creation (POST)", async ({ request }) => {
        
        const responseobj = await request.post(baseURL + "/api/users", {
            headers: authHeaders,
            data: mockedUser,
        });
      
        await logApiResponse(responseobj, "Create User Response");
        await expectStatus(responseobj, 201);
        const body = await parseJson(responseobj);
                        
        userId = body.userId;
        expect(userId).toBeTruthy(); // userID must not be null
        await expectJsonField(responseobj, "email", mockedUser.email);
    });
   
    test("Get User (GET)", async ({ request }) => {
        const responseobj = await request.get(baseURL + "/api/users/${userId}", {    //Clarify endpoint assumption
            headers: authHeaders,
        });
    
        await logApiResponse(responseobj, "Get User Response");
        await expectStatus(responseobj, 200);
        const body = await parseJson(responseobj);

        expect(body.userId).toBe(userId);
        expect(body.accountType).toBe("premium");
    });

    test("Update User (PUT)", async ({ request }) => {
        const responseobj = await request.put(baseURL + "/api/users/${userId}", {
            headers: authHeaders,
            data: { accountType: "UltraPremium" }    // refactor later 
        });

        await logApiResponse(responseobj, "Update User Response");
        await expectStatus(responseobj, 200);
        const body = await parseJson(responseobj);

        expect(body.accountType).toBe("UltraPremium");
    });

    test("Delete User (DELETE)", async ({ request }) => {
        const responseobj = await request.delete(baseURL + "/api/users/${userId}", {  //Clarify endpoint assumption
            headers: authHeaders,
        });

        await logApiResponse(responseobj, "Delete User Response");
        await expectStatus(responseobj, 204);
    });

    // ---------- Error Scenarios ----------

    test("Error: Missing auth token", async ({ request }) => {
        const responseobj = await request.post(baseURL + "/api/users", {
          data: mockedUser
        });

        await logApiResponse(responseobj, "Post User Response with missing auth token");
        await expectStatus(responseobj, 401);
        console.log("Unauthorized request blocked");
        
    });

    test("Error: Invalid payload", async ({ request }) => {
        const responseobj = await request.post(baseURL + "/api/users", {
         headers: authHeaders,
         data: { email: "bademailaddress" } // refactor later & separate into datafactory
        });

        await logApiResponse(responseobj, "Post User Response with bad data");
        await expectStatus(responseobj, 400);
        console.log("Invalid payload correctly rejected");
    });

}); //Describe block
