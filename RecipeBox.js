// TO DO:
// HANDLE ERRORS IN RECIPE PARSING
//  - Pop up a modal with known data and fields for missing data?
// XXDONEXX MAKE COPY PASTE PARSING FOR ATK RECIPED (CORS)
// MODAL WITH RADIO BUTTONS TO SELECT WHICH ITEMS TO ADD FROM ACTIVE RECIPE TO SHOPPING LIST
// FIX SHOPPING LIST CATEGORIES FOR CHICKEN BROTH (NOT MEAT) AND BLACK PEPPER (NOT VEG)

let addRecipeModal = new bootstrap.Modal(document.getElementById("add-new-recipe-modal"));
let addIngredientsToShoppingListModal = new bootstrap.Modal(document.getElementById("add-ingredients-to-shopping-list-modal"));
let viewShoppingListModal = new bootstrap.Modal(document.getElementById("view-shopping-list-modal"));
let editRecipeModal = new bootstrap.Modal(document.getElementById("edit-recipe-modal"));


let categoryList = [
  "vegetables",
  "fruits",
  "canned",
  "dairy",
  "meats",
  "other"
]

// Declare a global variable for storing the localStorage data
let rawRecipes;

//variables for keeping track of active recipe and shopping list
let activeRecipeName;
let activeRecipeIndex;
let activeIngredientsList;
let masterShoppingList = [];

// variables for categorizing shopping list items. 
const fruits = [
  "apple",
  "apples",
  "apricot",
  "apricots",
  "avocado",
  "avocados",
  "banana",
  "bananas",
  "berry",
  "berries",
  "blackberry",
  "blackberries",
  "blueberry",
  "blueberries",
  "cantaloupe",
  "cantaloupes",
  "cherry",
  "cherries",
  "coconut",
  "coconuts",
  "dragon fruit",
  "dragon fruits",
  "fig",
  "figs",
  "grape",
  "grapes",
  "grapefruit",
  "grapefruits",
  "honeydew melon",
  "honeydew melons",
  "kiwi",
  "kiwis",
  "lemon",
  "lemons",
  "lime",
  "limes",
  "lychee",
  "lychees",
  "mango",
  "mangos",
  "nectarine",
  "nectarines",
  "orange",
  "oranges",
  "papaya",
  "papayas",
  "passion fruit",
  "passion fruits",
  "peach",
  "peaches",
  "pear",
  "pears",
  "persimmon",
  "persimmons",
  "pineapple",
  "pineapples",
  "plum",
  "plums",
  "pomegranate",
  "pomegranates",
  "raspberry",
  "raspberries",
  "starfruit",
  "starfruits",
  "strawberry",
  "strawberries",
  "tangerine",
  "tangerines",
  "watermelon",
  "watermelons"
];
const notFruits = [
  "grapeseed",
  "apple cider",
  "juice"
];

const vegetables = ["scallions", "scallion", "Lettuce", "Spinach", "Kale", "Arugula", "Chard", "Broccoli", "Cauliflower", "Brussels Sprouts", "Cabbage", "Carrots", "carrot", "Celery", "Peppers", "tomato", "Tomatoes", "Cucumbers", "cucumber", "Zucchini", "zucchinis", "squashes", "Squash", "Pumpkin", "pumpkins", "Eggplant", "eggplants", "Asparagus", "bean", "Beans", "Peas", "Corn", "Mushrooms", "Onions", "onion", "Garlic", "Leeks", "pepper", "leek", "shallot", "Shallots", "Potatoes", "potato", "yam", "Yams", "radish", "Radishes", "Beets", "beet", "turnip", "Turnips", "Rutabagas", "rutabaga", "Parsnips", "parsnip", "artichoke", "Artichokes", "Okra", "Ginger", "jalapeno", "jalapenos", "jalapeño", "Jalapeños"];
const notVegetables = [
  "cornstarch", 
  "corn starch", 
  "corn meal", 
  "cornmeal", 
  "celery salt", 
  "black pepper", 
  "salt and pepper", 
  "ground pepper",
  "dried tomatoes",
  "pepper flakes",
  "tomato paste",
  "can", "cans"
];

const cannedGoods = [
  "can", "cans", "canned"
];

const notCannedGoods = [];

const herbsAndSaladGreens = ["Basil", "Cilantro", "Parsley", "Dill", "Mint", "Rosemary", "Thyme", "Oregano", "Sage", "Chives", "Tarragon", "Bay Leaves", "Mixed Salad Greens", "Romaine", "Endive", "Watercress"];
const exoticAndSpecialtyProduce = ["Bok Choy", "Fennel", "Daikon Radish", "Edamame (Soybeans)", "Microgreens", "Seaweed", "Kelp", "Taro", "Yuca (Cassava)", "Plantains", "Aloe Vera", "Dandelion Greens", "Jicama", "Kohlrabi", "Lotus Root"];

const meats = [
  "pork", 
  "chicken", 
  "beef", 
  "lamb", 
  "turkey", 
  "duck", 
  "veal", 
  "salmon", 
  "tuna", 
  "trout", 
  "mackerel", 
  "sausage", 
  "bacon", 
  "ham", 
  "venison", 
  "rabbit",
  "buffalo",
  "goat",
  "steak",
  "shrimp",
  "lobster",
  "crab",
  "clam",
  "oyster",
  "scallop",
  "squid",
  "octopus",
  "cod",
  "haddock",
  "halibut",
  "sole",
  "sardine",
  "anchovy",
  "tilapia",
  "catfish",
  "swordfish",
  "monkfish",
  "grouper",
  "snapper",
  "bass"
];
const notMeats = [
  "broth",
  "cheese",
  "anchovy"
];

const dairy = [ //make this a legit category
  "milk", 
  "Butter", 
  "Margarine", 
  "Egg", 
  "egg whites",
  "Yogurt", 
  "Cottage Cheese", 
  "Cream", 
  "creamer",
  "Half-and-Half", 
  "Whipped Cream"
];
const notDairy = [
  "cream of"
];

