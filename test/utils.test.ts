import { PgFormatOptions } from "../src/options";
import { buildArguments, camelCaseToKebabCase } from "../src/utils";

describe("Utils", () => {
    describe("camelCaseToKebabCase", () => {
        test("should convert camelCase to kebab-case", () => {
            expect(camelCaseToKebabCase("camelCaseToKebabCase")).toBe(
                "camel-case-to-kebab-case"
            );
            expect(camelCaseToKebabCase("CAPSInBetween")).toBe(
                "caps-in-between"
            );
            expect(camelCaseToKebabCase("numbers123LikeThis")).toBe(
                "numbers123-like-this"
            );
            expect(camelCaseToKebabCase("numbersAfterLetters45")).toBe(
                "numbers-after-letters45"
            );
            expect(camelCaseToKebabCase("45NumbersBeforeLetters")).toBe(
                "45-numbers-before-letters"
            );
            expect(camelCaseToKebabCase("multipleUPPERCase")).toBe(
                "multiple-upper-case"
            );
        });
    });

    describe("buildArguments", () => {
        test("should build arguments from PgFormatOptions", () => {
            const options: PgFormatOptions = {
                anonymize: true,
                keywordCase: 2,
                spaces: 2,
            };

            const args = buildArguments(options);

            expect(args).toEqual([
                "--anonymize",
                "--keyword-case",
                "2",
                "--spaces",
                "2",
            ]);
        });

        test("should ignore undefined options", () => {
            const options: PgFormatOptions = {
                anonymize: undefined,
                keywordCase: 2,
                spaces: 2,
            };

            const args = buildArguments(options);

            expect(args).toEqual(["--keyword-case", "2", "--spaces", "2"]);
        });

        test("should handle boolean options correctly", () => {
            const optionsWithTrue: PgFormatOptions = {
                nocomment: true,
                wrapLimit: 80,
            };

            const optionsWithFalse: PgFormatOptions = {
                nocomment: false,
                wrapLimit: 80,
            };

            const argsWithTrue = buildArguments(optionsWithTrue);
            const argsWithFalse = buildArguments(optionsWithFalse);

            expect(argsWithTrue).toContain("--nocomment");
            expect(argsWithFalse).not.toContain("--nocomment");
        });
    });
});
