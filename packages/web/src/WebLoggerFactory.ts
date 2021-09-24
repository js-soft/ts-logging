import { ILogger, ILoggerFactory } from "@js-soft/logging-abstractions";
import Logger from "js-logger";

export class WebLoggerFactory implements ILoggerFactory {
    public init(): void {
        Logger.useDefaults({
            defaultLevel: Logger.TRACE
        });

        const consoleHandler = Logger.createDefaultHandler({
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
            localStorage.setItem("logs", `${oldEntry === null ? "" : oldEntry}${message}\n`);

            const loggerStorageName = `logs-${loggerName}`;
            const oldLoggerEntry = localStorage.getItem(loggerStorageName);
            localStorage.setItem(loggerStorageName, `${oldLoggerEntry === null ? "" : oldLoggerEntry}${message}\n`);
        };

        Logger.setHandler((messages: any[], context: any) => {
            appendLocalStorage(context.name, this.formatMessages(messages, context));
            consoleHandler(messages, context);
        });
    }

    public getLogger(oName: string | Function): ILogger {
        let sName = oName instanceof Function ? oName.name : oName;
        if (oName instanceof Function) {
            sName = oName.name;
        } else if (typeof oName === "string") {
            sName = oName;
        } else {
            sName = "";
        }

        return Logger.get(sName) as unknown as ILogger;
    }
}
