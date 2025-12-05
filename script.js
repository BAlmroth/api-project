// fetch variabler
const urlAllCat = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const urlIngredient = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast'; //möjlighet att skriva in ingrediens?

//select sektion anropa html element 
const cat = document.getElementById('cat'); //för att lägga in options i select tagen
const button = document.getElementById('generate'); //för att klicka på knapp -> be js generera
const result = document.getElementById('result'); //lägg in info :) 

// element som behöver genereras via js = h2(recept namn), img(bild), list(ingredienser), p(instruktioner)

//dropdown val
fetch(urlAllCat)
.then((response) => {
    return response.json();  
})
.then((allCat) => { //allCat = array nament allCat['meals'] foreach meals as meal
    allCat.meals.forEach(meal => {
        const option = document.createElement("option");
        option.value = meal.strCategory;
        option.text = meal.strCategory;
        
        cat.appendChild(option);
    });
});


//när man har valt cat ->
button.addEventListener("click", () => {
    const category = cat.value;

    const urlCategory = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;

    fetch(urlCategory)
    .then((response) => {
        return response.json();
    })
    .then((allMeals) => { // allMeals['meals'] = alla måltider inom kategorin???
        const meals = allMeals.meals;
        const randomMeal = meals[Math.floor(Math.random() * meals.length)];
        // console.log(meals);


        const urlDetails = `https://www.themealdb.com/api/json/v1/1/search.php?s=${randomMeal.strMeal}`;

        // console.log(urlDetails) //array med all info

    fetch(urlDetails) //få ut infon på något sätt
        .then((response) => {
            return response.json();
        }) 
        .then((mealDetails) => {

        const meal = mealDetails.meals[0];

        // Rensa result-diven innan nytt recept skrivs ut
        result.innerHTML = "";

        //titel
        const title = document.createElement("h2");
        title.textContent = meal.strMeal;
        title.classList.add('mealTitle');

        //bild
        const image = document.createElement("img");
        image.src = meal.strMealThumb;
        image.alt = meal.strMeal;
        image.classList.add('mealImg');

        // Ingredienslista
        const ingrediensLista = document.createElement("ul");
        ingrediensLista.classList.add('ingredients');

        for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`];
            const measure = meal[`strMeasure${i}`];

            if (ingredient && ingredient.trim() !== "") {
                const li = document.createElement("li");
                li.textContent = `${ingredient} - ${measure}`;
                ingrediensLista.appendChild(li);
            }
        }


        const instructions = document.createElement("p");
        instructions.innerHTML = meal.strInstructions.replace(/\r?\n/g, "<br> <br>");
        instructions.classList.add('instructions');

        // Stoppa in allt i result-diven
        result.appendChild(title);
        result.appendChild(image);
        result.appendChild(ingrediensLista);
        result.appendChild(instructions);
        });
        })});

            