//HTML Templates
//Replace container with id main-content with this
questionHTML = `<img  id="bg-image" src="pokemon.jpg">
            <div id="overlay"></div>

            <div id="inner-content">
                <div id="header">
                    <h3 id="question-num">Question Number: 1/10</h3>
                    <h3 id="score">Score: 0/10</h3>
                </div>
                
                <div id="question">
                    <div id="sprite-container">
                        <div id="sprite-bg">
                            <img id="pokemon-sprite" src="pikachu.jpg">
                        </div>
                    </div>
                    <div id="question-ux">
                        <h1 id="heading">What is this Pokemon?</h1> 
                        <div id="answers">
                            <button id="btn-1" style="grid-area: ans1" class="ans-btn">Answer 1</button>
                            <button id="btn-2" style="grid-area: ans2" class="ans-btn">Answer 2</button>
                            <button id="btn-3" style="grid-area: ans3" class="ans-btn">Answer 3</button>
                            <button id="btn-4" style="grid-area: ans4" class="ans-btn"> Answer 4</button>
                        </div>
                        <button id="submit-btn">Submit</button>
                    </div>
                </div>
            </div>`
    
resultHTML =`<video id="bg-video" src="background.mp4" muted autoplay></video>
            <div id="overlay"></div>

            <div id="inner-content">
                <img id="pokemon-img" src="pokemon-logo.png">
                <h2 id="score">Score: 0/10</h3>
                <button id="start">Play Again</button>
            </div>`

//Question Data
let questionIndex = 0;
let questionNumber = 0;
let answer = "";
let userAnswer = "";

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
let questionDataList = [];

// User Data
let score = 0;

// Video Settings
let bgVideo = document.getElementById('bg-video');
let start = 95;
let end = 114;

//shuffles the items in an array
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array
}


//Generates a random number from 0 to 99
function randomNumber(){
    return Math.floor(Math.random() * (99 + 1));
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
        questionDataList.push(new Pokemon(pokemon_dict));
    })
}


async function startQuiz(){
    //Reset states



    //Retrive data
    await retriveData();
    createQuestionData();

    loadQuestion();
    //from here do the regular question workflow
}

// This functions loads the question page
function loadQuestion(){
    //Change stylesheet and load question data
    linkElement = document.querySelector('link');
    linkElement.href = 'question.css';
    questionData = questionDataList[questionIndex];
    questionIndex += 1;
    questionNumber += 1;
    answer = questionData.name

    //Update the main page content
    let mainContent = document.getElementById('main-content');
    mainContent.innerHTML = questionHTML;
    let scoreElement = document.getElementById('score');
    scoreElement.textContent =  `Score: ${score}/10`;
    let questionNumHTML = document.getElementById('question-num');
    questionNumHTML.textContent = `Question Num: ${questionNumber}/10`;
    
    //Generate answers
    let answerOptions = [];
    for(let i = 0; i < 3; i++){
        let pokemonIdx = randomNumber();
        while (pokemonList[pokemonIdx].toLowerCase() === questionData.name){
            pokemonIdx = randomNumber();
        }
        answerOptions.push(pokemonList[pokemonIdx].toLowerCase());
    }
    answerOptions.push(answer);
    shuffle(answerOptions);

    //Replace answers
    let button1 = document.getElementById('btn-1');
    let button2 = document.getElementById('btn-2');
    let button3 = document.getElementById('btn-3');
    let button4 = document.getElementById('btn-4');

    button1.textContent = answerOptions[0];
    button2.textContent = answerOptions[1];
    button3.textContent = answerOptions[2];
    button4.textContent = answerOptions[3];

    //Replace Pokemon sprite
    let pokemonSprite = document.getElementById('pokemon-sprite');
    pokemonSprite.src = questionData.image;

    //Register event listeners
    button1.addEventListener('click', () => userAnswer = button1.textContent);
    button2.addEventListener('click', () => userAnswer = button2.textContent);
    button3.addEventListener('click', () => userAnswer = button3.textContent);
    button4.addEventListener('click', () => userAnswer = button4.textContent);

    let submitBtn = document.getElementById('submit-btn');
    submitBtn.addEventListener('click', loadResult, {once: true});
}

// Changes the qustion page to display the answer
function loadResult(){
    //Update score
    if(answer === userAnswer){
        score += 1;
    }

    let scoreElement = document.getElementById('score');
    scoreElement.textContent = `Score: ${score}/10`;

    //Change button colours based on correctness
    let correctButton = null;
    let selectedButton = null;
    let btns = document.querySelectorAll('.ans-btn')
    
    btns.forEach((button) => {
        if(button.textContent === answer){
            correctButton = button;
        }
        if(button.textContent === userAnswer){
            selectedButton = button;
        }
    })

    correctButton.style.backgroundColor = '#22c55e';
    
    if(selectedButton != correctButton){
        selectedButton.style.backgroundColor = '#ef4444';
    }

    //Change heading
    heading = document.getElementById('heading');
    if(answer === userAnswer){
        heading.textContent = 'Correct';
    }
    else{
        heading.textContent = 'Incorrect';
    }

    //Change submit button to next question button
    let submitBtn = document.getElementById('submit-btn');
    console.log("ran");
    if(questionIndex != 9){
        submitBtn.textContent = "Next Question";
    }
    else{
        submitBtn.textContent = "See Results";
    }
    submitBtn.addEventListener('click', loadQuestion, {once: true});
}

// This function loads the result page
function loadFinalResult(){

}



//Event Listeners for Welcome Page (Also need these for result page)
if (bgVideo.readyState >= 1) {
    bgVideo.currentTime = start;
    bgVideo.play().catch(() => {});
    console.log("changed start time (cached)");
} else {
    bgVideo.addEventListener('loadedmetadata', () => {
        bgVideo.currentTime = start;
        bgVideo.play().catch(() => {});
        console.log("changed start time");
    }, { once: true });
}

bgVideo.addEventListener('timeupdate', () => {
    if (bgVideo.currentTime >= end) {
        bgVideo.currentTime = start;
        console.log("new loop");
    }
})

let startBtn = document.getElementById('start');
startBtn.addEventListener('click', startQuiz, {once: true});
console.log('Event Listeners Registered');