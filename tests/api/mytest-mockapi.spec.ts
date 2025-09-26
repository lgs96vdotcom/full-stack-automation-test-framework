import { test, expect} from "@playwright/test";
import { newFruitjson } from "../../lib/datafactory/userdata";

test("Gets the json from api and adds a new fruit", async ({ page }) => {
   
  // Get the response and add to it
  await page.route("*/**/api/v1/fruits", async route => {
    const response = await route.fetch();
    const json = await response.json();
    const newFruit = newFruitjson();
    json.push(newFruit);
    // Fulfill using the original response, while patching the response body
    // with the given JSON object.
    await route.fulfill({ response, json });
  });

  // Go to the page
  await page.goto("https://demo.playwright.dev/api-mocking");

  // Wait for a fixed 2 seconds
  await page.waitForTimeout(2000);

  // Assert that the new fruit is visible
  await expect(page.getByText("Grapes", { exact: true })).toBeVisible();

});