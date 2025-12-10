const urlAllCat = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const urlIngredient = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast';

const cat = document.getElementById('cat');
const button = document.getElementById('generate');
const resultContainer = document.querySelector('.resultContainer');

fetch(urlAllCat)
.then((response) => {
    return response.json();  
})
.then((allCat) => {
    allCat.meals.forEach(meal => {
        const option = document.createElement("option");
        option.value = meal.strCategory;
        option.text = meal.strCategory;
        
        cat.appendChild(option);
    });
});

button.addEventListener("click", () => {
    const category = cat.value;

    const urlCategory = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;

    fetch(urlCategory)
    .then((response) => {
        return response.json();
    })
    .then((allMeals) => { 
        const meals = allMeals.meals;
        const randomMeal = meals[Math.floor(Math.random() * meals.length)];

        const urlDetails = `https://www.themealdb.com/api/json/v1/1/search.php?s=${randomMeal.strMeal}`;

    fetch(urlDetails)
        .then((response) => {
            return response.json();
        }) 
        .then((mealDetails) => {

        const meal = mealDetails.meals[0];

        resultContainer.innerHTML = "";

        const result = document.createElement("div");
        result.id = "result";
        resultContainer.appendChild(result)

        const title = document.createElement("h2");
        title.textContent = meal.strMeal;
        title.classList.add('mealTitle');

        const area = document.createElement("h3");
        area.textContent = meal.strArea;
        area.classList.add('mealArea');

        const image = document.createElement("img");
        image.src = meal.strMealThumb;
        image.alt = meal.strMeal;
        image.classList.add('mealImg');

        const ingredientsList = document.createElement("ul");
        ingredientsList.classList.add('ingredients');

        for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`];
            const measure = meal[`strMeasure${i}`];

            if (ingredient && ingredient.trim() !== "") {
                const li = document.createElement("li");
                li.textContent = `${ingredient} - ${measure}`;
                ingredientsList.appendChild(li);
            }
        }

        const instructions = document.createElement("p");
        instructions.innerHTML = meal.strInstructions.replace(/\r?\n/g, "<br> <br>");
        instructions.classList.add('instructions');

        result.appendChild(title);
        result.appendChild(area);
        result.appendChild(image);
        result.appendChild(ingredientsList);
        result.appendChild(instructions);

        button.textContent = "again?";
        });
        })});

            