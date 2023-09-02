const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');


let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: 'What video game did Mario, the Nintendo character, first appear in?',
        choice1: 'Donkey Kong',
        choice2: 'Mario Bros.',
        choice3: 'Super Mario Bros.',
        choice4: 'Mario Kart',
        answer: 1,
    },
    {
        question: "Alongside Universal Interactive Studios, who else developed Crash Bandicoot, the video game?",
        choice1: "Insomniac",
        choice2: "Naughty Dog",
        choice3: "Rockstar",
        choice4: "Lost Boys Games",
        answer: 2,
    },
    {
        question: "What professional football player did the cover of FIFA Street 2 feature??",
        choice1: "John Terry",
        choice2: "David Beckham",
        choice3: "Cristiano Ronaldo",
        choice4: "Petr Čech",
        answer: 3,
    },
    {
        question: "What is the best-selling game console of all time?",
        choice1: "PlayStation 2",
        choice2: "PlayStation 4",
        choice3: "Wii",
        choice4: "Xbox 360",
        answer: 1,
    },
    {
        question: "What is the most-played video game of all time?",
        choice1: "Mario Bros. 2",
        choice2: "Fortnite",
        choice3: "Minecraft",
        choice4: "PlayerUnknown's Battlegrounds",
        answer: 4,
    },
    {
        question: "Solid Snake is a hero in which famous videogame franchise?",
        choice1: "Max Payne",
        choice2: "Contra",
        choice3: "Metal Gear",
        choice4: "Castlevania II",
        answer: 3,
    },
    {
        question: "The United States Air Force used what gaming console to create a cluster supercomputer?",
        choice1: "Playstation 3",
        choice2: "Xbox One",
        choice3: "Switch",
        choice4: "Sega Dreamcast",
        answer: 1,
    },
    {
        question: "What is the best-selling handheld gaming system to date?",
        choice1: "Playstation Vita",
        choice2: "Game Boy Color",
        choice3: "Nintendo DS",
        choice4: "PSP Go",
        answer: 3,
    },
    {
        question: "The United States Air Force used what gaming console to create a cluster supercomputer?",
        choice1: "Playstation 3",
        choice2: "Xbox One",
        choice3: "Switch",
        choice4: "Sega Dreamcast",
        answer: 1,
    },
    {
        question: "What is the name of Mario’s dinosaur sidekick?",
        choice1: "Yoshi",
        choice2: "Luigi",
        choice3: "Wario",
        choice4: "Bowser",
        answer: 1,
    },
]

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 10;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);

        return window.location.assign('/end.html');
    }

    questionCounter++;
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;

    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionsIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1);

    acceptingAnswers = true;
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();

        }, 1000)
    })
})

incrementScore = num => {
    score +=num;
    scoreText.innerText = score;
}

startGame();