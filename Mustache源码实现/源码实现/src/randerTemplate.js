import loopUp from "./loopup";
import parseArray from "./parseArray.js"
export default function renderTemplate(tokens,data){

    let resultStr=''
    for (let i = 0; i < tokens.length; i++) {

        let token=tokens[i];
        if (token[0]==='text'){
            resultStr+=token[1];
        }else if (token[0]==='name'){
            resultStr+=loopUp(data,token[1]);
        }else if (token[0]==='#'){
            resultStr+=parseArray(token,data);
        }
    }
    return resultStr;
}
