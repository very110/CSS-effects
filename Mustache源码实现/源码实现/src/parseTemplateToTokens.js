import Scanner from "./Scanner";
import nestTokens from "./nestTokens";

export default function parseTemplateToTokens(templateStr) {
    const scanner = new Scanner(templateStr);

    const tokens = [];
    let words;
    while (!scanner.eos()) {
        words = scanner.scanUtil('{{');
        words && tokens.push(['text',words.replace(/(\n)(  ){2,}/g,'')]);
        scanner.scan('{{');

        words = scanner.scanUtil('}}').trim();
        if (words !== '') {
            if (words[0] === '#') {
                tokens.push(['#', words.substring(1)]);
            } else if (words[0] === '/') {
                tokens.push(['/', words.substring(1)]);
            } else {
                tokens.push(['name', words]);
            }
        }
        scanner.scan('}}');
    }
    return nestTokens(tokens);

}
