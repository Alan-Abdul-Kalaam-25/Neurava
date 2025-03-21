const questions = [
  {
    question:
      "How often do you have difficulty sustaining attention in tasks or activities?",
    type: "options",
    options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"],
  },
  {
    question:
      "How often do you fidget with your hands or feet or squirm in your seat?",
    type: "options",
    options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"],
  },
  {
    question:
      "Describe situations where you feel restless or find it hard to relax.",
    type: "text",
  },
  {
    question: "How often do you interrupt others when they are talking?",
    type: "options",
    options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"],
  },
  {
    question:
      "Can you describe how you manage your time when faced with multiple tasks?",
    type: "text",
  },
];

let currentQuestionIndex = 0;
const answers = [];

function loadQuestion(index) {
  const questionContainer = document.getElementById("question");
  const optionsContainer = document.getElementById("options-container");
  const progress = document.getElementById("progress");

  const currentQuestion = questions[index];
  questionContainer.innerText = currentQuestion.question;
  optionsContainer.innerHTML = "";

  if (currentQuestion.type === "options") {
    currentQuestion.options.forEach((option) => {
      const radioInput = document.createElement("input");
      radioInput.type = "radio";
      radioInput.name = "answer";
      radioInput.value = option;
      radioInput.id = option;

      const label = document.createElement("label");
      label.htmlFor = option;
      label.innerText = option;

      const div = document.createElement("div");
      div.appendChild(radioInput);
      div.appendChild(label);
      optionsContainer.appendChild(div);
    });

    // Pre-select previous answer if available
    if (answers[index]) {
      const selectedRadio = document.querySelector(
        `input[value="${answers[index]}"]`
      );
      if (selectedRadio) selectedRadio.checked = true;
    }
  } else if (currentQuestion.type === "text") {
    const textBox = document.createElement("input");
    textBox.type = "text";
    textBox.id = "answer-box";
    textBox.className = "form-control";
    textBox.placeholder = "Type your answer here...";
    textBox.value = answers[index] || "";

    optionsContainer.appendChild(textBox);
  }

  progress.innerText = `Question ${index + 1} of ${questions.length}`;
  document.getElementById("prev-btn").disabled = index === 0;
  document.getElementById("next-btn").style.display =
    index === questions.length - 1 ? "none" : "inline-block";
  document.getElementById("submit-btn").style.display =
    index === questions.length - 1 ? "inline-block" : "none";
}

function saveAnswer() {
  const currentQuestion = questions[currentQuestionIndex];
  if (currentQuestion.type === "options") {
    const selectedOption = document.querySelector(
      'input[name="answer"]:checked'
    );
    answers[currentQuestionIndex] = selectedOption
      ? selectedOption.value
      : null;
  } else if (currentQuestion.type === "text") {
    const answerBox = document.getElementById("answer-box");
    answers[currentQuestionIndex] = answerBox.value.trim();
  }
}

function nextQuestion() {
  saveAnswer();
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    loadQuestion(currentQuestionIndex);
  }
}

function prevQuestion() {
  saveAnswer();
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    loadQuestion(currentQuestionIndex);
  }
}

function submitAnswers() {
  saveAnswer();
  alert(
    "Thank you for completing the questionnaire!\n\nYour responses:\n" +
      answers
        .map(
          (ans, i) =>
            `${i + 1}. ${questions[i].question} - ${ans || "No response"}`
        )
        .join("\n")
  );
}

// Initial load
window.onload = () => loadQuestion(0);
