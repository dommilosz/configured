import configured from "../index";
import fs from "fs";

const configFile = "./src/tests/read.json"
const configFileContent = '{"a":{"b":{"c":{"d":"overwritten"} } } }'
const defaultConfig = {
    a: {
        b: {
            c: {
                d: "d-default"
            }
        },
        b2:{
            c:"c-default"
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
        b2:{
            c:"c-default"
        }
    }
}

describe('reading config',()=>{
    test('prepare the config file for reading',()=>{
        fs.writeFileSync(configFile, configFileContent, {encoding: "utf-8"});
    });

    test('read the config file', () => {
        const config = configured({path: configFile, writeMissing: false, defaultConfig: defaultConfig});

        expect(config).toBeDefined();
        expect(config.a.b.c.d).toBe("overwritten");
        expect(config.a.b2.c).toBe("c-default");
    });

    test('test to check is the file not changed',()=>{
        let file = fs.readFileSync(configFile,{encoding:"utf-8"});
        expect(file).toEqual(configFileContent);
    })
})

describe('reading config with writeMissing turned on',()=>{
    test('prepare the config file for reading',()=>{
        fs.writeFileSync(configFile, configFileContent, {encoding: "utf-8"});
    });

    test('read the config file', () => {
        const config = configured({path: configFile, writeMissing: true, defaultConfig: defaultConfig});

        expect(config).toBeDefined();
        expect(config.a.b.c.d).toBe("overwritten");
        expect(config.a.b2.c).toBe("c-default");
    });

    test('test to check is the file changed',()=>{
        let file = fs.readFileSync(configFile,{encoding:"utf-8"});
        expect(file).not.toEqual(configFileContent);
        expect(JSON.stringify(JSON.parse(file))).toEqual(JSON.stringify(configAfterMerge))
    })
})