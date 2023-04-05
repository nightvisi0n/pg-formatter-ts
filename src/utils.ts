import { PgFormatOptions } from "./options";

export function camelCaseToKebabCase(str: string): string {
    return str
        .replace(
            /([A-Z])(?=[A-Z][a-z])/g,
            (match, p1) => `${p1.toLowerCase()}-`
        )
        .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
        .toLowerCase();
}

export function buildArguments(options: PgFormatOptions): string[] {
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
