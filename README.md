# Pokemon-Quiz-Website
This project is an interactive Pokémon-themed quiz web application built using HTML, CSS, and vanilla JavaScript. The app tests users’ knowledge of Pokémon by dynamically generating quiz questions using live data fetched from the PokéAPI. The quiz flow is managed entirely on the client side using JavaScript state variables. The application dynamically replaces page content using innerHTML to transition between the welcome screen, question screens, and the final results screen without reloading the page.

When the quiz starts, the app:
  - Randomly selects Pokémon
  - Fetches Pokémon data asynchronously from the PokéAPI
  - Generates multiple-choice questions with randomized answer options
  - Displays Pokémon sprites dynamically
  - Tracks the user’s score and progress in real time

At the end of the quiz, a results screen is displayed with the final score and an animated background video, allowing the user to restart the quiz.

To play the game run home.html.
