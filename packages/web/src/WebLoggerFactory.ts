import { ILogger, ILoggerFactory } from "@js-soft/logging-abstractions";
import jsLogger from "js-logger";
import { WebLogger } from "./WebLogger";

export class WebLoggerFactory implements ILoggerFactory {
    public init(): void {
        jsLogger.useDefaults({
            defaultLevel: jsLogger.TRACE
        });

        const consoleHandler = jsLogger.createDefaultHandler({
            formatter: function (messages, context) {
                messages.unshift(`${new Date().toISOString()} [${context.name === "" ? "default" : context.name}]`);
            }
        });
        this._initWeb(consoleHandler);
    }

    public formatMessages(messages: any[], context: Function): string {
        let formattedMessage = "";
        for (const message of messages) {
            formattedMessage += JSON.stringify(message);
        }
        const contextString = !context.name ? "default" : context.name;
        return `${new Date().toISOString()} [${contextString}] ${formattedMessage}`;
    }

    private _initWeb(consoleHandler: Function) {
        const appendLocalStorage = (loggerName: string, message: string) => {
            const oldEntry = localStorage.getItem("logs");
            localStorage.setItem("logs", `${oldEntry ?? ""}${message}\n`);

            const loggerStorageName = `logs-${loggerName}`;
            const oldLoggerEntry = localStorage.getItem(loggerStorageName);
            localStorage.setItem(loggerStorageName, `${oldLoggerEntry ?? ""}${message}\n`);
        };

        jsLogger.setHandler((messages: any[], context: any) => {
            appendLocalStorage(context.name, this.formatMessages(messages, context));
            consoleHandler(messages, context);
        });
    }

    public getLogger(nameOrConstructor: string | Function): ILogger {
        const name = nameOrConstructor instanceof Function ? nameOrConstructor.name : nameOrConstructor;

        const logger = jsLogger.get(name);
        return new WebLogger(logger);
    }
}