const units = [
  "cup", "cups",
  "dash", "dashes",
  "drop", "drops",
  "gallon", "gallons",
  "gram", "grams",
  "kilogram", "kilograms",
  "liter", "liters",
  "milligram", "milligrams",
  "milliliter", "milliliters",
  "ounce", "ounces",
  "pinch", "pinches",
  "pint", "pints",
  "pound", "pounds",
  "strand", "strands",
  "quart", "quarts",
  "tablespoon", "tablespoons",
  "teaspoon", "teaspoons"
];


const fractions = ["⅛", "¼", "⅜", "½", "⅝", "¾", "⅞", "⅓", "⅔"];



function Recipe(name, source, url, yield, time, ingredients, instructions) {
  this.name = name;
  this.source = source;
  this.URL = url;
  this.yield = yield;
  this.time = time;
  this.ingredients = ingredients;
  this.instructions = instructions;
}

function ShoppingListItem(quantity, unit, item, category, originalItem, editedItem, sourceRecipe, deleted, checked) {
  this.quantity = quantity;
  this.unit = unit;
  this.item = item;
  this.originalItem = originalItem;
  this.editedItem = editedItem;
  this.sourceRecipe = sourceRecipe;
  this.category = category;
  this.deleted = deleted;
  this.checked = checked;
}

//Event listener definitions
//document.getElementById("add-new-recipe-button").addEventListener("click", handleAddNewRecipeButtonClick);
document.getElementById("submit-button").addEventListener("click", storeNewRecipe);
document.getElementById("source-select").addEventListener("change", handleNewRecipeSourceChange);
document.getElementById("add-ingredients-to-shopping-list-button").addEventListener("click", addIngredientsToShoppingList);
document.getElementById("add-new-recipe-button").addEventListener("click", handleAddNewRecipeButtonClick);
document.getElementById("edit-recipe-button").addEventListener("click", handleEditRecipeButtonClick);
document.getElementById("submit-edits-button").addEventListener("click", handleSubmitEditsButtonClick);
document.getElementById("view-shopping-list-button").addEventListener("click", viewShoppingList);
document.getElementById("add-list-item-input").addEventListener("keydown", function(event){
  if (event.key === "Enter") {
    manualAddItemToShoppingList(document.getElementById("add-list-item-input").value)
  }
})
//find all lists and add event listeners for hover icons
let listOfLists = document.querySelectorAll('.list')
listOfLists.forEach((elem) => {
  elem.addEventListener('click', function(event) {
  // Check if the clicked element is an edit button
  if (event.target.classList.contains('edit-icon')) {
      editShoppingListItem(event);
    // Check if the clicked element is a delete button
  } else if (event.target.classList.contains('delete-icon')) {
    deleteShoppingListItem(event);
    // Check if the clicked element is a more-info button
  } else if (event.target.classList.contains('info-icon')) {
      infoShoppingListItem(event);
  }
  });
});



