const addFood = document.getElementById('addFood');
const apiKey = 'EQf661A4aTjhD5KeUSuyMeNz7jY35wWtvkckOKgU';
document.addEventListener("DOMContentLoaded", () => {
    addFood.addEventListener('click', e => searchFood(e));
    let copy = document.getElementById('copyTotal');
    copy.addEventListener("click", e => copyTotal(e));
});
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
    let factor = food.quantity / 100;
    for (let nutrient of nutrients) {
        let name = nutrient.nutrient.name;
        if (name == 'Protein') {
            proteinGrams = nutrient.amount;
        }
        if (name == 'Carbohydrate, by difference') {
            carbGrams = nutrient.amount;
        }
        if (name == 'Total fat (NLEA)') {
            fatGrams = nutrient.amount;
        }
        if (name == 'Energy') {
            calories = nutrient.amount;
        }
    }
    const macros = {
        protein: Math.round(proteinGrams * factor),
        carbs: Math.round(carbGrams * factor),
        fat: Math.round(fatGrams * factor),
        cals: Math.round(calories * factor),
    }
    renderFood(food, macros);
    calculateTotal();
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
    name.innerText = `${n} `;
    grams.innerText = `${g}`;
    if (n == 'Calories') {
        grams.classList.add('cals');
    }
    else {
        grams.classList.add('grams')
    }
    let macro = document.createElement('div');
    macro.id = n;
    macro.classList.add('macro');

    name.appendChild(grams);
    macro.appendChild(name);
    container.appendChild(macro);
}
function calculateTotal() {
    let total = document.getElementById('total');
    total.innerHTML = '';
    let foods = document.getElementsByClassName('food-container');
    let totalProtein = 0
    let totalCarbs = 0;
    let totalFat = 0;
    let totalCalories = 0;
    let totalGrams = 0;
    for (let food of foods) {
        totalGrams += parseFloat(food.childNodes[1].textContent)
        for (let macro of food.children) {
            if (macro.lastChild.lastChild != null) {
                let name = macro.id;
                let value = parseFloat(macro.lastChild.lastChild.textContent)
                if (name == 'Protein') {
                    totalProtein += value;
                }
                if (name == 'Carbs') {
                    totalCarbs += value;
                }
                if (name == 'Fat') {
                    totalFat += value;
                }
                if (name == 'Calories') {
                    totalCalories += value;
                }
            }
        }
    }
    let food = new Food(0, 'Total', totalGrams);
    const macros = {
        protein: totalProtein,
        carbs: totalCarbs,
        fat: totalFat,
        cals: totalCalories,
    }
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
    total.appendChild(foodContainer);
}
function copyTotal(e) {
    let total = document.getElementById('total');
    let content = total.children[0].children
    let str = `Total \nQuantity: ${content[1].textContent}\n${content[2].textContent}\n${content[3].textContent}\n${content[4].textContent}\n${content[5].textContent}`
    navigator.clipboard.writeText(str);
    alert("Copied the text: " + str);
}