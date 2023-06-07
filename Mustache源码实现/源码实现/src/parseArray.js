import renderTemplate from "./randerTemplate";
import loopUp from "./loopup";
export default function parseArray(token,data){
    let resultStr='';
    let v=loopUp(data,token[1]);

    for (let i=0;i<v.length;i++){

        let dataObj={
            ...v[i],
            '.':v[i]
        }
        resultStr+=renderTemplate(token[2],dataObj);
    }
    return resultStr;
}
