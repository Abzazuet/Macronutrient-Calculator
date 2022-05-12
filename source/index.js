const addFood = document.getElementById('addFood');
const apiKey = 'EQf661A4aTjhD5KeUSuyMeNz7jY35wWtvkckOKgU';
addFood.addEventListener('click', e => searchFood(e));
class Food {
    constructor(id, name, quantity) {
        this.id = id;
        this.name = name;
        this.quantity = quantity;
        this.url = `https://api.nal.usda.gov/fdc/v1/food/${this.id}?api_key=${apiKey}`;
    }
}
function searchFood(e) {
    e.preventDefault();
    let id = e.target.form[0].selectedOptions[0].value;
    let name = e.target.form[0].selectedOptions[0].text;
    let quantity = e.target.form[1].value;
    let newFood = new Food(id, name, quantity);
    renderFood(newFood);
    console.log(newFood.url)
    fetch(newFood.url)
    .then(res => res.json())
    .then(ans => console.log(ans));
}
function renderFood(food){
    let foodsContainer = document.getElementById('foodContainer');
    let foodContainer = document.createElement('div');
    foodContainer.classList.add('food-container');
    let foodName = document.createElement('h2');
    foodName.innerText = food.name;
    let quantity = document.createElement('h3');
    quantity.innerText = food.quantity;
    quantity.classList.add('quantity')
    foodContainer.appendChild(foodName);
    foodContainer.appendChild(quantity);
    addMacro('Protein', 500, foodContainer);
    addMacro('Carbs', 500, foodContainer);
    addMacro('Fat', 500, foodContainer);
    addMacro('Calories', 500, foodContainer);
    foodsContainer.appendChild(foodContainer);
}
function addMacro(n, g, container){
    let name = document.createElement('p');
    let grams = document.createElement('span');
    grams.classList.add('grams')
    let macro = document.createElement('div');
    macro.classList.add('macro');
    name.innerText = `${n} `;
    grams.innerText =`${g}`;
    name.appendChild(grams);
    macro.appendChild(name);
    container.appendChild(macro);
}