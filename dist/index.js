/**
 * @author heart
 * @description
 * @Date 2022-11-19
 */
import { logger } from "@cc-heart/utils";
import { execSync } from "child_process";
import { readFileSync, writeFileSync } from "fs";
import { createFile, exist, getPackageName } from "./lib/fs.js";
import config from "./lib/config.js";
import { generateCurrentData } from "./lib/date.js";
import { resolve } from "path";
function bootstrap() {
    const { overridePackage } = config;
    const curDate = generateCurrentData();
    const bool = exist(`/${curDate}/package.json`);
    if (bool) {
        throw new Error("package.json is exist");
    }
    try {
        const stdout = execSync(`mkdir ${curDate} && cd ${curDate} && npm init --y`);
        const packagePath = getPackageName(stdout.toString());
        let jsonData = readFileSync(packagePath, {
            encoding: "utf8",
        });
        try {
            jsonData = JSON.parse(jsonData);
        }
        catch (e) {
            throw new Error(e.message);
        }
        if (typeof jsonData === "object") {
            jsonData = Object.assign({}, jsonData, overridePackage);
            writeFileSync(packagePath, JSON.stringify(jsonData, null, 4), {
                encoding: "utf8",
            });
            createFile(resolve(packagePath, "../index.ts"), config.overridePackage.author);
            logger.success("create file success:", packagePath);
        }
    }
    catch (error) {
        if (error) {
            throw new Error(error.message);
        }
    }
}
bootstrap();
