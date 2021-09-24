export interface ILogger {
    trace(...messages: any[]): void;
    debug(...messages: any[]): void;
    info(...messages: any[]): void;
    warn(...messages: any[]): void;
    error(...messages: any[]): void;
    fatal(...messages: any[]): void;
}
