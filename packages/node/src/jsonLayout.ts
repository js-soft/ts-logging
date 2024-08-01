/* eslint-disable @typescript-eslint/naming-convention */

import correlationIdLib from "correlation-id";
import stringify from "json-stringify-safe";
import log4js, { LoggingEvent } from "log4js";
import util from "util";

function jsonFormat(logEvent: LoggingEvent) {
    const json: any = {
        "@t": logEvent.startTime,
        "@mt": util.format(...logEvent.data),
        "@l": logEvent.level.levelStr
    };

    const correlationId = correlationIdLib.getId();
    if (correlationId) json["correlationId"] = correlationId;

    return stringify(json);
}

export function registerLog4jsJsonLayout(): void {
    log4js.addLayout("json", () => jsonFormat);
}
