const quizData = [
    {
        question: "등속 직선 운동에서 물체의 속도는 어떻게 변하는가?",
        options: [
            "일정하다",
            "점점 빨라진다",
            "점점 느려진다",
            "변화 없다"
        ],
        answer: "일정하다"
    },
    {
        question: "역학적 에너지 보존 법칙에 의해 보존되는 에너지는?",
        options: [
            "운동 에너지와 위치 에너지의 합",
            "열 에너지와 전기 에너지의 합",
            "소리 에너지와 빛 에너지의 합",
            "화학 에너지와 열 에너지의 합"
        ],
        answer: "운동 에너지와 위치 에너지의 합"
    },
    {
        question: "온도를 1도 올리는 데 필요한 열량을 무엇이라 하는가?",
        options: [
            "비열",
            "열량",
            "온도",
            "에너지"
        ],
        answer: "비열"
    },
    {
        question: "빛이 물질을 통과할 때 굴절하는 이유는?",
        options: [
            "빛의 속도가 변화하기 때문",
            "빛의 세기가 변화하기 때문",
            "빛의 파장이 변화하기 때문",
            "빛의 진폭이 변화하기 때문"
        ],
        answer: "빛의 속도가 변화하기 때문"
    },
    {
        question: "파동의 주기는 무엇에 의해 결정되는가?",
        options: [
            "진동수",
            "속도",
            "파장",
            "진폭"
        ],
        answer: "진동수"
    },
    {
        question: "뉴턴의 제2법칙에 따르면, 힘이 10N, 질량이 2kg인 물체의 가속도는?",
        options: [
            "5 m/s²",
            "2 m/s²",
            "10 m/s²",
            "20 m/s²"
        ],
        answer: "5 m/s²"
    },
    {
        question: "역학적 에너지 보존 법칙이 적용되는 예시는 무엇인가?",
        options: [
            "자유 낙하하는 물체",
            "차가운 물의 가열",
            "온도 변화에 따른 열전달",
            "기체의 압력 변화"
        ],
        answer: "자유 낙하하는 물체"
    },
    {
        question: "비열의 단위는 무엇인가?",
        options: [
            "J/(kg·K)",
            "J·s",
            "N·m",
            "W·m"
        ],
        answer: "J/(kg·K)"
    },
    {
        question: "파동의 속도는 무엇에 의해 결정되는가?",
        options: [
            "매질의 성질",
            "파장의 길이",
            "파동의 주기",
            "파동의 진폭"
        ],
        answer: "매질의 성질"
    },
    {
        question: "광속이 물질에 의해 굴절될 때, 굴절각이 입사각보다 작은 경우를 무엇이라 하는가?",
        options: [
            "빛의 분산",
            "빛의 반사",
            "빛의 굴절",
            "빛의 회절"
        ],
        answer: "빛의 굴절"
    }
];

let currentSection = 1;
const totalSections = 4;

function startQuiz() {
    document.getElementById('description-area').style.display = 'none';
    document.getElementById('quiz-area').style.display = 'block';
    loadQuiz();
}

function changeSection(direction) {
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    
    currentSection += direction;
    if (currentSection < 1) currentSection = 1;
    if (currentSection > totalSections) currentSection = totalSections;

    updateSectionVisibility();

    prevButton.style.display = currentSection === 1 ? 'none' : 'inline-block';
    nextButton.style.display = currentSection === totalSections ? 'none' : 'inline-block';
}

function updateSectionVisibility() {
    for (let i = 1; i <= totalSections; i++) {
        document.getElementById(`section-${i}`).style.display = i === currentSection ? 'inline-block' : 'none';
    }
}

function loadQuiz() {
    const quiz = quizData[Math.floor(Math.random() * quizData.length)];
    document.getElementById('quiz-question').innerText = quiz.question;

    const quizOptions = document.getElementById('quiz-options');
    quizOptions.innerHTML = '';

    quiz.options.forEach(option => {
        const button = document.createElement('button');
        button.innerText = option;
        button.onclick = function() {
            selectOption(button);
        };
        quizOptions.appendChild(button);
    });

    document.getElementById('quiz-result').innerText = '';
    document.getElementById('next-button').style.display = 'none';
    document.getElementById('restart-button').style.display = 'none';
}

let selectedButton = null;

function selectOption(button) {
    const buttons = document.querySelectorAll('#quiz-options button');
    buttons.forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');
    selectedButton = button.innerText;
}

function checkAnswer() {
    if (!selectedButton) {
        alert('답을 선택하세요!');
        return;
    }

    const quiz = quizData.find(q => q.question === document.getElementById('quiz-question').innerText);

    if (selectedButton === quiz.answer) {
        document.getElementById('quiz-result').innerText = '정답입니다!';
    } else {
        document.getElementById('quiz-result').innerText = `오답입니다. 정답은 "${quiz.answer}"입니다.`;
    }

    document.getElementById('next-button').style.display = 'block';
    document.getElementById('restart-button').style.display = 'block';
}

function nextQuestion() {
    loadQuiz();
}

function restartQuiz() {
    selectedButton = null;
    loadQuiz();
}
