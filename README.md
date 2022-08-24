# Configuredjs
Package for managing config for your applications.

### Usage

```js
export const config = configured({
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

Your application can than use `config.port` etc.