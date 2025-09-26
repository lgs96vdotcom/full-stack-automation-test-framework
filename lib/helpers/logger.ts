

// This Logger method prints status, URL, and body in a formatted way.
import { APIResponse } from "@playwright/test";

export async function logApiResponse(
  responseobj: APIResponse,
  label: string = "API Response"
) {
  const status = responseobj.status();
  const url = responseobj.url();
  const bodyText = await responseobj.text();

  const log = {
    url,
    status,
    body: tryParseJson(bodyText),
  };

  console.log("\n======= ${label} =======");
  console.log("URL: ${url}");
  console.log("Status: ${status}");
  console.log("Body: ${bodyText}");
  console.log("=======================\n");
}