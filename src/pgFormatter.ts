import { execFile } from "child_process";
import { resolve as resolvePath } from "path";
import { buildArguments, camelCaseToKebabCase } from "./utils";
import { PgFormatOptions } from "./options";

export function format(
    code: string,
    options: PgFormatOptions = {}
): Promise<string> {
    return new Promise((resolve, reject) => {
        const args = buildArguments(options);
        args.push("-");

        const pgFormatBinaryPath = resolvePath(
            __dirname,
            "../assets/pg-formatter/pg_format"
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
