let datestr = [{
    id: 1,
    name: 'gg',
    goods: [{
        id: 11,
        name: 'c'
    },
        {
            id: 12,
            name: 'a'
        }
    ]
},
    {
        id: 2,
        name: 'p',
        goods: [{
            id: 11,
            name: 'c'
        },
            {
                id: 16,
                name: 'a'
            }
        ]
    }
]

function das(dat, id) {

    let val = undefined;
    for (let i = 0; i < dat.length; i++) {
        if (dat[i].id === id) {
            return dat[i];
        } else if (dat[i].goods) {
            if((val = das(dat[i].goods, id))){
                return val;
            }
        }
    }
    return val
}
console.log(das(datestr, 12));
