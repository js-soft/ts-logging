import * as fs from "fs";
import { NodeLoggerFactory } from "../src";

describe("Node Logger Tests", function () {
    const filePath = "./log/output.log";
    const factory = new NodeLoggerFactory({
        appenders: { file: { type: "file", filename: filePath } },
        categories: { default: { appenders: ["file"], level: "trace" } }
    });

    test("should log into the file", () => {
        const logger = factory.getLogger("test");
        logger.debug("test");
        logger.error("test");
        logger.trace("test");
        factory.close();

        const exist = fs.existsSync(filePath);
        expect(exist).toBeTruthy();

        const lines = fs.readFileSync(filePath).toString().split("\n");
        expect(lines.length).toBeGreaterThanOrEqual(1);
    });
});
