import { ILogger, ILoggerFactory } from "@js-soft/logging-abstractions";
import { LFService, LoggerFactory, LoggerFactoryOptions, LogGroupRule, LogLevel } from "typescript-logging";
import { SimpleLogger } from "./SimpleLogger";

export class SimpleLoggerFactory implements ILoggerFactory {
    private readonly loggerFactory: LoggerFactory;

    public getLogger(name: string | Function): ILogger {
        const logger = this.loggerFactory.getLogger(name instanceof Function ? name.name : name);
        return new SimpleLogger(logger);
    }

    public constructor(
        logLevel: LogLevel = LogLevel.Warn,
        factoryId: string = Math.random().toString(36).substring(7)
    ) {
        this.loggerFactory = LFService.createNamedLoggerFactory(
            factoryId,
            new LoggerFactoryOptions().addLogGroupRule(new LogGroupRule(new RegExp(".*"), logLevel))
        );
    }
}
