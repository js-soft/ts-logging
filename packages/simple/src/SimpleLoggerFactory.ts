import { ILogger, ILoggerFactory } from "@js-soft/logging-abstractions";
import { LogLevel } from "typescript-logging";
import { Log4TSProvider } from "typescript-logging-log4ts-style";
import { SimpleLogger } from "./SimpleLogger";

export class SimpleLoggerFactory implements ILoggerFactory {
    private readonly provider: Log4TSProvider;

    public getLogger(name: string | Function): ILogger {
        const logger = this.provider.getLogger(name instanceof Function ? name.name : name);
        return new SimpleLogger(logger);
    }

    public constructor(
        logLevel: LogLevel = LogLevel.Warn,
        factoryName: string = Math.random().toString(36).substring(7)
    ) {
        this.provider = Log4TSProvider.createProvider(factoryName, {
            groups: [
                {
                    expression: new RegExp(".*"),
                    level: logLevel
                }
            ]
        });
    }
}
