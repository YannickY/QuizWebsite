const questions = [
    {
      question: 'What is the capital of Brazil?',
      options: ['Brasilia', 'Sao Paulo'],
      answerIndex: 0
    },
    {
       question: 'How many states are in the USA?',
       options: [50, 300],
       answerIndex: 0
    },
    {
      question: 'What is the longest river in the world?',
      options: ['The Nile river', 'The Amazon river'],
      answerIndex: 0
    },
    {
      question: 'What is the world\'s deepest river?',
      options: ['The Congo River', 'The Marianas trench'],
      answerIndex: 0
    },
    {
      question: 'What is the world\'s largest rainforest?',
      options: ['The Amazon rainforest', 'The Congo rainforest'],
      answerIndex: 0
    },
    {
      question: 'What is the fastest car in the world?',
      options: ['Bugatti Bolide', 'Lamborghini'],
      answerIndex: 0
    },
    {
      question: 'What is the most dangerous naturally occuring element?',
      options: ['Plutonium', 'Polonium'],
      answerIndex: 1
    },
    {
      question: 'Who has won the most Grammys?',
      options: ['Beyonce', 'Quincy Jones'],
      answerIndex: 0
    },
    {
      question: 'What is the most popular social network worldwide',
      options: ['Facebook', 'Tik Tok'],
      answerIndex: 0
    },
    {
      question: 'Who is the tallest person to ever live?',
      options: ['Robert Wadlow', 'Yao Ming'],
      answerIndex: 0
    }
  ];
  
  const SCREEN = {
    COMPLETE: 'complete',
    CORRECT: 'correct',
    INCORRECT: 'incorrect',
    QUESTION: 'question'
  }
  
  const state = {
    questionIndex: 0,
    score: 0,
    screen: SCREEN.QUESTION
  };
  
  const questionTemplate = Handlebars.compile(`
    <p class="color">
      <b>{{question}}</b>
    </p>
    <p class="answer">
      {{#each options as |option|}}
        <button data-option type="button">
          <b>{{option}}</b>
        </button>
      {{/each}}
    </p>
  `);
  
  const $complete = $('#Complete');
  const $correct = $('#Correct');
  const $incorrect = $('#Incorrect');
  const $question = $('#Question');
  
  const render = () => {
    const screen = state.screen;
    
    if (screen === SCREEN.COMPLETE) {
      $complete.html(`<p>You scored ${state.score} out of ${questions.length}.</p>`);
    } else if (screen === SCREEN.QUESTION) {
      const question = questions[state.questionIndex];
      $question.html(questionTemplate(question));
    }
    
    $complete.toggle(screen === SCREEN.COMPLETE);
    $correct.toggle(screen === SCREEN.CORRECT);
    $incorrect.toggle(screen === SCREEN.INCORRECT);
    $question.toggle(screen === SCREEN.QUESTION);
  };
  
  $('#Quiz').on('click', '[data-option]', function () {
    const optionIndex = $(this).index();
    const currentQuestion = questions[state.questionIndex];
    const isCorrect = optionIndex === currentQuestion.answerIndex;
    const isComplete = isCorrect && state.questionIndex === questions.length - 1;
    
    if (isComplete) {
      state.score += 1;
      state.screen = SCREEN.COMPLETE;
    } else if (isCorrect) {
      state.score += 1;
      state.screen = SCREEN.CORRECT;
    } else {
      state.screen = SCREEN.INCORRECT;
    }
    
    render();
  });
  
  $('.next').on('click', function () {
    state.questionIndex += 1;
    state.screen = SCREEN.QUESTION;
  
    render();
  });
  
  $('.retry').on('click', function () {
    state.screen = SCREEN.QUESTION;
    render();
  });
  
  render();