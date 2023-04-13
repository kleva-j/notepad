import { expect, test } from "@playwright/test";

test.setTimeout(35e3);

test("Sample test", () => {
	expect(true).toBeTruthy();
});
