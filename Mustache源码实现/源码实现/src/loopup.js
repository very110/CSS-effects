export default function loopUp(dataObj,key){
    if (key.includes('.')&&key!=='.'){
        let keys=key.split('.');
        for (let i = 0; i < keys.length; i++) {
            dataObj=dataObj[keys[i]]
        }
        return dataObj;
    }
    console.log(dataObj[key],key)
    if (!(dataObj[key] instanceof Array) && dataObj[key] instanceof Object){
        return JSON.stringify(dataObj[key])
    }


    return dataObj[key]||key;
}
