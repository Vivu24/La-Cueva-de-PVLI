export const intItems = {
    1: {key:"breakout_item",   x: 100, y:50,    rectX: 100, rectY:100},
    2: {key: "ices_item" ,     x: 75,  y:192,   rectX: 75,  rectY:192},
    3: {key: "platforms_item", x: 280, y:200,   rectX: 280, rectY:200},
    4: {key: "tree_item",      x: 500, y: 190 , rectX: 500, rectY:190},
    5: {key: "shoot_item",     x: 750, y: 200,  rectX: 750, rectY:200}
}

export const cocktails = {
    //hielos 0->no, 1-> si
    //breakout -1 ->no lleva
    "purple_sky" : { 
       key: "purple_sky", 
       ice: 1,
       others: -1,
       alcohol: 1,
       refreshment: 1,
       fruit: 1
    },
    "mojito" : {
        key: "mojito",
        ice: 1,
        others: 2,
        alcohol: 2,
        refreshment: 2,
        fruit: 1
     },
     "blue_lagoon" : {
        key:"blue_lagoon",
        ice: 1,
        others: -1,
        alcohol: 3,
        refreshment: 3,
        fruit: 3
     },
     "margarita" : {
        key: "margarita",
        ice: 0,
        others: 1,
        alcohol: 4,
        refreshment: 4,
        fruit: 2
     }
}
//lISTA DE INGREDIENTES
export const alcoholicDrinks = {
    1: "vodka",
    2: "white_ron",
    3: "gin",
    4: "tequila"
}
export const refreshments = {
    1: "coke",
    2: "lemon",
    3: "blue",
    4: "orange"
}
export const fruits  = {
    1: "blackberry_fruit",
    2: "lime_fruit",
    3: "lemon_fruit"
}
export const others = {
    1: "azucar",
    2: "hierbabuena"
}