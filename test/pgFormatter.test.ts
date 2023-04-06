import { PgFormatOptions } from "../src/options";
import { format } from "../src/pgFormatter";

describe("pgFormatter", () => {
    test("should format SQL code", async () => {
        const inputSQL = "SELECT * FROM table WHERE id=1;";
        const expectedOutputSQL = `SELECT
    *
FROM
    TABLE
WHERE
    id = 1;

`;

        const result = await format(inputSQL);
        expect(result).toBe(expectedOutputSQL);
    });

    test("should format SQL code with specified case for keywords", async () => {
        const inputSQL = "SELECT * FROM table WHERE id=1;";
        const expectedOutputSQL = `select
    *
from
    table
where
    id = 1;

`;
        const options: PgFormatOptions = {
            keywordCase: 1, // lowercase
        };

        const result = await format(inputSQL, options);
        expect(result).toBe(expectedOutputSQL);
    });

    test("should format SQL code with specified case for function names", async () => {
        const inputSQL = "SELECT COUNT(*) FROM table WHERE id=1;";
        const expectedOutputSQL = `SELECT
    count(*)
FROM
    TABLE
WHERE
    id = 1;

`;
        const options: PgFormatOptions = {
            functionCase: 1, // capitalize
        };

        const result = await format(inputSQL, options);
        expect(result).toBe(expectedOutputSQL);
    });

    test("should format SQL code with specified number of spaces for indentation", async () => {
        const inputSQL = "SELECT * FROM table WHERE id=1;";
        const expectedOutputSQL = `SELECT
  *
FROM
  TABLE
WHERE
  id = 1;

`;
        const options: PgFormatOptions = {
            spaces: 2, // 2 spaces for indentation
        };

        const result = await format(inputSQL, options);
        expect(result).toBe(expectedOutputSQL);
    });

    test("should format SQL code with tabs for indentation", async () => {
        const inputSQL = "SELECT * FROM table WHERE id=1;";
        const expectedOutputSQL = `SELECT
\t*
FROM
\tTABLE
WHERE
\tid = 1;

`;
        const options: PgFormatOptions = {
            tabs: true, // use tabs for indentation
        };

        const result = await format(inputSQL, options);
        expect(result).toBe(expectedOutputSQL);
    });

    test("should remove comments", async () => {
        const inputSQL = `-- This is a comment
SELECT * FROM table WHERE id=1;`;
        const expectedOutputSQL = `SELECT
    *
FROM
    TABLE
WHERE
    id = 1;

`;
        const options: PgFormatOptions = {
            nocomment: true, // remove comments
        };

        const result = await format(inputSQL, options);
        expect(result).toBe(expectedOutputSQL);
    });

    test("should reject if an error occurs", async () => {
        const inputSQL = "SELECT * FROM table WHERE id=1;";

        // Pass an invalid option value
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const options: PgFormatOptions = { keywordCase: "invalid-case" as any };
        await expect(format(inputSQL, options)).rejects.toThrow();
    });
});
