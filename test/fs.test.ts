import { getPackageName, exist } from "../lib/fs";

describe("getPackageName matching test", () => {
  test("matching package path when generator package.json", () => {
    const resultPath = "/Users/heart/Desktop/tmp/2022-11-19/mk/package.json";
    const pack = `Wrote to /Users/heart/Desktop/tmp/2022-11-19/mk/package.json:                                                                                                                                                    10:56:09

  {
    "name": "mk",
    "version": "1.0.0",
    "main": "index.js",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
    },
    "keywords": [],
    "author": "",
    "license": "MIT",
    "description": ""
  }`;

    const result = getPackageName(pack);

    expect(result).toBe(resultPath);
  });

  test("matching packages output null when package name is empty string", () => {
    const pack = `Wrote to /:                                                                                                                                                    10:56:09

    {
      "name": "mk",
      "version": "1.0.0",
      "main": "index.js",
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      "keywords": [],
      "author": "",
      "license": "MIT",
      "description": ""
    }`;
    const result = getPackageName(pack);

    expect(result).toBeNull();
  });
});

describe("exist matching test", () => {
  test("output false when exist matching path is '/example/data'", () => {
    const path = "/example/data";

    const bool = exist(path);

    expect(bool).toBeFalsy();
  });

  test("output true when exist matching path is '/lib'", () => {
    const path = "/lib";

    const bool = exist(path);

    expect(bool).toBeTruthy();
  });
});
