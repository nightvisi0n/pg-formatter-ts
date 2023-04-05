import { execFile } from "child_process";
import { resolve as resolvePath } from "path";
import { camelCaseToKebabCase } from "./utils";

export interface PgFormatOptions {
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

export function format(
    code: string,
    options: PgFormatOptions = {}
): Promise<string> {
    return new Promise((resolve, reject) => {
        const args = buildArguments(options);
        args.push("-");

        const pgFormatBinaryPath = resolvePath(
            __dirname,
            "pg-formatter/pg_format"
        );
        const pgFormatProcess = execFile(
            "perl",
            [pgFormatBinaryPath, ...args],
            (error, stdout, stderr) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(stdout);
                }
            }
        );

        pgFormatProcess.stdin?.write(code);
        pgFormatProcess.stdin?.end();
    });
}

function buildArguments(options: PgFormatOptions): string[] {
    const args = [];

    for (const [key, value] of Object.entries(options)) {
        if (value !== undefined) {
            const kebabCaseKey = camelCaseToKebabCase(key);
            const option = `--${kebabCaseKey}`;

            if (typeof value === "boolean") {
                args.push(option);
            } else {
                args.push(option, value.toString());
            }
        }
    }

    return args;
}
