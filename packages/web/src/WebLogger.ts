import { ILogger } from "@js-soft/logging-abstractions";
import * as JsLogger from "js-logger";
import stringify from "json-stringify-safe";

export class WebLogger implements ILogger {
    public constructor(private readonly logger: JsLogger.ILogger) {}

    public trace(...args: any[]): void {
        this.logger.trace(this.formatMessage(args));
    }

    public debug(...args: any[]): void {
        this.logger.debug(this.formatMessage(args));
    }

    public info(...args: any[]): void {
        this.logger.info(this.formatMessage(args));
    }

    public warn(...args: any[]): void {
        this.logger.warn(this.formatMessage(args));
    }

    public error(...args: any[]): void {
        this.logger.error(this.formatMessage(args));
    }

    public fatal(...args: any[]): void {
        this.logger.error(this.formatMessage(args));
    }

    private formatMessage(args: any[]) {
        const message = args
            .map((arg) => {
                if (arg instanceof Error) {
                    return arg.stack ?? `${arg.name}: ${arg.message}`;
                }
                return stringify(arg);
            })
            .join("\n");
        return { msg: message };
    }
}
