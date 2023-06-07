const path=require('path');
module.exports={
    mode:'development',
    entry:path.resolve('./src/main.js'),
    output:{
        path:undefined,
        filename:'main.js'
    },


    devServer:{
        contentBase:path.resolve(__dirname,"public"),
        open:true,
        port:8080,
        compress:false,
        publicPath:"/xuni/"
    }
}