// // // Define a function to fetch JSON data
// function fetchData() {
//   return new Promise((resolve, reject) => {
//     // Fetch the JSON data from a local file (you might need to adjust the path)
//     fetch('./RecipeData.json')
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .then((jsonData) => {
//         rawRecipes = jsonData.recipes; // Assign the JSON data to the global variable
//         resolve();
//       })
//       .catch((error) => {
//         reject(error);
//       });
//   });
// }

function sendRawRecipesToLocalStorage() {
  console.log('pressed');
  console.log(rawRecipes);
  localStorage.setItem("recipes", JSON.stringify(rawRecipes));
}

function getRecipesFromLocalStorage() {
  return new Promise((resolve, reject) => {
    let storedRecipes = localStorage.getItem("recipes");
    if (storedRecipes) {
      rawRecipes = (JSON.parse(storedRecipes)); 
      console.log(rawRecipes); //returns array
      resolve(rawRecipes);
    } else {
      reject(new Error('Error finding recipes in localStorage'));
    }
  })
}

getRecipesFromLocalStorage()
  .then((rawRecipes) => {
    // Now that you have the JSON data in rawRecipes, you can perform operations on it

  displayRecipeList();

    // add event listener and load recipe when clicked
    document.getElementById("recipe-list").addEventListener("click", function(event) {
      console.log(event.target.id);
      loadRecipe(event.target.id);
    });
    
    // event listener to Add Recipe button since we'll need to access rawRecipes
    // document.getElementById("add-new-recipe-button").addEventListener("click", function() {
    //   addNewRecipe();
    // });
    
    //event listener for recipe list search
    document.getElementById("recipe-search").addEventListener("input", function(event) {filterList(event)});
    // Call a function or do other operations that depend on rawRecipes here
  })
  .catch((error) => {
    console.error(error, `error in .then`);
  });

  function displayRecipeList() {
    let myList = document.getElementById("recipe-list");
    let alphaRecipeList = [];
    myList.innerHTML = "";
    rawRecipes.forEach((elem) => {
      alphaRecipeList.push(elem.name);
    });
    alphaRecipeList.sort((a, b) => {
      a = a.toLowerCase();
      b = b.toLowerCase();
      if (a < b) {
        return -1;
      }
      if (a > b) {
        return 1;
      }
      return 0; // a must be equal to b
    });
    //send list of recipe names to DOM
    alphaRecipeList.forEach((elem) => {  
      // Create an "li" node:
      const li = document.createElement("li");
      li.id = elem;
      // Create a text node:
      const text = document.createTextNode(elem);
      // Append the text to the "li" node:
      li.appendChild(text);
      // Append the "li" node to the list:
      myList.appendChild(li);
      updateSearchbar();
    })
}

//function addNewRecipe(rawRecipes) {
//  container = document.getElementById("add-new-recipe-container");
//  container.innerHTML = "";
  // Create the URL input field
  // let addNewRecipeURLInput = document.createElement("input");
  // addNewRecipeURLInput.id = "new-recipe-input";
  // addNewRecipeURLInput.type = "text";
  // addNewRecipeURLInput.name = "newRecipe";
  // addNewRecipeURLInput.placeholder = "Paste Cook's Illustrated URL...";
  // addNewRecipeURLInput.classList.add("col-12", "m-1", "form-control");
  // and add it below the button
  // document.getElementById("add-new-recipe-container").appendChild(addNewRecipeURLInput);
  // // Go looking when user presses enter
  // addNewRecipeURLInput.addEventListener("keydown", function(event) {
  //   if (event.key === "Enter") {
  //   getRecipeFromURL(event, rawRecipes)
  //   }
  // });

  //Select source dropdown
  // const sourceList = ["Smitten Kitchen", "NYT Cooking", "Cook's Illustrated/ATK"]
  // let addNewRecipeSourceSelect = document.createElement("select");
  // addNewRecipeSourceSelect.id = "source-select";
  // addNewRecipeSourceSelect.classList.add("form-select", "m-1");
  // let sourceListAlpha = sourceList.sort();
  // let optionPlaceholder = document.createElement("option");
  // optionPlaceholder.textContent = "Pick a source...";
  // addNewRecipeSourceSelect.appendChild(optionPlaceholder);
  // sourceListAlpha.forEach((elem) => {
  //   let option = document.createElement("option");
  //   option.value = elem;
  //   option.textContent = elem;
  //   addNewRecipeSourceSelect.appendChild(option);
  // });
  // container.appendChild(addNewRecipeSourceSelect);


  //Text field
  // let addNewRecipeTextInput = document.createElement("textarea");
  // addNewRecipeTextInput.id = "new-recipe-text-input";
  // addNewRecipeTextInput.type = "text";
  // addNewRecipeTextInput.name = "newRecipe";
  // addNewRecipeTextInput.style = "height:300px";
  // addNewRecipeTextInput.placeholder = "Press ctrl-a ctrl-v at site, then ctrl-v here";
  // addNewRecipeTextInput.classList.add("col-12", "m-1", "form-control");
  // container.appendChild(addNewRecipeTextInput);
  

  //submit button
  // let submitButton = document.createElement("button");
  // submitButton.type = "button";
  // submitButton.textContent = "Submit";
  // submitButton.classList.add("col-12", "m-1");
  // container.appendChild(submitButton);
  // submitButton.addEventListener("click", getRecipeFromText);
//}

// function getRecipeFromURL(event) {
//   url = event.target.value;
//   fetch(url)
//   .then(response => response.text())
//   .then(html => {
    
//     console.log(html);
//     // find title
//     let titleRegEx = /(?<=<title>).*?(?=\|)/; // Seems to work for cooks illustrated
//     let title = html.match(titleRegEx)[0].trim();
//     console.log(title);
    
//     // find source website
//     let sourceRegEx = /(?<=https:\/\/www\.).*?(?=\/)/
//     let source = url.match(sourceRegEx)[0];
//     console.log(source);

//     console.log(url);

//     // find yield
//     let yieldRegEx = /(?<=recipeYield":").*?(?=")/
//     let yield = html.match(yieldRegEx)[0];
//     console.log(yield);

//     // find time - formatted a few different ways but these two regex seem to capture it. 
//     let time = null;
//     let timeRegEx1 = /(?<=TIME<\/em><span class="recipe-detail-page__meta--value">)\d{1,3} \w*(?=<)/
//     let timeRegEx2 = /(?<="recipeTimeNote":").*?(?=")/
//     if (html.match(timeRegEx1) !== null) {
//       time = html.match(timeRegEx1)[0];
//     } else if (html.match(timeRegEx2) !== null) {
//       time = html.match(timeRegEx2)[0];
//     }
//     console.log(time)

//     // Get list of ingredients 
//     // for Cooks Illustrated this is the contents of an array
//     // for Cooks Illustrated there is " , " at the beginning of each item if there is no quantity
//     let rawIngredientsStrRegEx = /(?<=recipeIngredient":\[).*?(?=\])/  // returns the array in the target HTML as a string
//     rawIngredientsStr = html.match(rawIngredientsStrRegEx)[0];
//     //remove double backslashes and the " , " thing and save to new array
//     let ingredientsStrCleaned = rawIngredientsStr
//       .replace(/\\/g, "")  // double backslashes used to escape a link or something?
//       .replace(/ , /g, "")  // and the " , " -- we'll remove them here since they'll confuse the .split operation later
//       .replace("  "," ");  // there's also some weird double spaces I don't like
//     // Now split the string into an array 
//     // (I think I could have done this first and put all these .replace and .trim methods in one line and not had so many weird variables)
//     let ingredientsArrCleaned = ingredientsStrCleaned.split(/","/);
//     // remove the leading and trailing quotes as well as
//     let ingredientsArr = [];
//     ingredientsArrCleaned.forEach((elem) => {
//       ingredientsArr.push(elem
//         .trim()
//         .replace(/^"|"$/g, "") //remove leading and trailing quotes
//         .replace(/(\d+)([a-zA-Z])/, "$1 $2") // add space when there is no space between quantity and item
//       )
//     })
//     console.log(ingredientsArr);

//     // Get list of instructions
//     // First the raw string
//     let instructionsRegex = /(?<=recipeInstructions":\[{"@type":"HowToStep","text":").*(?="}\])/g
//     instructionsStr = html.match(instructionsRegex)[0];
//     let instructionsArr = instructionsStr.split(/"},{"@type":"HowToStep","text":"/);
//     console.log(instructionsArr);
    
//     // put it all in an object and add to rawRecipes and refresh the list
//     let newRecipe = new Recipe(title, source, url, yield, time, ingredientsArr, instructionsArr);
//     console.log(newRecipe);
//     rawRecipes.push(newRecipe);
//     sendRawRecipesToLocalStorage();
//     displayRecipeList();
//     loadRecipe(newRecipe.name);
    
//   })
//   .catch(error => {
//     console.error('Error fetching the web page:', error);
//   });
// }


// function Recipe(name, source, url, yield, time, ingredients, instructions) {

function handleEditRecipeButtonClick() {
  let modalBody = document.getElementById("edit-recipe-modal-body");
  modalBody.innerHTML = ""; // clear modal body of previous editing form
  let recipe = rawRecipes[activeRecipeIndex];
    // prevent undefined info categories from populating "undefined" string in form
    let name = recipe.name ? recipe.name : "";
    let source = recipe.source ? recipe.source : "";
    let url = recipe.url ? recipe.url : "";
    let yield = recipe.yield ? recipe.yield : "";
    let time = recipe.time ? recipe.time : "";
    let ingredients = recipe.ingredients !== [] ? recipe.ingredients : "";
    let instructions = recipe.instructions !== [] ? recipe.instructions : "";
  // make new editing form, transforming arrays to string with line breaks which will become elements of new arrays when form is submitted
  modalBody.appendChild(createRecipeEditingForm(name, source, url, yield, time, ingredients.join(`\n`), instructions.join(`\n`)));
}

function handleSubmitEditsButtonClick() {
  let name = document.getElementById("name-field").value;
  let source = document.getElementById("source-field").value;
  let url = document.getElementById("url-field").value;
  let yield = document.getElementById("yield-field").value;
  let time = document.getElementById("time-field").value;
  let ingredients = document.getElementById("ingredients-field").value.trim().split(`\n`);
  let instructions = document.getElementById("instructions-field").value.trim().split(`\n`);
  rawRecipes[activeRecipeIndex].name = name;
  rawRecipes[activeRecipeIndex].source = source;
  rawRecipes[activeRecipeIndex].URL = url;
  rawRecipes[activeRecipeIndex].yield = yield;
  rawRecipes[activeRecipeIndex].time = time;
  rawRecipes[activeRecipeIndex].ingredients = ingredients;
  rawRecipes[activeRecipeIndex].instructions = instructions;
  sendRawRecipesToLocalStorage();
  loadRecipe(rawRecipes[activeRecipeIndex].name);
  displayRecipeList();
  editRecipeModal.hide();
}

function handleAddNewRecipeButtonClick() {
  let sourceDropdown = document.getElementById("source-select");
  sourceDropdown.value = "Pick a source...";
  let source = "Pick a source...";
  refreshNewRecipeForm(source);
}

function handleNewRecipeSourceChange(event) {
  let source = event.target.value;
  refreshNewRecipeForm(source);
}

function refreshNewRecipeForm(source) {
  let formContainer = document.getElementById("new-recipe-form-container");
  formContainer.innerHTML = "";
  if (source === "manual") {
    formContainer.appendChild(createRecipeEditingForm("", "", "", "", "", "", ""));
  } else if (source === "Cook's Illustrated/ATK" || source === "NYT Cooking") {
    let textAreaInput = document.createElement("textarea");
    textAreaInput.id = "new-recipe-text-input";
    textAreaInput.name = "newRecipe";
    textAreaInput.style="height:300px";
    textAreaInput.placeholder="Press ctrl-a ctrl-c at site, then ctrl-v here";
    textAreaInput.className="col-12 m-1 form-control";
    formContainer.appendChild(textAreaInput);
  }
}

function createRecipeEditingForm(name, source, url, yield, time, ingredients, instructions) {
  let container = document.createElement("div");
  container.appendChild(createInputContainer("Name", "text", name));
  container.appendChild(createInputContainer("Source", "text", source));
  container.appendChild(createInputContainer("URL", "text", url));
  container.appendChild(createInputContainer("Yield", "text", yield));
  container.appendChild(createInputContainer("Time", "text", time));
  container.appendChild(createInputContainer("Ingredients", "textarea", ingredients));
  container.appendChild(createInputContainer("Instructions", "textarea", instructions));
  return container;
}

function createInputContainer(name, type, defaultValue) {
  let container = document.createElement("div");
  container.textContent = name + ":";
  container.classList.add("manual-recipe-form-container");
  let input;
  let lowerCaseName = name.toLowerCase();
  if (type === "textarea") {
    input = document.createElement("textarea");
    input.rows = "10";
    input.cols = "50";
  } else {
    input = document.createElement("input");
    input.type = type;
  }
  input.classList.add("form-control");
  input.style.display = "block";
  input.id = lowerCaseName + "-field"
  input.value = defaultValue;
  container.appendChild(input);
  return container;
}

function storeNewRecipe (event) {

  let source = document.getElementById("source-select").value;
  if (source === "manual") {
    addRecipeFromManualForm();
  } else if (source === "NYT Cooking") {
    let rawText = document.getElementById("new-recipe-text-input").value;
    console.log(`I think this is NYT`)
    //get title
    let titleRE = /(?:your recipe box\n\n)(.*)/gi;
    let titleMatch = titleRE.exec(rawText)
    let title = titleMatch[1];
    console.log(title);
    //see if another recipe with the same name already exists
    if (rawRecipes.some(elem => elem.name === title)) {
      console.log(`alredy exists`)
      return;
    }

    //get time
    let timeRE = /(?:time\n    )(.*)/gi;
    let timeMatch = timeRE.exec(rawText);
    let time;
    console.log(`timeMatch is ${timeMatch}`)
    if (timeMatch !== null) {
      time = timeMatch[1];
      console.log(time);
    } else {
      time = "";
    }
    
    //get yield and ingredients
    let ingredientsRE = /(?:ingredients\nyield:)(.*)\n\n(( {4}.*\n)*)/gi;
    let ingredientsMatch = ingredientsRE.exec(rawText); //[1] is yield [2] is ingredients list
    console.log ('match is:');
    console.log (ingredientsMatch);
    let yield = ingredientsMatch[1];
    let ingredientsArr = ingredientsMatch[2]
      .trim()
      .split(`\n    `);
    let spaced = [];
    ingredientsArr.forEach((elem, index) => {
        let spacingRE = /([\d|⅛|¼|⅜|½|⅝|¾|⅞]+)(.*)/g
        console.log(`spacing ${elem}`)
        console.log(spacingRE.exec(elem));
        console.log(elem.replace(spacingRE, "$1 $2"));
        spaced[index] = elem.replace(spacingRE, "$1 $2") // NOT WORKING add space when there is no space between quantity and item
        console.log(`spaced ${spaced}`);
    })
    ingredientsArr = spaced;
    console.log(yield);
    console.log(ingredientsArr);

    //get instructions
    let instructionsArr = [];
    let instructionsMatch = [];
    let instructionsRE = /(Step \d.*|Tip)(\n\n    .*|\n\n.*)/g;
    while ((instructionsMatch = instructionsRE.exec(rawText)) !== null) {
      console.log ('match is:');
      console.log (instructionsMatch);
      instructionsArr.push(instructionsMatch[0]);
      console.log(instructionsArr);
    }

    // put it all in an object and add to rawRecipes and refresh the list
    let newRecipe = new Recipe(title, source, null, yield, time, ingredientsArr, instructionsArr);
    console.log(newRecipe);
    rawRecipes.push(newRecipe);
    sendRawRecipesToLocalStorage();
    displayRecipeList();
    loadRecipe(newRecipe.name);


  } else if (source === "Cook's Illustrated/ATK") {
    let rawText = document.getElementById("new-recipe-text-input").value;
    //get title
    let titleRE = /(?<=Search\n).*/;
    let titleMatch = titleRE.exec(rawText)
    console.log(`titleMatch = ${titleMatch}`)
    let title = titleMatch[0];
    console.log(title);
    //see if another recipe with the same name already exists
    if (rawRecipes.some(elem => elem.name === title)) {
      console.log(`alredy exists`)
      return;
    }

    //get time
    let timeRE = /(?<=TIME).*/g;
    let timeMatch = timeRE.exec(rawText);
    let time;
    console.log(`timeMatch is ${timeMatch}`)
    if (timeMatch !== null) {
      time = timeMatch[0];
      console.log(time);
    } else {
      time = "";
    }
    
    //get yield 
    let yieldRE = /(?<=SERVES).*/g;
    let yieldMatch = yieldRE.exec(rawText);
    let yield;
    console.log(`yieldMatch is ${yieldMatch}`)
    if (yieldMatch !== null) {
      yield = "Serves " + yieldMatch[0];
      console.log(yield);
    } else {
      yield = "";
    }
    
    // get ingredients
    let ingredientsRE = /(?<=GATHER YOUR INGREDIENTS\n)(.|\n)*?(?=View)/gi;
    let ingredientsMatch = ingredientsRE.exec(rawText);
    console.log(ingredientsMatch);
    let ingredientsArr = ingredientsMatch[0]
      .trim()
      .split(`\n`);
    console.log(ingredientsArr);
    let i = 0;
    // the raw text comes back with a line return after a comma as in "2 sticks butter,\nmelted"
    // or before a parentheses as in "2 cans chickpeas (one drained, one undrained)"
    while (i < ingredientsArr.length - 1) { // -1 because this only correct items where there is something on the next line that is erroneous
      if (ingredientsArr[i].charAt(ingredientsArr[i].length - 1) === ","
      || ingredientsArr[i + 1].charAt(0) === "(") {
        ingredientsArr[i] = ingredientsArr[i] + ' ' + ingredientsArr[i + 1];
        ingredientsArr.splice(i + 1, 1);
      }
      i++;
    }
    console.log(ingredientsArr);

    //get instructions
    let instructionsArr = [];
    let instructionsMatch = [];
    let instructionsRE = /(?<=INSTRUCTIONS\n\n)(.|\n\d\n\n)*/g;
    instructionsMatch = instructionsRE.exec(rawText);
    console.log(`instructions match: ${instructionsMatch}`)
    instructionsArr = instructionsMatch[0].split(/\d\n\n/);
    console.log("instructionsArr", instructionsArr); 

    // put it all in an object and add to rawRecipes and refresh the list
    let newRecipe = new Recipe(title, source, null, yield, time, ingredientsArr, instructionsArr);
    console.log(newRecipe);
    rawRecipes.push(newRecipe);
    sendRawRecipesToLocalStorage();
    displayRecipeList();
    loadRecipe(newRecipe.name);
  };
  addRecipeModal.hide();
  updateSearchbar();
}

function addRecipeFromManualForm() {
  //function Recipe(name, source, url, yield, time, ingredients, instructions) {
  let name = document.getElementById("name-field").value;
  let source = document.getElementById("source-field").value;
  let url = document.getElementById("url-field").value;
  let yield = document.getElementById("yield-field").value;
  let time = document.getElementById("time-field").value;
  let ingredients = document.getElementById("ingredients-field").value.split("\n");
  let instructions = document.getElementById("instructions-field").value.split("\n");
  // ternary operators to assign undefined to any empty fields
  name = name.trim() === "" ? undefined : name;
  source = source.trim() === "" ? undefined : source;
  url = url.trim() === "" ? undefined : url;
  yield = yield.trim() === "" ? undefined : yield;
  time = time.trim() === "" ? undefined : time;
  // remove any empty lines from ingredients and instructions arrays
  ingredients = ingredients.filter(ingredient => ingredient.trim() !== "");
  instructions = instructions.filter(instruction => instruction.trim() !== "");
  // put it all in an object and add to rawRecipes and refresh the list
  let newRecipe = new Recipe(name, source, url, yield, time, ingredients, instructions);
  console.log(newRecipe);
  rawRecipes.push(newRecipe);
  sendRawRecipesToLocalStorage();
  displayRecipeList();
  loadRecipe(newRecipe.name);
}

function replaceASCII(str) {
  console.log(`need to replace ASCII in ${str}`)
}

function filterList(event) {
  // get the search string
  let input = document.getElementById("recipe-search").value;
  //and capitalize it
  let filter = input.toUpperCase();
  //get HTMLcollection (array-like object) of li elements in the recipe list
  let ul = document.getElementById("recipe-list");
  let li = ul.getElementsByTagName("li");
  //get array so I can iterate it
  let liArr = Array.from(li);
  liArr.forEach((elem, index) => {
    let text = elem.textContent;
    // search string and targets toUpper case for case insensitive search
    text = text.toUpperCase();
    // filter list by changing display property
    // display: "" means it will follow default (i.e., be displayed normally)
    // display: none means not displayed and is removed from DOM flow
    // with this method the elements of the list still exist to be displayed 
    // later if search parameter changes.
    if (text.indexOf(filter) === -1) {
      li[index].style.display = "none";
    } else {
      li[index].style.display = "";
    }
  })
}

function loadRecipe (recipeName) { // Loads recipe details to the right pane when clicked in left pane

  //find index of rawRecipes index of clicked name
  //logical choice here was:
  //rawRecipes.findIndex((elem) => {elem.name === recipeName})
  //but it always came back -1.  WHY?
  rawRecipes.forEach((elem, index) => {
    if (elem.name === recipeName) {
      activeRecipeIndex = index;
    }
  })

  //Define active recipeName (should I just use the global variable everywhere?)
  activeRecipeName = recipeName;
  
  //display the recipe info in the right pane
  let activeRecipeContainer = document.getElementById("active-recipe");
  activeRecipeContainer.innerHTML = "";
  let name = document.createElement("div");
  name.textContent = rawRecipes[activeRecipeIndex].name;
  activeRecipeContainer.appendChild(name);
  //source (make it a link if there is a URL)
  if (rawRecipes[activeRecipeIndex].source) {let source = document.createElement("div");
    if (rawRecipes[activeRecipeIndex].URL) {
      sourceLink = document.createElement("a");
      sourceLink.href = rawRecipes[activeRecipeIndex].URL;
      sourceLink.textContent = rawRecipes[activeRecipeIndex].source;
      source.textContent = "Source: "
      source.appendChild(sourceLink);
    } else {
    source.textContent = `Source: ${rawRecipes[activeRecipeIndex].source}`;
    }
  activeRecipeContainer.appendChild(source);
  }

  //yield (if it exists);
  if (rawRecipes[activeRecipeIndex].yield) {
    let yield = document.createElement("div");
    yield.textContent = rawRecipes[activeRecipeIndex].yield;
    activeRecipeContainer.appendChild(yield);
  } 

  //time (if it exists)
  if (rawRecipes[activeRecipeIndex].time) {
    let time = document.createElement("div");
    time.textContent = `Time: ${rawRecipes[activeRecipeIndex].time}`;
    activeRecipeContainer.appendChild(time);
  }

  //ingredients header
  let ingredients = document.createElement("ul")
  ingredients.textContent = "Ingredients:";
  activeRecipeContainer.appendChild(ingredients);
  //iterate ingredients to a list
  //iterate the new content
  let ingredientsArr = (rawRecipes[activeRecipeIndex]["ingredients"]);
  //update the global variable so it can be added to shopping list
  activeIngredientsList = ingredientsArr 
  ingredientsArr.forEach((elem) => {
    let li = document.createElement("li")
    li.textContent = elem;
    ingredients.appendChild(li);
  });

  //instructions header
  let instructions = document.createElement("ul");
  instructions.textContent = "Instructions:";
  activeRecipeContainer.appendChild(instructions);
  //we'll interate the instructions the same way
  //bring in the new
  let instructionsArr = (rawRecipes[activeRecipeIndex]["instructions"]);
  instructionsArr.forEach((elem) => {
    let li = document.createElement("li")
    li.textContent = elem;
    instructions.appendChild(li);
  });
}

function updateSearchbar() {
  let recipeQuantity = rawRecipes.length;
  let searchBar = document.getElementById("recipe-search");
  searchBar.placeholder = `Search ${recipeQuantity} recipes here...`;
}

function removeRecipeFromBox(name) {
  rawRecipes = rawRecipes.filter(function(elem) {
    return elem.name !== name;
  });
  sendRawRecipesToLocalStorage();
  displayRecipeList();
  updateSearchbar();
  updateShoppingListCounter();
}


function categorizeIngredient(ingredient) {
  if (checkItem(ingredient, vegetables, notVegetables)) {
    return "vegetables";
  } else if (checkItem(ingredient, fruits, notFruits)) {
    return "fruits";
  } else if (checkItem(ingredient, cannedGoods, notCannedGoods)) {
    return "canned";
  } else if (checkItem(ingredient, meats, notMeats)) {
    return "meats";
  } else if (checkItem(ingredient, dairy, notDairy)) {
    return "dairy";
  } else {
    return "other";
  }
}

function checkItem(item, list, notList) {
  //checks that an item contains one of the items in array list and none of the items in array notList
  for (const check of list) {
    if (item.toLowerCase().includes(check.toLowerCase())) {
      //console.log(`matched list item ${check} to ingredient ${item}`)
      for (const notCheck of notList) {
        if (item.toLowerCase().includes(notCheck.toLowerCase())) {
          //console.log(`unmatched by notList ietm ${notCheck}`);
          return false;
        }
      }
      return true;
    };
  }
}

function createCategoryHeader(headerText, id) {
  let header = document.createElement("p");
  header.id = id;
  header.textContent = headerText;
  //header.style.display = "block";
  return header
}

function createCategoryUL(id) {
  let ul = document.createElement("ul");
  ul.id = id;
  return ul;
}

function createSelectionListItem(text) {
  //creates shopping list item with checkbox
  let container = document.createElement("div")
  container.innerHTML = 
    `
    <p style="display:inline" class="list-item">
    <input type="checkbox"> ${text}
    </p>
    `
  return container;
}

function initializePopovers() {
  const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]:not(.popover-initialized)');
  popoverTriggerList.forEach(popoverTriggerEl => {
    new bootstrap.Popover(popoverTriggerEl);
      // Mark the element as initialized
      popoverTriggerEl.classList.add('popover-initialized');
  });
}

function addIngredientsToShoppingList() {
  let preSelectionList = [];
  for (const ingredient of activeIngredientsList) {
    //ShoppingListItem(quantity, unit, item, category, originalItem, sourceRecipe) {
    let originalItem = ingredient;
    let sourceRecipe = activeRecipeName;
    let category = categorizeIngredient (ingredient);
    let item = new ShoppingListItem(undefined, undefined, undefined, category, originalItem, undefined, sourceRecipe, false, false);
    preSelectionList.push(item);
  }
  selectItemsToSendToShoppingList(preSelectionList);
}

function selectItemsToSendToShoppingList(preSelectionList) {
  let container = document.getElementById("selection-list");
  container.innerHTML = "";

  //Create headings and ULs
  container.appendChild(createCategoryHeader("Vegetables:", "vegetables-header"));
  container.appendChild(createCategoryUL("vegetables-selection-list"));
  container.appendChild(createCategoryHeader("Fruits:", "fruits-header"));
  container.appendChild(createCategoryUL("fruits-selection-list"));
  container.appendChild(createCategoryHeader("Canned Goods:", "canned-header"));
  container.appendChild(createCategoryUL("canned-selection-list"));
  container.appendChild(createCategoryHeader("Dairy:", "dairy-header"));
  container.appendChild(createCategoryUL("dairy-selection-list"));
  container.appendChild(createCategoryHeader("Meats:", "meats-header"));
  container.appendChild(createCategoryUL("meats-selection-list"));
  container.appendChild(createCategoryHeader("Other:", "other-header"));
  container.appendChild(createCategoryUL("other-selection-list"));
  
  //Add each ingredient to its heading
  preSelectionList.forEach((elem, index) => {
    let listID = elem.category + "-selection-list";
    console.log(listID);
    let list = document.getElementById(listID);
    let item = createSelectionListItem(elem.originalItem);
    item.setAttribute("data-selection-list-index", parseInt(index));
    list.appendChild(item);  
  });
  //Remove empty headers
  categoryList.forEach((elem) => {
    let header = document.getElementById(elem + "-header");
    let list = document.getElementById(elem + "-selection-list");
    if (list.innerHTML === "") {
      header.style.display = "none";
    }
  })
  initializePopovers();
  
  let addSelectedButtonFunction = handleAddSelectedClick(preSelectionList);
  let addSelectedButton = document.getElementById("add-selected-ingredients-to-shopping-list-button");
  addSelectedButton.addEventListener("click", addSelectedButtonFunction);
  let selectionModal = document.getElementById("add-ingredients-to-shopping-list-modal");
  selectionModal.addEventListener("hidden.bs.modal", () => {
    addSelectedButton.removeEventListener("click", addSelectedButtonFunction);
  }, {once: true});
}

function handleAddSelectedClick (preSelectionList) {
  // closure to maintain reference to preSelectionList for "addSelectedIngredientsToShoppingList"
  return function() {
    addSelectedIngredientsToShoppingList(preSelectionList);
  }
}

function addSelectedIngredientsToShoppingList(preSelectionList) {
  console.log(`preSelectionList:`, preSelectionList)
  let list = document.querySelectorAll("#selection-list .list-item");
  //console.log(list);
  list.forEach((elem) => {
    trimmedItem = elem.textContent.trim(); // remove whitespace added at beginning
    //console.log(`trimmed item:`, trimmedItem);
    if (elem.children[0].checked) { //is the check box checked?
      //match textContent of elem with originalItem in preSelectionList array and send it to the master shopping list. 
      //console.log(preSelectionList);
      let index = elem.parentElement.getAttribute("data-selection-list-index");
      console.log(`preselectionList`, preSelectionList)
      console.log(`index`, index)
      console.log(`MSL`, masterShoppingList.slice()) //THIS ONE HAS AN ITEM FROM EACH RECIPE PREVIOUSLY ADDED AT [INDEX] CURRENTLY BEING ADDED.  IF IT DOESN'T EXIST, UNDEFINED IS ADDED
      console.log(`pushing:`, preSelectionList[index]);
      masterShoppingList.push(preSelectionList[index]);
      console.log(`MSL`, masterShoppingList);
    } else {
      //console.log(`not a checked item`);
    }
  });
  //console.log(masterShoppingList);
  addIngredientsToShoppingListModal.hide();
  updateShoppingListCounter();
}

function updateShoppingListCounter() {
  arrWithoutDeleted = masterShoppingList.filter(elem => elem.deleted !== true);
  let shoppingListQuantity = arrWithoutDeleted.length;
  let shoppingListButton = document.getElementById("view-shopping-list-button");
  shoppingListButton.textContent = `View shopping list (${shoppingListQuantity} items)`;
}

function viewShoppingList() {
  let container = document.getElementById("shopping-list");
  container.innerHTML = "";
    //Create headings and ULs
  container.appendChild(createCategoryHeader("Vegetables:", "vegetables-list-header"));
  container.appendChild(createCategoryUL("vegetables-list"));
  container.appendChild(createCategoryHeader("Fruits:", "fruits-list-header"));
  container.appendChild(createCategoryUL("fruits-list"));
  container.appendChild(createCategoryHeader("Canned Goods:", "canned-list-header"));
  container.appendChild(createCategoryUL("canned-list"));
  container.appendChild(createCategoryHeader("Dairy:", "dairy-list-header"));
  container.appendChild(createCategoryUL("dairy-list"));
  container.appendChild(createCategoryHeader("Meats:", "meats-list-header"));
  container.appendChild(createCategoryUL("meats-list"));
  container.appendChild(createCategoryHeader("Other:", "other-list-header"));
  container.appendChild(createCategoryUL("other-list"));

  //Add each ingredient to its heading
  masterShoppingList.forEach((elem, index) => {
    if (elem.deleted === true) {return};
    let listID = elem.category + "-list";
    // console.log(listID);
    let list = document.getElementById(listID);
    let itemContainer = document.createElement("div");
    //set the parent div attribute to link it to the masterShoppingList index
    itemContainer.setAttribute("data-shopping-list-index", index.toString());
    let item; 
    if (elem.editedItem) {
      item = createShoppingListItem(elem.editedItem, index);
    } else{
      item = createShoppingListItem(elem.originalItem, index);
    }
    itemContainer.appendChild(item);
    list.appendChild(itemContainer);
  });
  //Remove empty headers
  categoryList.forEach((elem) => {
    let header = document.getElementById(elem + "-list-header");
    let list = document.getElementById(elem + "-list");
    if (list.innerHTML === "") {
      header.style.display = "none";
    }
  })
  //add checks to previously checked items
  let divList = document.querySelectorAll("#shopping-list div");
  console.log('divList', divList);
  divList.forEach((elem) => {
    let index = elem.getAttribute("data-shopping-list-index");
    console.log('index', index);
    let checkbox = elem.querySelector("input[type='checkbox']");
    console.log(checkbox);
    console.log('msl item', masterShoppingList[index]);
    if (masterShoppingList[index].checked === true) {
      checkbox.checked = "true";
    }
  });

  //When an item is checked, update the item in masterShoppingList
  let checkboxList = document.querySelectorAll('#shopping-list input[type="checkbox"]');
  checkboxList.forEach((elem) => {
    elem.addEventListener("click", function(event) {
      console.log(event.target);
      let index = event.target.getAttribute("data-shopping-list-index");
      if (event.target.checked === true) {
        masterShoppingList[index].checked = true;
      } else if (event.target.checked  === false) {
        masterShoppingList[index].checked = false;
      }
    })
  });
  initializePopovers();
}

function createShoppingListItem(text, index) {
  //creates shopping list item with checkbox

  let itemAndIcons = document.createElement("p")
  itemAndIcons.style = "display:inline";
  itemAndIcons.classList.add("list-item");
  itemAndIcons.innerHTML = 
    `
    <input type="checkbox" data-shopping-list-index="${index}"> ${text}
    <i class="hover-icon edit-icon fa-solid fa-pen-to-square fa-sm"></i>
    <i class="hover-icon delete-icon fa-solid fa-trash fa-sm"></i>
    <a class="hover-icon info-icon fa-solid fa-question fa-sm" role="button" href="#" tabindex="0" style="text-decoration: none" data-bs-trigger="focus" data-bs-container="body" data-bs-toggle="popover" data-bs-placement="bottom" data-bs-custom-class="info-popover" data-bs-title="<p>Info:</P>" data-bs-html="true"></a>
    `
  console.log(`itemAndIcons`, itemAndIcons);
  return itemAndIcons;
}

function manualAddItemToShoppingList(text) {
 // function ShoppingListItem(quantity, unit, item, category, originalItem, editedItem, sourceRecipe, deleted, checked) {
    let category = categorizeIngredient(text);
  let item = new ShoppingListItem(undefined, undefined, undefined, category, text, undefined, "manual", false, false);
  masterShoppingList.push(item);
  document.getElementById("add-list-item-input").value = "";
  viewShoppingList();
  updateShoppingListCounter();
}

function editShoppingListItem(event) {
  let itemDOM = event.target.parentElement; //this is the element <p> containing the checkbox, text, and icons
  //we'll swap the item for the input field withing the parent div 
  let itemContainerDOM = itemDOM.parentElement; // parent div
  let indexStr = itemContainerDOM.getAttribute("data-shopping-list-index");
  let index = parseInt(indexStr);
  let editField = document.createElement("input");
  editField.id = "edit-field";
  editField.type = "text";
  if (masterShoppingList[index].editedItem) {
    editField.value = masterShoppingList[index].editedItem;
  } else {
    editField.value = masterShoppingList[index].originalItem;
  }
  editField.style.width = "100%";
  itemContainerDOM.appendChild(editField);    
  itemDOM.remove(); //remove original item
  //deactivate other edit icons while this one is active
  let editIconDOMList = document.querySelectorAll(".edit-icon");
  editIconDOMList.forEach(elem => elem.style.pointerEvents = "none");
  // Focus on the input field with a slight delay to make sure the element renders before trying to focus
  setTimeout(function() {
    editField.focus();
  }, 10); 
  
  document.getElementById("edit-field").addEventListener("keypress", function(event) {
    if (event.key==="Enter") {
      masterShoppingList[index].editedItem = editField.value;
      itemDOM.textContent = masterShoppingList[index].editedItem
      editField.remove();
      // refresh list -- this reactivates icons
      viewShoppingList();
    }
  });  

}

function deleteShoppingListItem(event) {
  let itemDOM = event.target.parentElement; //this is the element <p> containing the checkbox, text, and icons
  let itemContainerDOM = itemDOM.closest('[data-shopping-list-index]'); // parent div
  let indexStr = itemContainerDOM.getAttribute("data-shopping-list-index");
  let index = parseFloat(indexStr);
  itemContainerDOM.remove();
  masterShoppingList[index].deleted = true;
  viewShoppingList(); // refreshes the shopping list
  updateShoppingListCounter();
}

function infoShoppingListItem(event) {
  let iconDOM = event.target; // the icon <i> with the popover attributes
  let itemDOM = event.target.parentElement; //this is the element <p> containing the checkbox, text, and icons
  let itemContainerDOM = itemDOM.closest('[data-shopping-list-index]'); // parent div
  let indexStr = itemContainerDOM.getAttribute("data-shopping-list-index");
  let index = parseFloat(indexStr);
  let itemInfoHTML = ""
  if (masterShoppingList[index].sourceRecipe == "manual") {
    itemInfoHTML += `<p>From Recipe: Manually added.</p>`;
  } else {
    itemInfoHTML += `<p>From Recipe: ${masterShoppingList[index].sourceRecipe}</p>`
  }
  if (masterShoppingList[index].editedItem) {
    itemInfoHTML += `<p>Edited Item.</p><p>Original Item: ${masterShoppingList[index].originalItem}</p>`;
  }

  // Assuming the Popover is already initialized for iconDOM
  let popoverInstance = bootstrap.Popover.getInstance(iconDOM);
  popoverInstance.setContent({
    '.popover-body': itemInfoHTML
  });
  popoverInstance.update();
};
  // } else {
  //   // If the popover wasn't initialized for some reason, initialize it here
  //   let popover = new bootstrap.Popover(iconDOM, {
  //     content: itemInfoHTML,
  //     html: true


function recipeFromScratch() {

}