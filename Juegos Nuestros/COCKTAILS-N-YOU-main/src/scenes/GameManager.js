//"Especia" del coctel actual
export var other = ''
export function setOther(num){
    other = num
}
//Refresco del coctel  actual
export var refreshment = ''
export function setRefreshment(name){
    refreshment = name
}
//Alcohol del coctel actual 
export var alcohol = ''
export function setAlcohol(name){
    alcohol = name
}
export var fruit = ''
export function setFruit(name){
    fruit = name;
}

//minijuego actual
export var currentminigame = "";
export function setMinigame(name){
 currentminigame = name;
}
export var currenttext = "";
export function setMM(name){
 currenttext = name;
}

let soundLevel = 100;
export var canUnlockLevel = false;
export function setCanUnlockLevel(param){
    canUnlockLevel = param
}
export var currentLevel = 1;
export function unlockNextLevel(){
    if(canUnlockLevel) {
        currentLevel++;
        setCanUnlockLevel(false)
    }
    resetStats()
}
function resetStats(){
    currentminigame =""
    currenttext = ""
    other = ''
    refreshment = ''
    alcohol = ''
    fruit = ''
    numCustomers = 0;
    currentCustomerPoints = 0;
    currentCustomers = 0
    currentCustomersStars = 0
    individualTotalStars = []
    customerList = []
    finalStars = 0
    cantMinigames = 0
    maxMinigames = 0
}

export var customerList = []
export function setCustomerList(list){
    list.forEach(x => {
customerList.push(x)

    })
}
export function resetCustomerList(){
    customerList = []
}

//Customers totales del nivel
export var numCustomers = 0;
//Customers atendidos
export var currentCustomers = 0
//Estrellas totales de cada customer de forma inividual
export var currentCustomerPoints = 0;
//Media de las estrellas totales de cada customer
export var currentCustomersStars = 0;
var maxMinigames = 0;
export function addMaxMinigames(){
    maxMinigames++;
}
//Numero de minijuegos del customer
var cantMinigames = 0

export function checkCustomer(){
    if(cantMinigames == 0 && maxMinigames == 0) return false;
    return cantMinigames >= maxMinigames
}
//Lista de estrellas totales de cada customer
export var individualTotalStars = [];

//Establece cantidad total de customers
export function setNumCustomers(num){
    numCustomers = num
}
export function addCurrentCustomer(){
    currentCustomers++
}
export function checkExitLevel(){
    return currentCustomers >= numCustomers
}

//Despues de calcular la puntuacion de cada minijuago, se agregar a la variable
export function addCustomerPoints(points){
    currentCustomerPoints += points
}
export function addMinigame(){
    cantMinigames++
}
export function  resetSceneStats(){
    cantMinigames = 0;
    maxMinigames = 0
    currentCustomersStars = 0
    currentCustomerPoints = 0
}

//Hace la media entre la puntuacion de estrellas y los minijuegos que se han jugado
// y lo añade a la lista de estrellas
export function calculateCustomerStarts(){
    currentCustomersStars = currentCustomerPoints / maxMinigames
    addTotalIndivStars(currentCustomersStars);
}


//En caso de tener distintos customers, 
//tener la puntuacion total de cada uno de ellos de forma individual
//Añade una puntuacion a la lista de puntuaciones
export function addTotalIndivStars(numStars){
    individualTotalStars.push(numStars)
}

//Estrellas que se va a mostrar en pantalla al final del nivel
export var finalStars = 0;
//Calcula la media de estrellas final
export function calculateLevelStars(){
    var rate = 0
    individualTotalStars.forEach(cust => {
        rate += cust
    })
    finalStars = rate / numCustomers;
}

//Info de nivel
export const levels = {
    'level1' : {customerCant: 1},
    'level2' : {customerCant: 2},
    'level3' : {customerCant: 3},
    'level4' : {customerCant: 4}
}


