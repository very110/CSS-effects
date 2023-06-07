import parseTemplateToTokens from "./parseTemplateToTokens";
import renderTemplate from "./randerTemplate";

window.zzf_Mustache = {
    render(template, data) {
        //就俩件事
        // 1.将普通字符串转成tokens数组
        // 2.将tokens转换为domStr

        let tokens = parseTemplateToTokens(template);
        console.log(tokens)
        let domStr = renderTemplate(tokens, data)
        return domStr;
    }
}
