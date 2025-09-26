import { APIResponse } from "@playwright/test";

/**
 * Parse JSON safely from an API response
 */
export async function parseJson<T = any>(response: APIResponse): Promise<T> {
  try {
    return await response.json();
  } catch (err) {
    throw new Error("Failed to parse JSON: ${err}");
  }
}

/**
 * Get standard authorization headers
 */
export function getAuthHeaders(token: string) {
  return {
    Authorization: "Bearer ${token}",
    "Content-Type": "application/json",
  };
}
