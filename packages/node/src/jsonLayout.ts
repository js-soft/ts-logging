/* eslint-disable @typescript-eslint/naming-convention */

import correlationId from "correlation-id";
import stringify from "json-stringify-safe";
import log4js, { LoggingEvent } from "log4js";
import util from "util";

function jsonFormat(logEvent: LoggingEvent) {
    // The correlation id is undefined when no set in the current call stack
    const correlation = correlationId.getId();
    const json = {
        "@t": logEvent.startTime,
        "@mt": util.format(...logEvent.data),
        "@l": logEvent.level.levelStr,
        correlationId: correlation
    };

    return stringify(json);
}

export function registerLog4jsJsonLayout(): void {
    log4js.addLayout("json", () => jsonFormat);
}
