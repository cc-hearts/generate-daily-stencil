import { existsSync, writeFileSync } from "fs";
import { resolve } from "path";
import { fileURLToPath } from "url";
import { generateCurrentData } from "./date.js";

export function getPackageName(pack: string): string | null {
  const reg = /to\s*(.*?package\.json)/gm;
  if (reg.test(pack)) {
    return RegExp.$1;
  }
  return null;
}

export function exist(path: string): boolean {
  const currentPath = fileURLToPath(import.meta.url);
  return existsSync(resolve(currentPath, `../../.${path}`));
}

export function createFile(
  path: string,
  author: string,
  date = generateCurrentData()
) {
  writeFileSync(
    path,
    `/**
  * @author ${author}
  * @description
  * @Date ${date}
  */
`
  );
}
