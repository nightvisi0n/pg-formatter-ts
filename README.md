# pg-formatter-ts [![npm](https://img.shields.io/npm/v/pg-formatter-ts.svg)](https://www.npmjs.com/package/pg-formatter-ts)

![pg-formatter-ts logo](./assets/logo.png)

`pg-formatter-ts` is a TypeScript library that wraps the pgFormatter CLI tool for formatting PostgreSQL SQL code.  
With a simple and easy-to-use API, it provides the ability to format SQL code programmatically with various formatting options.

Compared to the existing [`pg-formatter`](https://github.com/gajus/pg-formatter) library, `pg-formatter-ts` offers improved TypeScript support and better integration with modern TypeScript/JavaScript projects. This library utilizes the same underlying CLI tool, but provides a more streamlined and developer-friendly API.
Additionally, `pg-formatter-ts` supports all available CLI options of pgFormatter, allowing for greater customization and control over the formatting process.

## Installation

```bash
yarn install pg-formatter-ts
```

### A word on the library size

Please note that the unpacked size of `pg-formatter-ts` is larger than usual (several MB) because it includes the `pgFormatter` binary for convenience.

## Usage

```typescript
import { format, PgFormatOptions } from "pg-formatter-ts";

const sqlCode = "SELECT id, name, age FROM users WHERE age >= 18;";
const options: PgFormatOptions = {
    keywordCase: 2,
    spaces: 2,
};

format(sqlCode, options).then((formattedCode) => {
    console.log(formattedCode);
});
```

## Options

`pg-formatter-ts` accepts an optional `PgFormatOptions` object as a parameter for the `format` function. The options available are:

```typescript
interface PgFormatOptions {
    anonymize?: boolean;
    commaStart?: boolean;
    commaBreak?: boolean;
    config?: string;
    wrapComment?: boolean;
    debug?: boolean;
    commaEnd?: boolean;
    functionCase?: number;
    format?: string;
    nogrouping?: boolean;
    help?: boolean;
    inplace?: boolean;
    keepNewline?: boolean;
    noExtraLine?: boolean;
    maxlength?: number;
    multiline?: boolean;
    nocomment?: boolean;
    numbering?: boolean;
    output?: string;
    placeholder?: string;
    redshift?: boolean;
    spaces?: number;
    separator?: string;
    formatType?: boolean;
    tabs?: boolean;
    keywordCase?: number;
    typeCase?: number;
    version?: boolean;
    wrapLimit?: number;
    wrapAfter?: number;
    noRcfile?: boolean;
    extraFunction?: string;
    extraKeyword?: string;
    noSpaceFunction?: boolean;
}
```

For a detailed explanation of each option, refer to the [pgFormatter documentation](https://github.com/darold/pgFormatter).

## Disclaimer

The code for this library and this README were generated by an AI called GPT-4, developed by OpenAI. While GPT-4 strives for accuracy, it is possible that the code and documentation may contain errors or inconsistencies. Please feel free to report any issues or submit pull requests with improvements, as your contributions are welcome and appreciated.

## License

This project is licensed under the [MIT License](https://opensource.org/license/mit/).
