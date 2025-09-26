import { APIResponse, expect } from "@playwright/test";

/**
 * Assert status code of API response
 */
export async function expectStatus(response: APIResponse, statusCode: number) {
  expect(response.status(), `Expected status ${statusCode}, got ${response.status()}`).toBe(statusCode);
}

/**
 * Assert that a JSON response has a specific field/value
 */
export async function expectJsonField<T>(
  response: APIResponse,
  field: string,
  expectedValue: T
) {
  const body = await response.json();
  expect(body[field], `Expected field '${field}' to equal ${expectedValue}, got ${body[field]}`).toEqual(expectedValue);
}
