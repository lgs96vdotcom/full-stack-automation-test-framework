import { test, expect } from "@playwright/test";
import { transactiondataFactory } from "../../lib/datafactory/transactiondata";


test.describe("UI - Transaction Flow", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/mock-ui/transaction");
  });

  test("Successful Transaction Creation", async ({ page }) => {
    
    const mockedTransaction =transactiondataFactory("123")

    await page.route("**/api/transactions", async (route) => {
      const json = { id: "txn-001", ...mockedTransaction };
      await route.fulfill({ status: 201, body: JSON.stringify(json) });
    });

    await page.fill("#amount", mockedTransaction.amount.toString());
    await page.selectOption("#type", mockedTransaction.type);
    await page.fill("#recipientId", mockedTransaction.recipientId);
    await page.click("#submit");

    await expect(page.locator("#successMessage")).toContainText(
      "Transaction created"
    );
    await expect(page.getByText(mockedTransaction.amount.toString())).toBeVisible();
  });

  test("Error: Invalid Amount", async ({ page }) => {
    const mockedTransaction = transactiondataFactory("123");
    mockedTransaction.amount = -500; // invalid amount

    await page.route("**/api/transactions", async (route) => {
      await route.fulfill({
        status: 400,
        body: JSON.stringify({ error: "Invalid transaction amount" }),
      });
    });

    await page.fill("#amount", mockedTransaction.amount.toString());
    await page.selectOption("#type", mockedTransaction.type);
    await page.fill("#recipientId", mockedTransaction.recipientId);
    await page.click("#submit");

    await expect(page.locator("#errorMessage")).toContainText(
      "Invalid transaction amount"
    );
  });
});