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
  "Nidoran♀", "Nidorina", "Nidoqueen",
  "Nidoran♂", "Nidorino", "Nidoking",
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
  "Farfetch'd", "Doduo", "Dodrio",
  "Seel", "Dewgong"
];

let pokemonData = [];

let questionData = [];


// Video Settings
let bgVideo = document.getElementById('bg-video');
let start = 95;
let end = 114;

// User Data

answers = [];
results = [];

//Generates a random number from 1 to 100
function randomNumber(){
    return Math.floor(Math.random() * 100) + 1;
}

// Gets pokemon data from the pokemon API
async function retriveQuestions(){
    let poke_nums = [];
    for(let i = 1; i < 10; i++){
        poke_nums.push(randomNumber());
    }

    for(let index of poke_nums){
        try{
            const url = `https://pokeapi.co/api/v2/pokemon/${pokemonList[index].toLowerCase()}`;
            let response = await fetch(url);
            if(!response.ok){
                throw new error(`Response status: ${response.status}`);
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
function createQuestionData() {

}


function render(){
    return
}

retriveQuestions()



//Event Listeners
bgVideo.addEventListener('loadedmetadata', () => {
    bgVideo.currentTime = start;
    bgVideo.play();
})

bgVideo.addEventListener('timeupdate', () => {
    if (bgVideo.currentTime >= end) {
        bgVideo.currentTime = start;
    }
})

bgVideo.addEventListener("play", () => {
  console.log("started at", bgVideo.currentTime);
});