console.log(document.querySelector('#container').childNodes[0].nodeValue.trim());

import {
    init,
    classModule,
    propsModule,
    styleModule,
    eventListenersModule,
    h,
} from "snabbdom";

const patch = init([
    // Init patch function with chosen modules
    classModule, // makes it easy to toggle classes
    propsModule, // for setting properties on DOM elements
    styleModule, // handles styling on elements with support for animations
    eventListenersModule, // attaches event listeners
]);

const container = document.getElementById("container");

const myNode=h('div',{props:{a:10}},[
    h('li','牛'),
    h('li','牛'),
    h('li','牛',[
        h('ol','随便',[
            h('li','asd'),
            h('li','asd'),
            h('li','asd'),
        ])
    ]),
])


console.log([])
patch(container,myNode);

