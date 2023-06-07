export default class Scanner{
    constructor(template) {
        this.template=template;
        this.pos=0;
        this.tail=template;
    }

    scan(tag){
        if (!this.eos()&&this.tail.indexOf(tag)===0){
            this.pos+=tag.length;
            this.tail=this.template.substring(this.pos);
        }
    }

    scanUtil(stopTag){
        const post_back=this.pos;
        let my_count=this.tail.indexOf(stopTag);
        if(!this.eos()&&my_count!==-1){
            this.pos=my_count+post_back;
            this.tail=this.template.substring(this.pos);
        }else if(my_count===-1){
            this.pos=this.template.length;
        }
        return this.template.substring(post_back,this.pos);
    }
    eos(){
        return this.pos>=this.template.length;
    }
}
