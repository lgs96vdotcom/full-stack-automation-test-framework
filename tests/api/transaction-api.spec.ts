import { test, expect } from "@playwright/test";
import { getAuthHeaders, parseJson } from "../../lib/helpers/apiUtils";
import { transactiondataFactory } from "../../lib/datafactory/transactiondata";
import { expectStatus } from "../../lib/assertions/apiAssertions";
import { logApiResponse } from "../../lib/helpers/logger";


test.describe("Transaction API", () => {
    
  // Environment variables
  const baseURL = process.env.BASE_URL!;
  const authToken = process.env.AUTH_TOKEN!;

  // Test data
  const mockedTrans = transactiondataFactory();

  let userId: string;
  let transactionId: string;
  
  // Common headers
  const authHeaders = getAuthHeaders(authToken);

  test.beforeAll(async ({ request }) => {
    // Create a user to use for transactions
    const responseobj = await request.post(baseURL + "/api/users", {
      headers: authHeaders,
      data: mockedTrans,
    });
    const body = await parseJson(responseobj);
    userId = body.id;
  });

  // Transcation creation
  test("Create Transaction (POST)", async ({ request }) => {
    const responseobj = await request.post(baseURL + "/api/transactions", {
      headers: authHeaders,
      data: transactiondataFactory(userId),
    });

    await logApiResponse(responseobj, "Create Transaction Response");
    await expectStatus(responseobj, 201);
    const body = await parseJson(responseobj);

    transactionId = body.transactionId;
    expect(transactionId).toBeTruthy(); //ID must not be null
    
  });

  test("Get User Transactions (GET)", async ({ request }) => {
    const responseobj = await request.get(baseURL + "/api/transactions/${userId}", {
      headers: authHeaders,
    });

    await logApiResponse(responseobj, "Get User Transaction Response");
    await expectStatus(responseobj, 200);
    const body = await parseJson(responseobj);

    expect(body.transactionId).toBe(transactionId);  //assumption there will be a transactionId
  });

  // Error Scenarios
  test("Error: Unauthorized transaction(missing header)", async ({ request }) => {
    const responseobj = await request.post(baseURL + "/api/transactions", {
      data: mockedTrans,
      
    });

    await logApiResponse(responseobj, "Post Transaction Response when missing header");
    await expectStatus(responseobj, 401);
  });

  test("Error: Invalid transaction data", async ({ request }) => {
    const responseobj = await request.post(baseURL + "/api/transactions", {
      headers: authHeaders,
      data: { userId, amount: -500 }, // invalid json
    });

    await logApiResponse(responseobj, "Post Transaction Response with invalid header");
    await expectStatus(responseobj, 400);
  });
});