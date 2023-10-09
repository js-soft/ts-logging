import { ILogger, ILoggerFactory } from "@js-soft/logging-abstractions";
import * as log4js from "log4js";
import { registerLog4jsJsonLayout } from "./jsonLayout";

export class NodeLoggerFactory implements ILoggerFactory {
    public constructor(configuration: log4js.Configuration) {
        registerLog4jsJsonLayout();
        log4js.configure(configuration);
    }

    public getLogger(name: string | Function): ILogger {
        return log4js.getLogger(name instanceof Function ? name.name : name);
    }

    public close(): void {
        log4js.shutdown();
    }
}
