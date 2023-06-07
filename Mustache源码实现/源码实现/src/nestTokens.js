export default function nestTokens(tokens){
    const nestedTokens=[];
    const stack = [];
    let collector=nestedTokens;

    for (let i=0;i<tokens.length;i++){
        let token=tokens[i];
        switch (token[0]){
            case '#':{
                collector.push(token);
                stack.push(token);
                collector=token[2]=[];
                break;
            }
            case '/':{
                stack.pop();
                collector=stack.length>0?stack[stack.length-1][2]:nestedTokens;
                break;
            }
            default:{
                collector.push(token);
            }
        }
    }
    return nestedTokens;
}
