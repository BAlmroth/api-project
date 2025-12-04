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
        const randomMeal = //???????
        console.log(meals);

        const urlDetails = `https://www.themealdb.com/api/json/v1/1/search.php?s=${randomMeal}`;

        