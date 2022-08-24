import fs from 'fs';
export default function configured<T>(params:{path:string,writeMissing?:boolean,defaultConfig:T}):T{
    if(!fs.existsSync(params.path)){
        if(params.writeMissing){
            fs.writeFileSync(params.path,JSON.stringify(params.defaultConfig,null,2),{encoding:"utf-8"});
        }
        return params.defaultConfig;
    }
    let config = JSON.parse(fs.readFileSync(params.path,{encoding:"utf-8"}));
    let preConfig = JSON.stringify(config);
    config = mergeConfig(config,params.defaultConfig);
    let postConfig = JSON.stringify(config);

    if(preConfig !== postConfig && params.writeMissing){
        fs.writeFileSync(params.path,JSON.stringify(config,null,2),{encoding:"utf-8"});
    }

    return config;
}

function mergeConfig(config:any,defaultConfig:any){
    Object.keys(defaultConfig).forEach(key=>{
        if(config[key] === undefined){
            config[key] = defaultConfig[key];
        }else if(typeof defaultConfig[key] === 'object'){
            config[key] = mergeConfig(config[key],defaultConfig[key]);
        }
    })
    return config;
}