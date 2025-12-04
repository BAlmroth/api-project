// fetch variabler
const urlCategory = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`; 
const urlAllCat = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const urlIngredient = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast';

//select sektion anropa html element 
const cat = document.getElementById('cat'); //för att lägga in options i select tagen
const button = document.getElementsByClassName('generate'); //för att klicka på knapp -> be js generera
const result = document.getElementById('result'); //lägg in info :) 

// element som behöver genereras via js = h2(recept namn), img(bild), list(ingridienser), p(instruktioner)


//dropdown val
fetch(urlAllCat)
    .then((response) => {
    return response.json();  
    })
     .then((allCat) => {
        console.log(allCat)
        allCat.meals.forEach(meal => {
            const option = document.createElement("option");
            option.value = meal.strCategory;
            option.text = meal.strCategory;

            cat.appendChild(option);
        });
});