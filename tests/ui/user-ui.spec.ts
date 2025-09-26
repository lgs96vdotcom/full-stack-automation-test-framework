import { test, expect } from "@playwright/test";
import { userjsondataFactory } from "../../lib/datafactory/userdata";

// Mock frontend page for user registration
test.describe("UI - User Registration Flow", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to mock frontend
    await page.goto("/mock-ui/register");
  });

  test("Successful User Registration", async ({ page }) => {
    const mockedUser = userjsondataFactory();

    // Mock the backend API response
    await page.route("**/api/users", async (route) => {
      const json = { id: "123", ...mockedUser };
      await route.fulfill({ status: 201, body: JSON.stringify(json) });
    });

    // Fill UI form -- clarify assumption about locators
    await page.fill("#name", mockedUser.name);
    await page.fill("#email", mockedUser.email);
    await page.selectOption("#accountType", mockedUser.accountType);
    await page.click("#submit");

    // Validate success state in UI
    await expect(page.locator("#successMessage")).toContainText("User created");
    await expect(page.getByText(mockedUser.name)).toBeVisible();
    await expect(page.getByText(mockedUser.email)).toBeVisible();
  });

  test("Error: Missing Email", async ({ page }) => {
    const mockedUser = userjsondataFactory();
    mockedUser.email = ""; // missing email

    await page.route("**/api/users", async (route) => {
      await route.fulfill({
        status: 400,
        body: JSON.stringify({ error: "Email is required" }),
      });
    });

    // Fill without email
    await page.fill("#name", mockedUser.name);
    await page.selectOption("#accountType", mockedUser.accountType);
    await page.click("#submit");

    // Validate error message
    await expect(page.locator("#errorMessage")).toContainText(
      "Email is required"
    );
  });
});