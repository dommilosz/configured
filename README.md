# Configuredjs
Package for managing config for your applications.

It has Typescript typings included. Config type returned from default function will be the same as type of defaultConfig.

### Usage

```js
import configured from "configuredjs";
//or
const configured = require("configuredjs");

const config = configured({
    path: "config.json", writeMissing: true, defaultConfig: {
        port:8080,
        rateLimits:{
            window:15 * 60,
            limit:30
        },
    }
})

console.log(config.port); //8080 or whatever was overwritten by local config.json file 
```
If writeMissing is enabled all missing props will be written to the config file.
writeMissing parameter is optional

Your application can than use `config.port` etc.