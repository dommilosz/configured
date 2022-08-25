import configured from "../index";
import fs from "fs";

//Unmodified files will have spaces in their content
const configFileContent = '{"a":{"b":{"c":{"d":"overwritten"} } } }'

const defaultConfig = {
    a: {
        b: {
            c: {
                d: "d-default"
            }
        },
        b2: {
            c: "c-default"
        }
    }
}

const configAfterMerge = {
    a: {
        b: {
            c: {
                d: "overwritten"
            }
        },
        b2: {
            c: "c-default"
        }
    }
}

describe('reading the non existing config', () => {
    const configFile = "./src/tests/read1.json"
    test("check to ensure the config doesn't exist", () => {
        if (fs.existsSync(configFile))
            fs.unlinkSync(configFile);
        expect(fs.existsSync(configFile)).toBeFalsy();
    });

    test('read the config file', () => {
        const config = configured({path: configFile, writeMissing: false, defaultConfig: defaultConfig});

        expect(config).toBeDefined();
        expect(config.a.b.c.d).toBe("d-default");
        expect(config.a.b2.c).toBe("c-default");
    });

    test("check to ensure the config wasn't created", () => {
        expect(fs.existsSync(configFile)).toBeFalsy();
    });
});

describe('reading the non existing config with writeMissing turned on', () => {
    const configFile = "./src/tests/read2.json"
    test("check to ensure the config doesn't exist", () => {
        if (fs.existsSync(configFile))
            fs.unlinkSync(configFile);
        expect(fs.existsSync(configFile)).toBeFalsy();
    });

    test('read the config file', () => {
        const config = configured({path: configFile, writeMissing: true, defaultConfig: defaultConfig});

        expect(config).toBeDefined();
        expect(config.a.b.c.d).toBe("d-default");
        expect(config.a.b2.c).toBe("c-default");
    });

    test("check to ensure the config wasn't created", () => {
        expect(fs.existsSync(configFile)).toBeTruthy();
        let file = fs.readFileSync(configFile, {encoding: "utf-8"});
        expect(JSON.stringify(JSON.parse(file))).toEqual(JSON.stringify(defaultConfig))
    });
})

describe('reading the config', () => {
    const configFile = "./src/tests/read3.json"
    test('prepare the config file for reading', () => {
        fs.writeFileSync(configFile, configFileContent, {encoding: "utf-8"});
    });

    test('read the config file', () => {
        const config = configured({path: configFile, writeMissing: false, defaultConfig: defaultConfig});

        expect(config).toBeDefined();
        expect(config.a.b.c.d).toBe("overwritten");
        expect(config.a.b2.c).toBe("c-default");
    });

    test('test to check is the file not changed', () => {
        let file = fs.readFileSync(configFile, {encoding: "utf-8"});
        expect(file).toEqual(configFileContent);
    })
})

describe('reading the config with writeMissing turned on', () => {
    const configFile = "./src/tests/read4.json"
    test('prepare the config file for reading', () => {
        fs.writeFileSync(configFile, configFileContent, {encoding: "utf-8"});
    });

    test('read the config file', () => {
        const config = configured({path: configFile, writeMissing: true, defaultConfig: defaultConfig});

        expect(config).toBeDefined();
        expect(config.a.b.c.d).toBe("overwritten");
        expect(config.a.b2.c).toBe("c-default");
    });

    test('test to check is the file changed', () => {
        let file = fs.readFileSync(configFile, {encoding: "utf-8"});
        expect(file).not.toEqual(configFileContent);
        expect(JSON.stringify(JSON.parse(file))).toEqual(JSON.stringify(configAfterMerge))
    })
})