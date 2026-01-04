//Question Data
let questionNumber = 0;

const pokemonList = [
  "Bulbasaur", "Ivysaur", "Venusaur",
  "Charmander", "Charmeleon", "Charizard",
  "Squirtle", "Wartortle", "Blastoise",
  "Caterpie", "Metapod", "Butterfree",
  "Weedle", "Kakuna", "Beedrill",
  "Pidgey", "Pidgeotto", "Pidgeot",
  "Rattata", "Raticate",
  "Spearow", "Fearow",
  "Ekans", "Arbok",
  "Pikachu", "Raichu",
  "Sandshrew", "Sandslash",
  "Clefairy", "Clefable",
  "Vulpix", "Ninetales",
  "Jigglypuff", "Wigglytuff",
  "Zubat", "Golbat",
  "Oddish", "Gloom", "Vileplume",
  "Paras", "Parasect",
  "Venonat", "Venomoth",
  "Diglett", "Dugtrio",
  "Meowth", "Persian",
  "Psyduck", "Golduck",
  "Mankey", "Primeape",
  "Growlithe", "Arcanine",
  "Poliwag", "Poliwhirl", "Poliwrath",
  "Abra", "Kadabra", "Alakazam",
  "Machop", "Machoke", "Machamp",
  "Bellsprout", "Weepinbell", "Victreebel",
  "Tentacool", "Tentacruel",
  "Geodude", "Graveler", "Golem",
  "Ponyta", "Rapidash",
  "Slowpoke", "Slowbro",
  "Magnemite", "Magneton",
  "Farfetchd",
  "Doduo", "Dodrio",
  "Seel", "Dewgong",
  "Grimer", "Muk",
  "Shellder", "Cloyster",
  "Gastly", "Haunter", "Gengar",
  "Onix",
  "Drowzee", "Hypno",
  "Krabby", "Kingler",
  "Voltorb", "Electrode",
  "Exeggcute", "Exeggutor",
  "Cubone", "Marowak",
  "Hitmonlee"
];


let pokemonData = [];
let questionData = [];


// Video Settings
let bgVideo = document.getElementById('bg-video');
let start = 95;
let end = 114;

// User Data
let answers = [];
let results = [];

//Generates a random number from 1 to 100
function randomNumber(){
    return Math.floor(Math.random() * 99) + 1;
}

// Gets pokemon data from the pokemon API
async function retriveData(){
    let poke_nums = [];
    for(let i = 0; i < 10; i++){
        poke_nums.push(randomNumber());
    }

    for(let index of poke_nums){
        try{
            const url = `https://pokeapi.co/api/v2/pokemon/${pokemonList[index].toLowerCase()}`;
            let response = await fetch(url);
            if(!response.ok){
                throw new Error(`Response status: ${response.status}`);
            }

            response = await response.json();
        
            console.log(response);
            pokemonData.push(response)
        }
        catch(error){
            console.error(error.message);
        }
    }

}

// Formats pokemon data into data for questions
function Pokemon(pokemon_dict){
    this.name = pokemon_dict.name;
    this.image = pokemon_dict.sprites.back_default;
    this.height = pokemon_dict.height;
    this.weight = pokemon_dict.weight;
}

// Turns the data into data for questions
function createQuestionData() {
    pokemonData.forEach((pokemon_dict) => {
        questionData.push(new Pokemon(pokemon_dict))
    })
}

function loadQuestion(){
    
}

function loadResult(){

}

function loadFinalResult(){

}



//Event Listeners Welcome Page
bgVideo.addEventListener('loadedmetadata', () => {
    bgVideo.currentTime = start;
    console.log("changed start time");
})

bgVideo.addEventListener('timeupdate', () => {
    if (bgVideo.currentTime >= end) {
        bgVideo.currentTime = start;
        console.log("new loop");
    }
})