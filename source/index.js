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
    fetch(newFood.url)
        .then(res => res.json())
        .then(ans => extractInfo(ans.foodNutrients, newFood));
}
function extractInfo(nutrients, food) {
    let proteinGrams = 0;
    let carbGrams = 0;
    let fatGrams = 0;
    let calories = 0;
    for (let nutrient of nutrients) {
        let name = nutrient.nutrient.name;
        if (name == 'Protein') {
            proteinGrams = nutrient.amount;
        }
        if (name == 'Carbohydrate, by difference'){
            carbGrams = nutrient.amount;
        }
        if (name == 'Total fat (NLEA)'){
            fatGrams = nutrient.amount;
        }
        if (name=='Energy'){
            calories = nutrient.amount;
        }
    }
    const macros = {
        protein:proteinGrams,
        carbs:carbGrams,
        fat:fatGrams,
        cals:calories
    }
    renderFood(food, macros)
}
function renderFood(food, macros) {
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
    addMacro('Protein', macros.protein, foodContainer);
    addMacro('Carbs', macros.carbs, foodContainer);
    addMacro('Fat', macros.fat, foodContainer);
    addMacro('Calories', macros.cals, foodContainer);
    foodsContainer.appendChild(foodContainer);
}
function addMacro(n, g, container) {
    let name = document.createElement('p');
    let grams = document.createElement('span');
    grams.classList.add('grams')
    let macro = document.createElement('div');
    macro.classList.add('macro');
    name.innerText = `${n} `;
    grams.innerText = `${g}`;
    name.appendChild(grams);
    macro.appendChild(name);
    container.appendChild(macro);
}