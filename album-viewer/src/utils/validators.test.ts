import { describe, expect, it } from "vitest";
import { validateDate, validateIPV6 } from "./validators";
// test the validateDate function with vitest
describe("validateDate", () => {
    it("should return a Date object for valid date string", () => {
        const dateString = "25/12/2020";
        const result = validateDate(dateString);
        expect(result).toBeInstanceOf(Date);
        expect(result?.getDate()).toBe(25);
        expect(result?.getMonth()).toBe(11); // Months are zero-based
        expect(result?.getFullYear()).toBe(2020);
    });

    it("should return null for invalid date string format", () => {
        const dateString = "2020-12-25";
        const result = validateDate(dateString);
        expect(result).toBeNull();
    });

    it("should return null for invalid date values", () => {
        const dateString = "31/02/2020"; // Invalid date
        const result = validateDate(dateString);
        expect(result).toBeNull();
    });  