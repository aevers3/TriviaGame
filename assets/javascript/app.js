// 1. Create an array of objects. Each object will contain properties for question, choices, user guess and correct answer
var questionArr = [{
    question: "In standard tuning, what's the lowest note on a guitar?",
    choices: ["A", "E", "C#", "F"],
    answerIndex: 1,
}, {
    question: "What candy's name comes from the German word for peppermint?",
    choices: ["Pez", "Altoid", "Abba-Zabba", "Chick-o-Stick"],
    answerIndex: 0,
}, {
    question: "What is the hottest temperature ever recorded in Philadelphia?",
    choices: ["115", "106", "111", "104",],
    answerIndex: 3,
}, {
    question: "Quidditch is a game played by which of the following fictional characters?",
    choices: ["Arthur Morgan", "Artemis Fowl", "Harry Potter", "Bilbo Baggins",],
    answerIndex: 2,
}, {
    question: "Before it was rebranded as a children's toy, Play-Doh was originally sold as what?",
    choices: ["Wallpaper Cleaner", "Kitchen Decoration Kit", "Leak-Sealing Clay", "Earwax Remover",],
    answerIndex: 0,
}]




// 2. Declare variable for user score
var userScore = 0;
// Add userScore to DOM
$('#userScoreText').text("Score: " + userScore);

// questionCount will be used to keep track of which question the user is on, and will help to iterate through questionArr.
var questionCount = 0;
console.log(questionArr[questionCount].question);
// console.log(questionArr[questionCount - 1].choices.length);

// Define endGame() function
function endGame() {
    // Clear  all the game elements from the page.
    $('#questionText').empty();
    $('#choicesText').empty();
    $('#userScoreText').empty();
    $('#timerText').empty();
    // Stop the question timer
    clearTimeout(questionTimer);
    // Create new h1 named finalScoreText. Set text to show userScore
    var finalScoreText = $('#finalScoreText').text('Your final score is ' + userScore);
    // Append finalScoreText to DOM
    $('.textContainer').append(finalScoreText);
    // Create new button
    var newGameButton = $('<button>Play Again</button>');
    // Add button onclick
    newGameButton.on('click', function () {
        // Clear final score text from screen
        $('#finalScoreText').empty();
        // Reset question count and user score to zero, append fresh user score to DOM
        questionCount = 0;
        userScore = 0;
        $('#userScoreText').text("Score: " + userScore);
        // Get next question
        getNextQuestion();
        // Lastly, hide the newGameButton once it's been clicked.
        newGameButton.hide();
    });
    // Append button to DOM
    $('.textContainer').append(newGameButton);
};


// 3. For Each Question: display the question and answers. Set a timer for the question.
function getNextQuestion() {
    // Increment questionCount to pull in new info
    questionCount++;
    // Empty #choicesText div to avoid duplicates
    $('#choicesText').empty();

    // Test whether there are more questions in questionArr. If not, call endGame function.
    if (questionCount > questionArr.length) {
        // alert("Quiz is over");
        endGame();
        // Else, continue to get next question
    } else {

        // Get question text, write to DOM.
        $('#questionText').text(questionArr[questionCount - 1].question);
        // Create new form to add to DOM later.
        var newForm = $('<form>');

        // Iterate through questionArr
        for (i = 0; i < questionArr[questionCount - 1].choices.length; i++) {
            // Create new input element for each choice
            var newInput = $('<input>');
            // Add attributes for type and value
            newInput.attr("type", "radio").attr('value', i).attr('id', 'choice' + i).addClass('radios');

            // Give each input the same name of 'choice' - this ensures only one choice can be selected at a time.
            newInput.attr('name', 'choice');
            console.log(newInput);

            // Create label element to fill with answer choice
            var newLabel = $('<label>');
            newLabel.text(questionArr[questionCount - 1].choices[i]);
            // Append newly created input to newForm
            newLabel.prepend(newInput);
            newForm.append(newLabel);
            // Append populated form to DOM.
            $('#choicesText').append(newForm);
        };

        // 4. Create a submit button to submit answer and move to the next question.
        var newSubmit = $('<input>').attr('type', 'submit').attr('value', 'submit').addClass("submitButton");
        // Onclick for submit
        $(newSubmit).on("click", function (event) {
            event.preventDefault();
            checkAnswer();
        });

        // Append submit button to DOM.
        newForm.append(newSubmit);

        // Clear the question timer
        clearTimeout(questionTimer);
        // Call reset timer function to set the clock back to 15
        resetTimer();
    };
}


function checkAnswer() {
    // Stop the timers.
    clearInterval(intervalId);
    clearTimeout(questionTimer);

    //    Find User Selection
    if ($('#choice0').is(':checked')) {
        userGuess = 0;
    } else if ($('#choice1').is(':checked')) {
        userGuess = 1;
    } else if ($('#choice2').is(':checked')) {
        userGuess = 2;
    } else if ($('#choice3').is(':checked')) {
        userGuess = 3;
    } else {
        return false;
    };

    var correctAnswer = questionArr[questionCount - 1].answerIndex;
    console.log(userGuess);
    console.log(correctAnswer);
    // If user guesses correctly
    if (userGuess === correctAnswer) {
        // Empty out choicesText div
        $('#choicesText').empty();
        // Add to userScore
        userScore += 1;
        // Append userScore
        $('#userScoreText').text("Score: " + userScore);
        // Display correct answer message
        $('#choicesText').text('You got it!');
        // Create and append a button to get next question
        var nextQuestionButton = $('<button>').on('click', getNextQuestion).text('Next Question').addClass('nextQuestionButton');
        $('#choicesText').append(nextQuestionButton);
    } else {
        // Declare answerText to assist with accessing the correct answer by index.
        var answerText = questionArr[questionCount - 1].answerIndex;
        // Empty out the choicesText div
        $('#choicesText').empty();
        // Reveal the correct answer
        $('#choicesText').text('The correct answer was ' + (questionArr[questionCount - 1].choices[answerText]));
        // Create and append a button to get next question
        var nextQuestionButton = $('<button>').on('click', getNextQuestion).text('Next Question').addClass('nextQuestionButton');
        $('#choicesText').append(nextQuestionButton);
    }
    // Increment questionCount.
    // getNextQuestion();
};

// Create function for timer display
var time;
var intervalId;
var timerText = $('#timerText');
function countDown() {
    time--;
    $(timerText).text(time)

    // Add styling to timer text based on its changing value
    if (time < 6) {
        timerText.css("color", "orangered").css('font-size', '5em');
    };

    if (time < 1) {
        clearInterval(intervalId);
    };
}

// This function handles is called when the clock hits zero
function questionTimeout() {
     // Display Time's Up message
     $('#choicesText').text('Time\'s Up!');
     // Create and append a button to get next question
     var nextQuestionButton = $('<button>').on('click', getNextQuestion).text('Next Question').addClass('nextQuestionButton');
     $('#choicesText').append(nextQuestionButton);
}

var questionTimer;
// 5. When the timer hits zero, move to the next question regardless of whether an answer is selected.

function resetTimer() {
    timerText.css("color", "rgb(96, 247, 27)").css('text-shadow', '5px 5px 6px #000');
    time = 15;
    intervalId = setInterval(countDown, 1000);
    $(timerText).text(time);
    questionTimer = setTimeout(questionTimeout, 15000)
}



// ******************************************************************
// Page Loads Here
// ******************************************************************

getNextQuestion();
// resetTimer();

