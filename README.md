# Macronutrient Calculator
This webpage's main goal is to track the quantity of calories consumed and the macronutrients consumed. 
To do this I used an external API from the food data central (https://fdc.nal.usda.gov/index.html). To be able to use it I had to generate an API key to be able to access the information.
## Interface
![Screenshot from 2022-05-30 01-06-07](https://user-images.githubusercontent.com/91041738/170947114-4231567d-9387-4cb9-a1f2-07f2a945398b.png)
As we can see we have two inputs and two buttons. For now I'm gonna focus on th two inputs and the "Submit" button.
Our first input allows us to select from a list of defined foods.
![Screenshot from 2022-05-30 01-09-26](https://user-images.githubusercontent.com/91041738/170947541-efc0d8cb-7558-40d1-bbeb-e388da5dcd60.png)
Once we have this we can select the quantity and submit the form so we can get the proportional information of that food with that given quantity.
![Screenshot from 2022-05-30 01-11-15](https://user-images.githubusercontent.com/91041738/170947853-ed26accc-0b74-4379-8805-35a25efb7475.png)
After we click submit it will output two cars, one with the information of the food and another displaying the total.
![Screenshot from 2022-05-30 01-13-22](https://user-images.githubusercontent.com/91041738/170948491-65c29305-c19b-4c29-a3bb-6f2ee6a74632.png)
If we add more foods they will all add up to the total.
![Screenshot from 2022-05-30 01-38-36](https://user-images.githubusercontent.com/91041738/170953016-d57d1546-5bd8-406e-954e-a79e997e1e4e.png)
Now, if we click on the button "copy total" it will copy the information to the keyboard and display what we copied.
![Screenshot from 2022-05-30 01-40-16](https://user-images.githubusercontent.com/91041738/170953292-0ebff272-c655-4584-99b2-4ff905b9660b.png)

## Getting information from the API
To be able to get information for a certain food I needed the id they use in their data base, so I got that id and I typed it as te value for my options. Next I made an instance of my class food, in which I declared the name, the id, the quantity and the url to use on the GET request
```js
class Food {
    constructor(id, name, quantity) {
        this.id = id;
        this.name = name;
        this.quantity = quantity;
        this.url = `https://api.nal.usda.gov/fdc/v1/food/${this.id}?api_key=${apiKey}`;
    }
}
```
And the select menu looks like this
```html
<select name="foodSelection" id="food">
  <option value="none">None</option>
  <option value="749420">Bacon</option>
  <option value="747997">Egg</option>
  <option value="746952">Ham</option>
  <option value="746782">Milk</option>
  <option value="331897">Chicken</option>
  <option value="746769">Lettuce</option>
  <option value="2261422">Potato</option>
  <option value="1104812">Rice</option>
</select>
```
I thought that the best approach was to define some predefined foods because the user might not have access to the food's id.
## 
